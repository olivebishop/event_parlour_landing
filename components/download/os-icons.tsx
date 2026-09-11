import { cn } from "@/lib/utils"

export function EventParlourMark({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden font-heading font-semibold lowercase leading-none tracking-tight",
        inverted ? "bg-white text-black" : "bg-black text-white",
        className,
      )}
      aria-hidden
    >
      <span className="translate-y-[0.04em] text-[0.52em]">EP</span>
    </span>
  )
}

/** Product mark from the Event Parlour app sidebar. */
export function EventParlourLogoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 444 307"
      fill="none"
      className={cn("text-foreground", className)}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M126.02 4.786c-25.998 6.612-42.72 13.805-60.38 25.635C25.11 57.779 4.044 94.467 10.453 126.403c5.68 27.294 26.428 41.268 62.243 41.548 16.701.23 21.714-.499 34.716-4.918 23.961-8.102 56.865-29.541 85.141-55.447l9.301-8.511-8.536-.209c-13.361-.035-34.314-6.586-45.243-13.852-10.745-7.08-18.324-18.05-20.336-29.375-2.927-15.782 9.937-38.203 28.712-50.03l8.365-5.173-11.135.156c-5.939-.016-18.378 1.992-27.662 4.194"
      />
      <path
        fill="currentColor"
        d="M323.605 24.426c-8.749 9.998-25.312 27.769-36.85 39.8l-21.213 21.657 4.808 6.322c5.733 7.624 5.914 9.109.892 13.549-3.906 3.516-3.906 3.516-10.011-3.923l-6.104-7.254-8.371 7.586c-13.209 12.213-44.817 34.955-63.961 46.039-32.898 19.398-59.463 29.72-87.497 34.47l-13.368 2.192 4.802 8.92 4.615 8.92-5.937-.573c-5.01-.384-7.046-2.06-10.925-8.936-4.618-7.992-5.36-8.365-15.748-9.692-24.673-3.22-45.427-14.781-55.035-30.395-5.358-8.922-3.894-1.124 2.38 12.069 9.226 19.881 57.623 104.075 63.544 110.771 11.101 12.464 35.938 24.035 60.053 27.811l7.976 1.32-4.988-8.55-4.988-8.55 5.753.016c4.639.012 6.306 1.316 10.555 8.564l5.173 8.736 19.488-1.062c41.761-2.301 86.714-18.884 132.074-48.641 18.59-12.198 47.041-34.021 49.277-37.726.745-.926-1.286-4.829-4.431-8.549l-5.734-6.881 5.021-4.069 5.207-4.069 5.92 6.882 5.921 6.696 19.722-19.433c18.421-18.137 60.67-64.79 61.98-68.684.373-.927-2.594-1.677-6.491-1.687-11.32-.03-29.864-5.276-42.094-11.803-30.577-16.227-50.713-50.983-55.051-94.604-.544-4.641-1.66-3.716-16.364 12.76m-33.467 93.812c1.477 2.602 1.102 4.271-1.318 7.049-4.095 4.628-5.95 4.438-10.205-.77-4.439-5.393-4.436-6.507.771-10.576 4.463-3.699 7.244-2.578 10.752 4.297m14.585 28.246c-4.653 4.999-7.434 4.063-11.311-3.37-1.663-2.788-1.102-4.457 2.062-7.789l4.094-4.443 4.625 5.58 4.81 5.58zm16.672 11.179 4.441 4.837-5.024 4.997-5.024 4.997-4.439-5.579-4.439-5.579 3.909-4.258c4.839-5.183 5.21-5.182 10.576.585m16.462 20.643c4.808 6.137 4.807 6.508-1.142 10.76l-4.835 3.513-4.254-5.393-4.254-5.207 3.908-4.258c5.025-5.368 5.953-5.366 10.577.585m-237.461 41.309 3.695 6.134-5.012.543c-3.528.548-5.937-.572-8.341-3.733-4.624-5.951-4.06-8.919 1.323-8.904 3.34.009 5.747 1.871 8.335 5.96m13.855 23.791c3.692 7.247 3.691 7.433-2.433 7.416-3.711-.01-5.934-1.5-8.336-5.404-4.25-7.248-4.063-7.619 2.433-7.602 4.268.012 6.12 1.316 8.336 5.59m14.036 25.461 3.881 6.134-5.568-.015c-5.381-.014-11.49-5.969-11.476-11.165.012-4.453 9.467-.717 13.163 5.046"
      />
    </svg>
  )
}

export function EventParlourWordmark({
  className,
}: {
  className?: string
}) {
  return (
    <span
      className={cn(
        "font-heading font-semibold lowercase tracking-tight",
        className,
      )}
    >
      event parlour
    </span>
  )
}

