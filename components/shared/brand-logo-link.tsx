import Link from "next/link";
import { cn } from "@/lib/utils";
import content from "@/lib/content";

type BrandLogoLinkProps = {
  logoClassName?: string;
};

export function BrandLogoLink({ logoClassName }: BrandLogoLinkProps) {
  return (
    <Link
      href="/"
      className="inline-flex w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span
        className={cn(
          "font-heading text-xl font-semibold lowercase tracking-tight text-foreground",
          logoClassName,
        )}
      >
        {content.Footer.brandWordmark}
      </span>
    </Link>
  );
}
