import type { Metadata } from "next"
import content from "@/lib/content"
import { appHref } from "@/lib/app-url"
import { MarketingCtaBanner } from "@/components/marketing/marketing-cta-banner"
import { MarketingPageShell } from "@/components/marketing/marketing-page-shell"
import { DownloadSection } from "@/components/download/download-section"

export const revalidate = 300

const siteUrl = "https://www.eventparlour.com"
const copy = content.DownloadPage

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  alternates: { canonical: `${siteUrl}/download` },
  openGraph: {
    images: [{ url: `${siteUrl}/og/download`, width: 1200, height: 630 }],
  },
  twitter: {
    images: [`${siteUrl}/og/download`],
  },
}

export default function DownloadPage() {
  const cta = copy.cta

  return (
    <MarketingPageShell>
      <DownloadSection variant="page" />

      <section
        aria-labelledby="download-cta-heading"
        className="container relative z-20 mx-auto px-4 pb-16 xs:px-5 sm:px-6 sm:pb-20 md:pb-24"
      >
        <MarketingCtaBanner
          id="download-cta-heading"
          eyebrow={cta.eyebrow}
          kicker={cta.kicker}
          title={cta.title}
          description={cta.description}
          panelLine={cta.panelLine}
          primaryHref={appHref("/auth/sign-up")}
          primaryLabel={cta.primaryLabel}
          primaryExternal
          secondaryHref={cta.secondaryHref}
          secondaryLabel={cta.secondaryLabel}
          hint={cta.hint}
        />
      </section>
    </MarketingPageShell>
  )
}
