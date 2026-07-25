/** Production app origin — footer & CTAs point here from the marketing site. */
export const APP_URL = "https://app.eventparlour.com";

export const STATUS_PAGE_URL = "https://event-parlour.openstatus.dev/";

export function appHref(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${APP_URL.replace(/\/$/, "")}${normalized}`;
}
