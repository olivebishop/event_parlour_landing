"use client";

import { AnimatedTestimonials } from "@/components/shared/animations/animated-testimonials";
import ScrollReveal from "@/components/shared/animations/scroll-reveal";
import { useTranslations } from "@/lib/i18n/translations";

const defaultTestimonials = [
  {
    quote: "This ticketing platform has completely transformed how we manage our music festivals. The seamless check-in process and real-time analytics have helped us increase attendance by 30%.",
    name: "Sarah Johnson",
    designation: "Event Director at SoundWave Festivals",
    src: "/images/dummy/z.jpg"
  },
  {
    quote: "As an attendee, I love how easy it is to purchase tickets, transfer them to friends, and access event details all in one place. The mobile experience is flawless!",
    name: "Michael Chen",
    designation: "Tech Conference Regular",
    src: "/images/dummy/w.jpg"
  },
  {
    quote: "Being a vendor at multiple events, this platform has streamlined our booking process. We can now manage our schedule, payments, and client communications effortlessly.",
    name: "Emily Rodriguez",
    designation: "Owner at Gourmet Food Trucks",
    src: "/images/dummy/x.jpg"
  },
  {
    quote: "As a touring musician, this platform has revolutionized how we connect with venues and sell tickets. We've seen a 45% increase in pre-sales since switching to this service.",
    name: "David Park",
    designation: "Lead Singer at Neon Pulse",
    src: "/images/dummy/y.jpg"
  },
  {
    quote: "The comprehensive analytics helped us understand our audience better and tailor our corporate events to their preferences. Our attendee satisfaction scores have never been higher.",
    name: "Priya Sharma",
    designation: "Corporate Events Manager at TechGlobal",
    src: "/images/dummy/z.jpg"
  },
  {
    quote: "The QR code ticketing system made entry management a breeze for our 5,000-person conference. No more long lines or frustrated attendees!",
    name: "James Wilson",
    designation: "Operations Director at DevCon",
    src: "/images/dummy/w.jpg"
  }
];

const imageSources = [
  "/images/dummy/z.jpg",
  "/images/dummy/w.jpg",
  "/images/dummy/x.jpg",
  "/images/dummy/y.jpg",
  "/images/dummy/z.jpg",
  "/images/dummy/w.jpg"
];

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  
  // Try to parse testimonials from translations, fallback to defaults
  let testimonialsData = defaultTestimonials;
  try {
    const translatedTestimonials = t('testimonials');
    if (translatedTestimonials && translatedTestimonials !== 'testimonials') {
      const parsed = JSON.parse(translatedTestimonials);
      testimonialsData = parsed.map((item: { quote: string; name: string; designation: string }, index: number) => ({
        ...item,
        src: imageSources[index] || imageSources[0]
      }));
    }
  } catch {
    // Use default testimonials if parsing fails
  }

  return (
    <div className="container mx-auto px-3 xs:px-4 sm:px-6">
      <ScrollReveal direction="up" duration={0.7} threshold={0.2}>
        <div className="text-center mb-8 xs:mb-10 sm:mb-12">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl font-bold text-white mb-3 xs:mb-4">{t('title')}</h2>
          <p className="text-gray-100 text-xs xs:text-sm md:text-base lg:text-lg max-w-xs xs:max-w-sm md:max-w-xl lg:max-w-2xl mx-auto px-2">
            {t('subtitle')}
          </p>
        </div>
      </ScrollReveal>
      
      <ScrollReveal direction="up" delay={0.2} duration={0.8} threshold={0.1}>
        <AnimatedTestimonials
          testimonials={testimonialsData}
          autoplay={true}
          className="bg-black backdrop-blur-sm"
        />
      </ScrollReveal>
    </div>
  );
}