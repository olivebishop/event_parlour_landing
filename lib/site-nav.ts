import content from "@/lib/content"



const copy = content.Navbar



export type SiteNavItem = {

  href: string

  label: string

  description: string

}



/** Secondary marketing routes (home links, etc.). */

export const secondaryMarketingNav: SiteNavItem[] = [

  {

    href: "/why-us",

    label: copy["why us"],

    description: "What builders and organizers say about us.",

  },

  {

    href: "/contact",

    label: copy.contact,

    description: "Get in touch and read common questions.",

  },

]


