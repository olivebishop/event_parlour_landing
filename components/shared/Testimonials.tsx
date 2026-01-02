"use client";

import { AnimatedTestimonials } from "@/components/shared/animations/animated-testimonials";
import ScrollReveal from "@/components/shared/animations/scroll-reveal";

const testimonialsData = [
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

export default function Testimonials() {
  return (
    <div className="container mx-auto px-4">
      <ScrollReveal direction="up" duration={0.7} threshold={0.2}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-gray-100 text-sm md:text-base lg:text-lg max-w-sm md:max-w-xl lg:max-w-2xl mx-auto">
            From organizers to vendors, our ticketing platform has revolutionized how events are managed and experienced. See how our solution has empowered businesses of all sizes to boost attendance, streamline operations, and create unforgettable experiences.
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