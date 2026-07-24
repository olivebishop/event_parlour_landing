import Image from "next/image"

const artCards = [
  { image: "/images/concerts.png", alt: "Live concert crowd" },
  { image: "/images/cyclist.png", alt: "Cycling event" },
  { image: "/images/hiking.png", alt: "Hiking gathering" },
  { image: "/images/f1.png", alt: "Motorsport event" },
  { image: "/images/concerts.png", alt: "Festival stage" },
  { image: "/images/cyclist.png", alt: "Outdoor sports" },
  { image: "/images/hiking.png", alt: "Nature meetup" },
]

export default function ArtGallery() {
  const middleIndex = Math.floor(artCards.length / 2)

  return (
    <div
      data-art-gallery
      className="relative h-[clamp(9.5rem,28vw,25rem)] w-full mx-auto mt-8 sm:mt-10 md:mt-14 lg:mt-16 overflow-hidden"
      aria-hidden="true"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {artCards.map((card, index) => {
          const offset = index - middleIndex
          // Spacing scales with viewport so cards don't push past phone edges
          const xPosition = `calc(${offset} * clamp(3.25rem, 14vw, 7.5rem))`
          const yPosition = `calc(${Math.abs(offset)} * clamp(0.35rem, 1.5vw, 0.75rem))`
          const rotation = offset * 4

          return (
            <div
              key={`${card.image}-${index}`}
              className="absolute animate-gallery-in motion-reduce:animate-none will-change-transform"
              style={{
                zIndex: artCards.length - Math.abs(offset),
                transform: `translate(${xPosition}, ${yPosition}) rotate(${rotation}deg)`,
                animationDelay: `${index * 40}ms`,
              }}
            >
              <div className="relative w-[clamp(3.5rem,16vw,11.25rem)] aspect-[7/10] rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl shadow-black/50 overflow-hidden border border-white/15 bg-zinc-900">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover"
                  quality={65}
                  sizes="(max-width: 480px) 64px, (max-width: 768px) 100px, (max-width: 1280px) 140px, 180px"
                  loading={index === middleIndex ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
