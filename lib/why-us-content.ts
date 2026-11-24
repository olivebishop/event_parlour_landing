/**
 * Shared copy for /why-us — static HTML, JSON-LD, and the testimonial marquee.
 * Keep quotes tied to real public posts; product claims match the app.
 */

export type WhyUsTestimonial = {
  name: string
  profession: string
  link: string
  description: string
  avatar: string
}

export const WHY_US_REASONS = [
  {
    title: "Built for Kenya and East Africa",
    body: "Sell tickets with M-PESA checkout in Kenyan Shillings, run the door with QR check-in, and manage the night from one workspace. Event Parlour is made for organizers in Nairobi, Mombasa, Kisumu, and across East Africa.",
  },
  {
    title: "Distribution before another dashboard",
    body: "List once and land in a marketplace where people are already looking for their next event. Share a storefront, push updates, and keep attendees close instead of hoping a link in a bio sells the room.",
  },
  {
    title: "Clear fees, free when the night is free",
    body: "Free, registration-only events have no Event Parlour platform fee. Paid tickets carry a 5% platform fee per ticket sold; payment-network charges are separate. Organizers see the same numbers attendees pay.",
  },
  {
    title: "One place for the team and the door",
    body: "Invite teammates, sell tickets, transfer passes when plans change, and check guests in from the web or the desktop app on Mac and Windows — without juggling three tools on show night.",
  },
] as const

export const WHY_US_TESTIMONIALS: WhyUsTestimonial[] = [
  {
    name: "Brian Martin",
    profession: "Back End Engineer",
    link: "https://x.com/Br1anMartin/status/2016462343069106487?s=20",
    description: "Clean UI, BETTER UX",
    avatar: "/people-say/brian.jpg",
  },
  {
    name: "Dennis",
    profession: "X user",
    link: "https://x.com/_realDennis_/status/2077330550172287327?s=20",
    description:
      "Hebu mjaribu @event_parlour eventparlour.com these new products may suprise you, try them",
    avatar: "/people-say/denis.jpg",
  },
  {
    name: "Stanley Masinde",
    profession: "Software Engineer",
    link: "https://x.com/StanleyMasinde_/status/2013182135658574117?s=20",
    description:
      "Congratulations on your milestone. Guys, if you're looking for a home for your events, check out Event Parlour.",
    avatar: "/people-say/masinde.jpg",
  },
  {
    name: "Ndegwa",
    profession: "Software Engineer",
    link: "https://x.com/ndegwa_official/status/2013313456405909784?s=20",
    description: "This UI looks so good!",
    avatar: "/people-say/ndegwa.jpg",
  },
  {
    name: "Tech Fabrizoo",
    profession: "Tech creator",
    link: "https://x.com/TechFabrizoo/status/2013315566560260380?s=20",
    description: "Amazing work.",
    avatar: "/people-say/kitze.jpg",
  },
  {
    name: "Eric Muturi",
    profession: "Founder at Jepaks",
    link: "https://x.com/MuturiEric_W/status/2015088832350151149?s=20",
    description:
      "I do not own it, but I like the project so far. A solid one 💯💯 and more to come. Platform for events, organizers, speakers, and attendees.",
    avatar: "/people-say/erick.jpg",
  },
  {
    name: "David Amunga",
    profession: "Software Engineer",
    link: "https://x.com/davidamunga_/status/1903552861746712822?s=20",
    description: "Looks good!!!",
    avatar: "/people-say/amuga.jpg",
  },
  {
    name: "Mongare",
    profession: "Product thinker",
    link: "https://x.com/msnmongare/status/1903542538654646529?s=20",
    description:
      'Clear value proposition: "Event platform for everyone". Nice showcase of events and their details. Clear call-to-action buttons like "Create Your Event".',
    avatar: "/people-say/xavier-pladevall.jpg",
  },
]
