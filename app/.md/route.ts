import { buildAgentMarkdown } from "@/lib/seo/agent-markdown";
import { SITE_URL } from "@/lib/seo/site";

/** Durable Markdown view for AI agents (Vercel-style `/.md`). */
export function GET() {
  return new Response(buildAgentMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      Vary: "Accept",
      Link: `<${SITE_URL}/llms.txt>; rel="alternate"; type="text/plain"`,
    },
  });
}
