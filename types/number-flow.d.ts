declare module "@number-flow/react" {
  interface NumberFlowProps {
    value: number
    format?: Intl.NumberFormatOptions
    locales?: Intl.LocalesArgument
    prefix?: string
    suffix?: string
    className?: string
    animated?: boolean
    isolate?: boolean
    willChange?: boolean
    respectMotionPreference?: boolean
    trend?: number | ((oldValue: number, value: number) => number)
    transformTiming?: EffectTiming
    spinTiming?: EffectTiming
    opacityTiming?: EffectTiming
  }

  const NumberFlow: React.ComponentType<NumberFlowProps>
  export const NumberFlowGroup: React.ComponentType<{
    children: React.ReactNode
  }>
  export default NumberFlow
}
