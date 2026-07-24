import content from "@/lib/content"

const faqs = content.FAQSection.questions

function AnswerText({ answer }: { answer: string }) {
  return (
    <>
      {answer.split(/(https?:\/\/[^\s]+|#[^\s]+)/g).map((part, i) => {
        if (part.match(/^https?:\/\//)) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-2 hover:opacity-80"
            >
              {part}
            </a>
          )
        }
        if (part.match(/^#/)) {
          return (
            <a
              key={i}
              href={part}
              className="text-foreground underline underline-offset-2 hover:opacity-80"
            >
              {part}
            </a>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

export default function FAQSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="py-10 xs:py-12 sm:py-16 bg-background"
    >
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        <div className="flex items-center mb-6 xs:mb-8 sm:mb-10">
          <h2
            id="faq-heading"
            className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mr-2 xs:mr-3 sm:mr-4 shrink-0 max-w-[70%] sm:max-w-none"
          >
            {content.FAQSection.title}
          </h2>
          <div className="flex-grow h-px bg-gradient-to-r from-border to-foreground" />
        </div>

        <div className="space-y-2 xs:space-y-3 sm:space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-muted border border-border shadow-lg overflow-hidden"
            >
              <summary className="w-full flex justify-between items-center gap-4 p-3 xs:p-4 sm:p-5 text-left text-foreground hover:bg-muted/80 transition-colors duration-200 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="text-sm xs:text-base sm:text-lg font-medium pr-2">
                  {faq.question}
                </span>
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 xs:h-5 xs:w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className="p-3 xs:p-4 sm:p-5 pt-0 bg-muted text-muted-foreground text-xs xs:text-sm leading-relaxed">
                <AnswerText answer={faq.answer} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
