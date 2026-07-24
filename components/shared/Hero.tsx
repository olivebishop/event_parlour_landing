import Image from "next/image"
import { cn } from "@/lib/utils"
import ArtGallery from "@/components/shared/ArtGallery"
import { HeroWordCycle } from "@/components/shared/HeroWordCycle"
import content from "@/lib/content"

const { title, words, description, descriptionLine2 } = content.HeroSection

const avatars = [
  {
    img: "/images/attendee.svg",
    position: "top-[10%] left-1 sm:top-[16%] sm:left-[3%] md:left-[6%] lg:left-[8%]",
    alt: "Attendee",
  },
  {
    img: "/images/speaker.svg",
    position: "bottom-[6%] left-1 sm:top-[52%] sm:bottom-auto sm:left-[10%] md:left-[14%] lg:left-[16%]",
    alt: "Speaker",
  },
  {
    img: "/images/vendor.svg",
    position: "top-[10%] right-1 sm:top-[16%] sm:right-[3%] md:right-[6%] lg:right-[8%]",
    alt: "Vendor",
  },
  {
    img: "/images/org.svg",
    position: "bottom-[6%] right-1 sm:top-[52%] sm:bottom-auto sm:right-[10%] md:right-[14%] lg:right-[16%]",
    alt: "Organizer",
  },
]

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full max-w-7xl mx-auto px-5 xs:px-6 sm:px-8 lg:px-10 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-6 sm:pb-8 md:pb-10 text-center flex flex-col overflow-x-clip"
    >
      {/*
        Content is a self-contained centered column.
        Avatars are decorative only and never affect text measure/spacing.
      */}
      <div className="relative flex flex-col items-center justify-center py-6 sm:py-10 md:py-14">
        {avatars.map((avatar) => (
          <div
            key={avatar.alt}
            className={cn(
              "absolute z-10 pointer-events-none opacity-25 sm:opacity-70 md:opacity-100",
              "max-[359px]:hidden",
              avatar.position
            )}
            aria-hidden="true"
          >
            <div className="relative size-7 xs:size-8 sm:size-12 md:size-16 lg:size-20 xl:size-24 overflow-hidden rounded-lg border border-foreground/30 sm:border-2 sm:border-foreground/80 bg-muted shadow-md">
              <Image
                src={avatar.img}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 32px, (max-width: 1024px) 64px, 96px"
              />
            </div>
          </div>
        ))}

        <div className="@container relative z-30 w-full max-w-[18.5rem] xs:max-w-[21rem] sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
          <h1
            id="hero-heading"
            className="text-foreground mx-auto animate-hero-in flex flex-col items-center gap-1 xs:gap-1.5 sm:gap-2 font-heading font-bold tracking-normal text-[length:clamp(1.2rem,calc(100cqi/14),3.35rem)]"
          >
            {/* Base size on h1; word is 1.3em so the gap stays ~1.3× on every breakpoint */}
            <span className="block text-[1em] leading-[1.2] text-balance">
              {title}
            </span>
            <HeroWordCycle words={words} />
          </h1>

          <p className="font-body font-normal text-muted-foreground mx-auto mt-5 xs:mt-6 sm:mt-7 md:mt-8 max-w-[17.5rem] xs:max-w-[20rem] sm:max-w-md md:max-w-lg animate-hero-in [animation-delay:80ms]">
            <span className="block text-[0.9375rem] xs:text-base sm:text-lg md:text-xl leading-[1.55] sm:leading-[1.6] text-pretty">
              {description}
            </span>
            <span className="block mt-2 sm:mt-2.5 text-[0.9375rem] xs:text-base sm:text-lg md:text-xl leading-[1.55] sm:leading-[1.6] text-pretty">
              {descriptionLine2}
            </span>
          </p>

          <div className="mt-6 xs:mt-7 sm:mt-8 md:mt-10 animate-hero-in [animation-delay:140ms] flex justify-center">
            <a
              href="https://app.eventparlour.com/auth/sign-up"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 font-body font-medium transition-colors touch-manipulation w-full max-w-[15.5rem] xs:max-w-[16.5rem] sm:w-auto sm:max-w-none min-h-11 sm:min-h-12 md:min-h-14 px-5 xs:px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 text-sm xs:text-[0.9375rem] sm:text-base md:text-lg lg:text-xl"
            >
              Create your event
            </a>
          </div>
        </div>
      </div>

      <ArtGallery />
    </section>
  )
}
