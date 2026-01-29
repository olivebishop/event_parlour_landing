"use client";

import Link from "next/link";
import { Suspense } from "react";
import ScrollReveal from "@/components/shared/animations/scroll-reveal";
import { useTranslations } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";
import { HugeiconsNewTwitter } from "./social-icons";

// Local placeholder to mirror the `noSSR` API without requiring an external dependency.
const noSSR = () => {};

const testimonials = [
  {
    name: "Brian Martin",
    profession: "Back End Engineer",
    link: "https://x.com/Br1anMartin/status/2016462343069106487?s=20",
    description: "Clean UI, BETTER UX",
    avatar: "/people-say/brian.jpg",
    image: "",
    social: <HugeiconsNewTwitter className="w-6 h-6" />,
  },
  {
    name: "Stanley Masinde",
    profession: "Software Engineer",
    link: "https://x.com/StanleyMasinde_/status/2013182135658574117?s=20",
    description:
      "Congratulations on your milestone. Guys, if you're looking for a home for your events, check out Event Parlour.",
    avatar: "/people-say/masinde.jpg",
    image: "",
    social: <HugeiconsNewTwitter className="w-6 h-6" />,
  },
  {
    name: "Ndegwa",
    profession: "Software Engineer",
    link: "https://x.com/ndegwa_official/status/2013313456405909784?s=20",
    description: "This UI looks so good!",
    avatar: "/people-say/ndegwa.jpg",
    image: "",
    social: <HugeiconsNewTwitter className="w-6 h-6" />,
  },
  {
    name: "Tech Fabrizoo",
    profession: "Tech creator",
    link: "https://x.com/TechFabrizoo/status/2013315566560260380?s=20",
    description: "Amazing work.",
    avatar: "/people-say/kitze.jpg",
    image: "",
    social: <HugeiconsNewTwitter className="w-6 h-6" />,
  },
  {
    name: "Eric Muturi",
    profession: "Founder at Jepaks",
    link: "https://x.com/MuturiEric_W/status/2015088832350151149?s=20",
    description:
      "I do not own it, but I like the project so far. A solid one 💯💯 and more to come. Platform for events, organizers, speakers, and attendees.",
    avatar: "/people-say/erick.jpg",
    image: "",
    social: <HugeiconsNewTwitter className="w-6 h-6" />,
  },
  {
    name: "David Amunga",
    profession: "Software Engineer",
    link: "https://x.com/davidamunga_/status/1903552861746712822?s=20",
    description: "Looks good!!!",
    avatar: "/people-say/amuga.jpg",
    image: "",
    social: <HugeiconsNewTwitter className="w-6 h-6" />,
  },
  {
    name: "Mongare",
    profession: "Product thinker",
    link: "https://x.com/msnmongare/status/1903542538654646529?s=20",
    description:
      'Clear value proposition: "Event platform for everyone". Nice showcase of events and their details. Clear call-to-action buttons like "Create Your Event".',
    avatar: "/people-say/xavier-pladevall.jpg",
    image: "",
    social: <HugeiconsNewTwitter className="w-6 h-6" />,
  },
];

type TestimonialProps = (typeof testimonials)[number];

const TestimonialItem = ({
  reverse = false,
  testimonials,
  noSsr,
}: {
  reverse?: boolean;
  testimonials: TestimonialProps[];
  noSsr?: boolean;
}) => {
  if (noSsr) {
    noSSR();
  }

  const animeSeconds = testimonials.length * 10;

  return (
    <div className="max-w-full mx-auto">
      <div
        className={`[--anime-duration:${animeSeconds}s] px-10 mx-auto w-full`}
      >
        <div
          style={{
            animationDuration: `${animeSeconds}s`,
          }}
          className={cn(
            "scroller flex flex-nowrap w-max min-w-full duration-[1000s] hover:[animation-play-state:paused] overflow-hidden relative gap-5 justify-around shrink-0",
            reverse ? "animate-hrtl-scroll-reverse" : "animate-hrtl-scroll",
          )}
        >
          {testimonials.map((testimonial, indx) => {
            return (
              <div
                key={indx}
                className={cn(
                  "flex flex-col justify-between h-[220px] rounded-none border-[1.2px] border-white/10 shrink-0 grow-0 w-[450px] bg-black/40",
                )}
              >
                <p className="px-5 py-5 font-sans tracking-tight text-sm font-extralight sm:text-base md:text-lg text-pretty text-white/90">
                  &quot;{testimonial.description}&quot;
                </p>
                <div className="flex overflow-hidden h-[28%] gap-1 w-full border-t-[1.2px] border-white/10">
                  <div className="flex items-center w-3/4 gap-3 px-4 py-3">
                    <img
                      src={testimonial.avatar}
                      className="w-10 h-10 rounded-full object-cover"
                      alt={`${testimonial.name} avatar`}
                    />
                    <div className="flex flex-col items-start justify-start flex-1 gap-0">
                      <h5 className="text-base font-medium md:text-md text-white">
                        {testimonial.name}
                      </h5>
                      <p className="text-xs md:text-sm text-white/60 mt-[-4px]">
                        {testimonial.profession}
                      </p>
                    </div>
                  </div>
                  <div className="w-[1px] bg-white/10" />
                  <div className="flex items-center justify-center max-w-full mx-auto px-4">
                    <Link
                      href={testimonial.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${testimonial.name}'s testimonial on X`}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {testimonial.social}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TestimonialScroller = () => {
  return (
    <div className="max-w-full py-5 mx-auto overflow-hidden">
      <div className="flex flex-col gap-3">
        <div
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
          className="relative flex justify-around gap-5 overflow-hidden shrink-0"
        >
          <Suspense
            fallback={
              <TestimonialItem
                testimonials={Array(15)
                  .fill(
                    testimonials.slice(
                      Math.floor(testimonials.length / 2) + 1,
                      testimonials.length - 1,
                    ),
                  )
                  .flat()}
              />
            }
          >
            <TestimonialItem
              noSsr
              reverse
              testimonials={Array(15)
                .sort(() => Math.random() - 0.5)
                .fill(
                  testimonials.slice(0, Math.floor(testimonials.length / 2)),
                )
                .flat()}
            />
          </Suspense>
        </div>
        <div
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
          className="relative flex justify-around gap-5 overflow-hidden shrink-0"
        >
          <Suspense
            fallback={
              <TestimonialItem
                testimonials={Array(15)
                  .fill(
                    testimonials.slice(
                      Math.floor(testimonials.length / 2) + 1,
                      testimonials.length - 1,
                    ),
                  )
                  .flat()}
              />
            }
          >
            <TestimonialItem
              noSsr
              testimonials={Array(15)
                .sort(() => Math.random() - 0.5)
                .fill(
                  testimonials.slice(
                    Math.floor(testimonials.length / 2) + 1,
                    testimonials.length - 1,
                  ),
                )
                .flat()}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <div className="container mx-auto px-3 xs:px-4 sm:px-6">
      <ScrollReveal direction="up" duration={0.7} threshold={0.2}>
        <div className="text-center mb-8 xs:mb-10 sm:mb-12">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-xs xs:max-w-sm md:max-w-xl lg:max-w-2xl mx-auto px-2 mb-3 xs:mb-4">
            {t("subtitle")}
          </h2>
          <p className="text-zinc-400 text-sm xs:text-base sm:text-lg max-w-xs xs:max-w-sm md:max-w-xl lg:max-w-2xl mx-auto px-2">
            {t("description")}
          </p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal direction="up" delay={0.2} duration={0.8} threshold={0.1}>
        <TestimonialScroller />
      </ScrollReveal>
    </div>
  );
}