export function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 814 1000"
      className={cn("fill-current", className)}
      aria-hidden
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  )
}

export function WindowsLogo({
  className,
  branded = false,
}: {
  className?: string
  branded?: boolean
}) {
  return (
    <svg
      viewBox="0 0 88 88"
      className={cn(branded ? "fill-[#00adef]" : "fill-current", className)}
      aria-hidden
    >
      <path d="m0 12.402 35.687-4.86.016 34.423-35.67.203zm35.67 33.529.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349-.011 41.34-47.318-6.678-.066-34.739z" />
    </svg>
  )
}

export function FinderIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("fill-current", className)}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.995 1H5a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h8.566c-0.292-1.067-0.559-2.412-0.773-3.78-0.257 0.02-0.52 0.03-0.793 0.03-3.882 0-6.337-2.153-7.124-3.334a0.75 0.75 0 0 1 1.248-0.832c0.546 0.82 2.558 2.666 5.876 2.666 0.199 0 0.392-0.007 0.58-0.02a41.46 41.46 0 0 1-0.314-3.48H10a0.75 0.75 0 0 1-0.75-0.75c0-4.425 1.767-9.934 2.745-12.5Zm3.133 22c-0.312-1.022-0.613-2.478-0.854-4.015 2.538-0.614 4.089-2.149 4.802-3.005a0.75 0.75 0 1 0-1.152-0.96 7.524 7.524 0 0 1-3.862 2.471c-0.195-1.53-0.312-2.982-0.312-3.991a0.75 0.75 0 0 0-0.75-0.75h-2.233c0.197-4.37 2.01-9.696 2.839-11.75H19a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4h-3.872ZM6.5 6.75a0.75 0.75 0 0 1 0.75 0.75v2a0.75 0.75 0 0 1-1.5 0v-2a0.75 0.75 0 0 1 0.75-0.75Zm10.75 0.75a0.75 0.75 0 0 0-1.5 0v2a0.75 0.75 0 0 0 1.5 0v-2Z"
      />
    </svg>
  )
}

export function SafariIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-b from-[#4aa4ff] to-[#0b63e5]",
        className,
      )}
      aria-hidden
    >
      <span className="os-dot absolute inset-[12%] bg-[#f5f7fb]" />
      <svg viewBox="0 0 24 24" className="relative h-[58%] w-[58%]">
        <path d="M12 4.4 16.8 16.2 12 14.1 7.2 16.2 12 4.4Z" fill="#e11d2e" />
        <path d="M12 19.6 7.2 7.8 12 9.9 16.8 7.8 12 19.6Z" fill="#d6dbe3" />
      </svg>
    </span>
  )
}

export function CalendarIcon({
  className,
  day = "28",
}: {
  className?: string
  day?: string
}) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square flex-col items-center justify-center overflow-hidden bg-white text-black",
        className,
      )}
      aria-hidden
    >
      <span className="text-[0.42em] font-semibold uppercase leading-none tracking-[0.12em] text-[#e11d2e]">
        MON
      </span>
      <span className="font-numbers text-[1.05em] font-semibold leading-none">
        {day}
      </span>
    </span>
  )
}

export function MessagesIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-b from-[#4de06a] to-[#1aad3c]",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%] fill-white">
        <path d="M5 6.5h14a2 2 0 0 1 2 2v6.2a2 2 0 0 1-2 2H11l-4.4 3v-3H5a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2Z" />
      </svg>
    </span>
  )
}

export function PhotosIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-[#f4f4f5]",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-[70%] w-[70%]">
        <circle cx="12" cy="8" r="3.1" fill="#ff5e57" />
        <circle cx="16.2" cy="10.6" r="3.1" fill="#ffb224" />
        <circle cx="16.2" cy="15.2" r="3.1" fill="#34c759" />
        <circle cx="12" cy="17.6" r="3.1" fill="#30b0ff" />
        <circle cx="7.8" cy="15.2" r="3.1" fill="#bf5af2" />
        <circle cx="7.8" cy="10.6" r="3.1" fill="#ff375f" />
      </svg>
    </span>
  )
}

export function SettingsIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-b from-[#8e8e93] to-[#636366]",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%] fill-white">
        <path d="M12 8.4a3.6 3.6 0 1 1 0 7.2 3.6 3.6 0 0 1 0-7.2Zm8.1 2.4-.9-.3.4-1.1-1.5-1.5-1.1.4-.3-.9L14.8 6h-1.6l-.3 1.4-.9.3-1.1-.4-1.5 1.5.4 1.1-.9.3L8 11.6v1.6l1.4.3.3.9-.4 1.1 1.5 1.5 1.1-.4.3.9.9 1.4h1.6l.3-1.4.9-.3 1.1.4 1.5-1.5-.4-1.1.9-.3 1.4-.9v-1.6l-1.4-.3Z" />
      </svg>
    </span>
  )
}

