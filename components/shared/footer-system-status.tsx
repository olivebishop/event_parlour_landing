import content from "@/lib/content";
import { STATUS_PAGE_URL } from "@/lib/app-url";

export function FooterSystemStatus() {
  const copy = content.Footer;

  return (
    <a
      href={STATUS_PAGE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-9 items-center gap-1.5 font-body text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span>{copy.systemStatus}</span>
      <span className="font-medium text-green-600">{copy.operational}</span>
    </a>
  );
}
