/**
 * Render the contact-form emails to HTML for a quick visual check.
 *   bun scripts/preview-emails.tsx [outDir]   (default: ./email-previews)
 */
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { render } from "@react-email/render"
import { ContactReceivedEmail } from "../emails/contact-received-email"
import { ContactTeamEmail } from "../emails/contact-team-email"

const outDir = process.argv[2] ?? "email-previews"
mkdirSync(outDir, { recursive: true })

const sample = {
  name: "Amina Otieno",
  email: "amina@example.test",
  subject: "Ticketing for a 400-person conference",
  message:
    "Hi team,\n\nWe're planning a conference in Nairobi in March and want to sell tickets through Event Parlour.\n\nCan we get a walkthrough?",
}

writeFileSync(join(outDir, "contact-team.html"), await render(<ContactTeamEmail {...sample} />))
writeFileSync(
  join(outDir, "contact-received.html"),
  await render(<ContactReceivedEmail name={sample.name} subject={sample.subject} />),
)
console.log(`Wrote previews to ${outDir}/`)
