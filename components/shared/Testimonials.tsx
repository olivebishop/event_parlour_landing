"use client";

import { useEffect, useState, type ReactNode } from "react";
import content from "@/lib/content";
import {
  WHY_US_TESTIMONIALS,
  type WhyUsTestimonial,
} from "@/lib/why-us-content";
import { cn } from "@/lib/utils";
import { HugeiconsNewTwitter } from "./social-icons";

type TestimonialProps = WhyUsTestimonial & {
  social: ReactNode;
};

const testimonials: TestimonialProps[] = WHY_US_TESTIMONIALS.map((item) => ({
  ...item,
  social: <HugeiconsNewTwitter className="w-6 h-6" />,
}));

const half = Math.floor(testimonials.length / 2);
const rowA = testimonials.slice(0, half);
const rowB = testimonials.slice(half);

/** Repeat only in the browser so crawlers see each quote once. */
function loopRow(items: TestimonialProps[], times = 8) {
  return Array.from({ length: times }, () => items).flat();
}

const TestimonialItem = ({
  reverse = false,
  items,
}: {
  reverse?: boolean;
  items: TestimonialProps[];
}) => {
  const animeSeconds = Math.max(items.length, 1) * 10;

  return (
    <div className="mx-auto max-w-full">
      <div
        className={`[--anime-duration:${animeSeconds}s] mx-auto w-full px-4 sm:px-10`}
      >
        <div
          style={{ animationDuration: `${animeSeconds}s` }}
          className={cn(
            "scroller relative flex w-max min-w-full shrink-0 flex-nowrap justify-around gap-5 overflow-hidden duration-[1000s] hover:[animation-play-state:paused]",
            reverse ? "animate-hrtl-scroll-reverse" : "animate-hrtl-scroll",
          )}
        >
          {items.map((testimonial, indx) => (
            <div
              key={`${testimonial.name}-${indx}`}
              className="flex h-[200px] w-[min(88vw,450px)] shrink-0 grow-0 flex-col justify-between rounded-none border-[1.2px] border-border bg-muted/40 sm:h-[220px]"
            >
              <p className="px-5 py-5 font-body text-sm font-normal leading-snug text-pretty text-foreground sm:text-base md:text-lg">
                &quot;{testimonial.description}&quot;
              </p>
              <div className="flex h-[28%] w-full gap-1 overflow-hidden border-t-[1.2px] border-border">
                <div className="flex w-3/4 items-center gap-3 px-4 py-3">
                  <img
                    src={testimonial.avatar}
                    data-allow-radius
                    className="h-10 w-10 rounded-full object-cover"
                    alt={`${testimonial.name} avatar`}
                  />
                  <div className="flex flex-1 flex-col items-start justify-start gap-0">
                    <h5 className="text-base font-medium text-foreground md:text-md">
                      {testimonial.name}
                    </h5>
                    <p className="mt-[-4px] text-xs text-foreground/70 md:text-sm">
                      {testimonial.profession}
                    </p>
                  </div>
                </div>
                <div className="w-[1px] bg-border" />
                <div className="mx-auto flex max-w-full items-center justify-center px-4">
                  <a
                    href={testimonial.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${testimonial.name}'s testimonial on X`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {testimonial.social}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TestimonialScroller = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const top = ready ? loopRow(rowA) : rowA;
  const bottom = ready ? loopRow(rowB) : rowB;

  return (
    <div className="mx-auto max-w-full overflow-hidden py-5" data-agent-skip>
      <div className="flex flex-col gap-3">
        <div
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
          className="relative flex shrink-0 justify-around gap-5 overflow-hidden"
        >
          <TestimonialItem reverse items={top} />
        </div>
        <div
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
          className="relative flex shrink-0 justify-around gap-5 overflow-hidden"
        >
          <TestimonialItem items={bottom} />
        </div>
      </div>
    </div>
  );
};

export default function Testimonials({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const copy = content.Testimonials;

  return (
    <div className="container mx-auto px-3 xs:px-4 sm:px-6">
      {showHeader ? (
        <div className="mb-8 text-center xs:mb-10 sm:mb-12">
          <h2 className="mx-auto mb-3 max-w-[20rem] px-2 text-xl font-bold leading-tight text-balance text-foreground xs:mb-4 xs:max-w-sm xs:text-2xl sm:text-4xl md:max-w-2xl md:text-5xl lg:max-w-3xl lg:text-6xl">
            {copy.subtitle}
          </h2>
          <p className="mx-auto max-w-xs px-2 text-sm text-muted-foreground xs:max-w-sm xs:text-base sm:text-lg md:max-w-xl lg:max-w-2xl">
            {copy.description}
          </p>
        </div>
      ) : null}

      <TestimonialScroller />
    </div>
  );
}
