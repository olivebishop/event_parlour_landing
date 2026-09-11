"use client"

import { useEffect, useState } from "react"

export type WeatherCondition = "sun" | "cloud" | "rain"

export type LocalWeather = {
  temperature: number
  city: string
  condition: WeatherCondition
}

const CACHE_KEY = "ep-local-weather-v3"
const CACHE_MS = 30 * 60 * 1000

const FAHRENHEIT_COUNTRIES = new Set(["US", "LR", "MM"])

function usesFahrenheit(countryCode?: string) {
  return FAHRENHEIT_COUNTRIES.has((countryCode ?? "").toUpperCase())
}

function conditionFromCode(code: number, isDay: boolean): WeatherCondition {
  if (
    code === 51 ||
    code === 53 ||
    code === 55 ||
    code === 56 ||
    code === 57 ||
    code === 61 ||
    code === 63 ||
    code === 65 ||
    code === 66 ||
    code === 67 ||
    code === 80 ||
    code === 81 ||
    code === 82 ||
    code === 95 ||
    code === 96 ||
    code === 99
  ) {
    return "rain"
  }
  if (code <= 1 && isDay) return "sun"
  return "cloud"
}

function isLocalWeather(value: unknown): value is LocalWeather {
  if (typeof value !== "object" || value === null) return false
  const weather = value as LocalWeather
  return (
    typeof weather.temperature === "number" &&
    typeof weather.city === "string" &&
    (weather.condition === "sun" ||
      weather.condition === "cloud" ||
      weather.condition === "rain")
  )
}

function readCache(): LocalWeather | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { at: number; weather: unknown }
    if (Date.now() - parsed.at > CACHE_MS) return null
    return isLocalWeather(parsed.weather) ? parsed.weather : null
  } catch {
    return null
  }
}

function writeCache(weather: LocalWeather) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), weather }))
  } catch {
    // ignore quota / private mode
  }
}

export function useLocalWeather() {
  const [weather, setWeather] = useState<LocalWeather | null>(null)

  useEffect(() => {
    const cached = readCache()
    if (cached) {
      setWeather(cached)
      return
    }

    let cancelled = false

    async function load() {
      try {
        const geoRes = await fetch("https://get.geojs.io/v1/ip/geo.json")
        const geo = (await geoRes.json()) as {
          latitude?: string
          longitude?: string
          city?: string
          region?: string
          country_code?: string
        }
        const lat = Number(geo.latitude)
        const lon = Number(geo.longitude)
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) return

        const unit = usesFahrenheit(geo.country_code) ? "fahrenheit" : "celsius"
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day&temperature_unit=${unit}&timezone=auto`,
        )
        const data = (await weatherRes.json()) as {
          current?: {
            temperature_2m?: number
            weather_code?: number
            is_day?: number
          }
        }
        const temperature = data.current?.temperature_2m
        if (typeof temperature !== "number" || cancelled) return

        const next = {
          temperature: Math.round(temperature),
          city: geo.city || geo.region || "Local",
          condition: conditionFromCode(
            data.current?.weather_code ?? 2,
            data.current?.is_day !== 0,
          ),
        }
        writeCache(next)
        setWeather(next)
      } catch {
        // decorative chrome — leave empty
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return weather
}
