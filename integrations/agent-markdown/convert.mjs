/**
 * Turn a rendered page into clean Markdown for AI agents and answer engines.
 * Shared by the build step (static .md files) and the dev server.
 */
import { NodeHtmlMarkdown } from "node-html-markdown"
import { parse } from "node-html-parser"

export const SITE_URL = "https://www.eventparlour.com"

/** Removed before conversion: chrome, decoration, mock UIs and anything hidden. */
const STRIP = [
  "script",
  "style",
  "noscript",
  "template",
  "svg",
  "img",
  "video",
  "picture",
  "canvas",
  "iframe",
  "button",
  "form",
  "input",
  "textarea",
  "select",
  "[aria-hidden='true']",
  "[hidden]",
  "[data-agent-skip]",
].join(",")

const nhm = new NodeHtmlMarkdown({
  bulletMarker: "-",
  codeBlockStyle: "fenced",
  maxConsecutiveNewlines: 2,
  useLinkReferenceDefinitions: false,
})

const decode = (value = "") =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")

/** "/why-us" → "/why-us.md", "/" → "/index.md" */
export function markdownPathFor(pathname) {
  const clean = pathname.replace(/\/+$/, "")
  return `${clean || "/index"}.md`
}

/**
 * @param {string} html  Full rendered page HTML.
 * @param {{ lastUpdated?: string }} [options]
 * @returns {{ title: string, description: string, url: string, markdown: string }}
 */
export function pageHtmlToMarkdown(html, { lastUpdated = new Date().toISOString().slice(0, 10) } = {}) {
  // node-html-parser loses <body>/<main> on full documents with inline
  // scripts and custom elements, so read head tags with patterns and parse
  // only the <main> fragment (every page has exactly one).
  const head = html.slice(0, html.indexOf("</head>"))
  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1].trim() ?? "")
  const description = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "")
  const url = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? SITE_URL

  const start = html.indexOf("<main")
  const end = html.lastIndexOf("</main>")
  if (start === -1 || end === -1) throw new Error(`No <main> element found for ${url}`)
  const fragment = html
    .slice(start, end + "</main>".length)
    // Valid but unusual `</style\n\t>` closing tags (NumberFlow) trip the parser.
    .replace(/<\/([a-z][\w-]*)\s+>/gi, "</$1>")
    // Spans styled `block` render on their own lines ("Sell out" / "your next
    // event.") — keep a space between them so words don't run together.
    .replace(/<span(\s[^>]*\bclass="[^"]*\bblock\b[^"]*")/g, " <span$1")
    // Declarative shadow DOM (e.g. NumberFlow's <template shadowrootmode>) is
    // never visible text, and confuses the parser — drop it first.
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/g, "")
  const main = parse(fragment, { comment: false })

  for (const node of main.querySelectorAll(STRIP)) node.remove()

  // Agents follow links out of context — make every link absolute.
  for (const link of main.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href")
    if (href?.startsWith("/") && !href.startsWith("//")) link.setAttribute("href", `${SITE_URL}${href}`)
  }

  const body = nhm
    .translate(main.innerHTML)
    // Drop empty links/headings and runs of blank lines left by stripped nodes.
    .replace(/\[\s*\]\([^)]*\)/g, "")
    .replace(/^#{1,6}\s*$/gm, "")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  const markdown = [
    `# ${title}`,
    "",
    description ? `> ${description}` : "",
    "",
    `- URL: ${url}`,
    `- Publisher: Event Parlour (${SITE_URL})`,
    `- Last updated: ${lastUpdated}`,
    "",
    "---",
    "",
    body,
    "",
  ]
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")

  return { title, description, url, markdown }
}

/** Does this Accept header prefer Markdown over HTML? (agents send `text/markdown`) */
export function prefersMarkdown(accept = "") {
  let markdown = -1
  let html = -1
  for (const part of accept.split(",")) {
    const [type, ...params] = part.trim().toLowerCase().split(";")
    const q = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1)
    if (type === "text/markdown" || type === "text/x-markdown") markdown = Math.max(markdown, q)
    if (type === "text/html") html = Math.max(html, q)
  }
  return markdown > 0 && markdown >= html
}