export function TerminalIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-[#1d1d1f]",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-[54%] w-[54%] fill-white">
        <path d="M5.4 8.2 9.8 12 5.4 15.8 6.7 17.2 12.4 12 6.7 6.8 5.4 8.2Zm7.4 8.3h5.8v1.8h-5.8V16.5Z" />
      </svg>
    </span>
  )
}

export function NotesIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square flex-col overflow-hidden bg-[#fff4a3]",
        className,
      )}
      aria-hidden
    >
      <span className="h-[22%] w-full bg-[#ffd60a]" />
    </span>
  )
}

export function HammerIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-b from-[#5ac8fa] to-[#0a84ff]",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%] fill-white">
        <path d="M14.2 4.4 19 9.2l-2.1 2.1-1.3-1.3-6.4 6.4-2.6 3.2-2.2-2.2 3.2-2.6 6.4-6.4-1.3-1.3 1.5-1.7Z" />
      </svg>
    </span>
  )
}

export function TrashIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-b from-[#d1d1d6] to-[#8e8e93]",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-[56%] w-[56%] fill-white">
        <path d="M9 4.4h6l.6 1.6H19v1.8H5V6h3.4L9 4.4Zm1.2 5.2h1.7v8.2h-1.7V9.6Zm3.9 0h1.7v8.2h-1.7V9.6ZM8 19.6 7.2 9.6h9.6L16 19.6H8Z" />
      </svg>
    </span>
  )
}

export function TicketsAppIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-black text-white",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-[52%] w-[52%]" fill="currentColor">
        <path d="M4 8.2h16v2.1a2.1 2.1 0 0 0 0 4.2v2.1H4v-2.1a2.1 2.1 0 0 0 0-4.2V8.2Zm3.2 1.6v1.3h1.5V9.8H7.2Zm0 4.7v1.3h1.5v-1.3H7.2Z" />
      </svg>
    </span>
  )
}

export function AnalyticsAppIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-[#1d1d1f] text-white",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-[52%] w-[52%]" fill="currentColor">
        <path d="M6 16.4h2.2v3H6v-3Zm4.6-5.2H13v8.2h-2.4v-8.2Zm4.7-4.6h2.3v12.8h-2.3V6.6Z" />
      </svg>
    </span>
  )
}

export function WindowsStartIcon({ className }: { className?: string }) {
  return <WindowsLogo branded className={className} />
}

export function FolderIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-transparent",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 32 28" className="h-[86%] w-[86%]">
        <path
          d="M2 7.2c0-1.4 1.1-2.5 2.5-2.5h7.1l2.2 2.3H27.4c1.4 0 2.6 1.1 2.6 2.5v13c0 1.4-1.2 2.5-2.6 2.5H4.5C3.1 25 2 23.9 2 22.5V7.2Z"
          fill="#3d9be9"
        />
        <path
          d="M2 11.2h28v11.3c0 1.4-1.2 2.5-2.6 2.5H4.5C3.1 25 2 23.9 2 22.5V11.2Z"
          fill="#5ac8fa"
        />
      </svg>
    </span>
  )
}

export function WifiGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("fill-none stroke-current", className)}
      aria-hidden
    >
      <path
        d="M4.6 10.2a10.4 10.4 0 0 1 14.8 0"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M7.6 13.4a6.2 6.2 0 0 1 8.8 0"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M10.4 16.5a2.3 2.3 0 0 1 3.2 0"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <circle cx="12" cy="19.2" r="1.15" className="fill-current stroke-none" />
    </svg>
  )
}

export function BluetoothGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("fill-none stroke-current", className)}
      aria-hidden
    >
      <path
        d="M7.4 7.2 16.6 12 12 16.4V3.8L16.6 8.2 7.4 12.8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DriveIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "os-squircle relative flex aspect-square items-center justify-center overflow-hidden bg-transparent",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 32 28" className="h-[86%] w-[86%]">
        <rect x="4" y="4" width="24" height="20" rx="3" fill="#d8d8dc" />
        <rect x="7" y="7" width="18" height="10" rx="1.2" fill="#1d1d1f" />
        <circle cx="22.5" cy="20.4" r="1.3" fill="#8e8e93" />
      </svg>
    </span>
  )
}
