"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import content from "@/lib/content";
import {
  BatMark,
  CatMark,
  GhostMark,
  PumpkinMark,
  SpiderMark,
} from "@/components/shared/halloween-marks";
import {
  GarlandMark,
  MerrySleighMark,
  OrnamentMark,
  PineMark,
  ReindeerHeartMark,
  ReindeerMark,
  SantaMark,
  TreeMark,
} from "@/components/shared/christmas-marks";

const outgoingVariants = {
  rest: { y: "0%" },
  active: { y: "100%" },
};

const incomingVariants = {
  rest: { y: "-100%" },
  active: { y: "0%" },
};

const gestureTransition = {
  duration: 0.42,
  ease: [0.338, 0.015, 0.395, 0.959] as const,
};

const snapTransition = { duration: 0 };

const HOLD_MS = 1100;
const TOUCH_STEP_MS = 320;

type Season = "halloween" | "christmas";

type Costume = () => ReactNode;

const HALLOWEEN: Costume[] = [PumpkinMark, GhostMark, BatMark, SpiderMark, CatMark];

const CHRISTMAS: Costume[] = [
  MerrySleighMark,
  ReindeerMark,
  TreeMark,
  ReindeerHeartMark,
  OrnamentMark,
  PineMark,
  GarlandMark,
  SantaMark,
];

function seasonOn(date: Date): Season | null {
  const month = date.getMonth();
  if (month === 9) return "halloween";
  if (month === 11) return "christmas";
  return null;
}

function CostumeMark({
  icon,
  spin,
  iconClass,
}: {
  icon: ReactNode;
  spin: boolean;
  iconClass: string;
}) {
  const reduce = useReducedMotion();
  const animateIn = spin && !reduce;
  return (
    <span className="flex h-full w-full items-center justify-center">
      <motion.span
        className={cn("flex max-w-full items-center justify-center", iconClass)}
        initial={animateIn ? { rotate: -22, scale: 0.9 } : false}
        animate={{ rotate: 0, scale: 1 }}
        transition={animateIn ? gestureTransition : snapTransition}
      >
        {icon}
      </motion.span>
    </span>
  );
}

const WORDMARK = content.Footer.brandWordmark;

function renderLine(
  index: number,
  spin: boolean,
  costumes: Costume[],
  iconClass: string,
) {
  if (index <= 0 || costumes.length === 0) return WORDMARK;
  const Icon = costumes[(index - 1) % costumes.length];
  return <CostumeMark spin={spin} icon={<Icon />} iconClass={iconClass} />;
}

function nextCostume(index: number, count: number) {
  if (count <= 0 || index <= 0 || index >= count) return 1;
  return index + 1;
}

type BrandLogoLinkProps = {
  logoClassName?: string;
  /** Match the mobile header row (Get Tickets + menu). */
  matchBar?: boolean;
};

export function BrandLogoLink({ logoClassName, matchBar }: BrandLogoLinkProps) {
  const reduceMotion = useReducedMotion();
  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;

  const [display, setDisplay] = useState(0);
  const [incoming, setIncoming] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [rollId, setRollId] = useState(0);
  const [season, setSeason] = useState<Season | null>(null);

  const displayRef = useRef(0);
  const incomingRef = useRef(0);
  const rollIdRef = useRef(0);
  const animating = useRef(false);
  const pendingRequest = useRef<number | null>(null);
  const hovered = useRef(false);
  const focused = useRef(false);
  const holdTimer = useRef<number | null>(null);
  const costumeCountRef = useRef(0);
  const pressTimer = useRef<number | null>(null);
  const rollTimer = useRef<number | null>(null);
  const touchHold = useRef(false);
  const touchLeft = useRef(0);
  const pointerIsTouch = useRef(false);
  const suppressClick = useRef(false);

  const costumes = season === "christmas" ? CHRISTMAS : season === "halloween" ? HALLOWEEN : [];
  costumeCountRef.current = costumes.length;

  const clearHold = () => {
    if (holdTimer.current === null) return;
    window.clearTimeout(holdTimer.current);
    holdTimer.current = null;
  };

  const requestActive = (nextIndex: number) => {
    if (reduceMotionRef.current) {
      if (nextIndex === displayRef.current) {
        pendingRequest.current = null;
        return false;
      }
      displayRef.current = nextIndex;
      incomingRef.current = nextIndex;
      setDisplay(nextIndex);
      setIncoming(nextIndex);
      setRolling(false);
      animating.current = false;
      if (nextIndex > 0) noteCostumeLanded();
      return true;
    }

    if (animating.current) {
      pendingRequest.current = nextIndex;
      return true;
    }

    if (nextIndex === displayRef.current) {
      pendingRequest.current = null;
      return false;
    }

    animating.current = true;
    incomingRef.current = nextIndex;
    const id = rollIdRef.current + 1;
    rollIdRef.current = id;
    setIncoming(nextIndex);
    setRollId(id);
    setRolling(true);
    if (rollTimer.current !== null) window.clearTimeout(rollTimer.current);
    rollTimer.current = window.setTimeout(() => {
      rollTimer.current = null;
      completeAnimation(id);
    }, 430);
    return true;
  };

  const armHold = () => {
    clearHold();
    if (!touchHold.current && !hovered.current && !focused.current) return;
    holdTimer.current = window.setTimeout(() => {
      holdTimer.current = null;
      if (!touchHold.current && !hovered.current && !focused.current) return;
      const started = requestActive(nextCostume(displayRef.current, costumeCountRef.current));
      if (reduceMotionRef.current && started) armHold();
    }, HOLD_MS);
  };

  const armTouchStep = () => {
    clearHold();
    holdTimer.current = window.setTimeout(() => {
      holdTimer.current = null;
      if (touchLeft.current <= 0 && !touchHold.current) {
        release();
        return;
      }
      requestActive(nextCostume(displayRef.current, costumeCountRef.current));
    }, TOUCH_STEP_MS);
  };

  const noteCostumeLanded = () => {
    if (touchLeft.current > 0) {
      touchLeft.current -= 1;
      if (touchLeft.current === 0 && touchHold.current) {
        touchLeft.current = costumeCountRef.current;
      }
      if (touchLeft.current > 0) {
        armTouchStep();
        return;
      }
      release();
      return;
    }

    const pointerHeld = touchHold.current;
    const mouseActive = !pointerIsTouch.current && (hovered.current || focused.current);
    if (pointerHeld || mouseActive) armHold();
  };

  const completeAnimation = (id: number) => {
    if (id !== rollIdRef.current || !animating.current) return;
    if (rollTimer.current !== null) {
      window.clearTimeout(rollTimer.current);
      rollTimer.current = null;
    }
    animating.current = false;

    const next = incomingRef.current;
    displayRef.current = next;
    setDisplay(next);

    const queued = pendingRequest.current;
    pendingRequest.current = null;
    if (queued !== null && queued !== next) {
      requestActive(queued);
      return;
    }

    setRolling(false);
    noteCostumeLanded();
  };

  const clearPress = () => {
    if (pressTimer.current === null) return;
    window.clearTimeout(pressTimer.current);
    pressTimer.current = null;
  };

  const snapToWord = () => {
    clearHold();
    if (rollTimer.current !== null) {
      window.clearTimeout(rollTimer.current);
      rollTimer.current = null;
    }
    pendingRequest.current = null;
    animating.current = false;
    touchLeft.current = 0;
    displayRef.current = 0;
    incomingRef.current = 0;
    setDisplay(0);
    setIncoming(0);
    setRolling(false);
  };

  const endTouch = () => {
    clearPress();
    const held = touchHold.current || touchLeft.current > 0;
    touchHold.current = false;
    hovered.current = false;
    focused.current = false;
    if (held) {
      suppressClick.current = true;
      if (touchLeft.current <= 0 && !animating.current) release();
      return;
    }
    snapToWord();
  };

  const engage = () => {
    if (costumeCountRef.current === 0) return;
    clearHold();
    const current = displayRef.current;
    const started = requestActive(current === 0 ? 1 : current);
    if (touchLeft.current > 0) return;
    if (!started || reduceMotionRef.current) armHold();
  };

  const release = () => {
    clearHold();
    requestActive(0);
  };

  useEffect(() => {
    setSeason(seasonOn(new Date()));
  }, []);

  useEffect(
    () => () => {
      clearHold();
      clearPress();
      if (rollTimer.current !== null) window.clearTimeout(rollTimer.current);
    },
    [],
  );

  const wordmark = content.Footer.brandWordmark;
  const linkClass = cn(
    "inline-flex w-fit max-w-[calc(100vw-7.5rem)] items-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:max-w-none",
    matchBar && "h-10 lg:h-auto",
  );
  const wordmarkClass = cn(
    "inline-grid items-center align-middle font-heading text-xl font-semibold lowercase leading-[1.25] tracking-tight text-foreground",
    logoClassName,
    "h-auto sm:h-auto",
    matchBar && "h-10 lg:h-auto",
  );
  const iconClass = matchBar ? "h-8" : "h-7 sm:h-8";

  if (!season) {
    return (
      <Link href="/" aria-label={wordmark} className={linkClass}>
        <span className={wordmarkClass}>{WORDMARK}</span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label={wordmark}
      className={cn(linkClass, "touch-manipulation select-none")}
      onMouseEnter={() => {
        if (pointerIsTouch.current) return;
        hovered.current = true;
        engage();
      }}
      onMouseLeave={() => {
        if (pointerIsTouch.current) return;
        hovered.current = false;
        if (focused.current || touchHold.current) return;
        release();
      }}
      onFocus={() => {
        if (pointerIsTouch.current) return;
        focused.current = true;
        engage();
      }}
      onBlur={() => {
        focused.current = false;
        if (hovered.current || touchHold.current) return;
        release();
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse") {
          pointerIsTouch.current = false;
          return;
        }
        pointerIsTouch.current = true;
        hovered.current = false;
        focused.current = false;
        clearHold();
        if (!touchHold.current) snapToWord();
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // A pointer that has already ended cannot be captured.
        }
        clearPress();
        pressTimer.current = window.setTimeout(() => {
          pressTimer.current = null;
          touchHold.current = true;
          touchLeft.current = costumeCountRef.current;
          engage();
        }, 220);
      }}
      onPointerUp={(event) => {
        if (event.pointerType === "mouse") return;
        endTouch();
      }}
      onPointerCancel={(event) => {
        if (event.pointerType === "mouse") return;
        endTouch();
      }}
      onClick={(event) => {
        if (!suppressClick.current) return;
        event.preventDefault();
        suppressClick.current = false;
      }}
      onContextMenu={(event) => {
        if (touchHold.current || pressTimer.current !== null) event.preventDefault();
      }}
    >
      <span
        aria-hidden
        className={cn(
          "relative inline-grid overflow-hidden align-middle font-heading text-xl font-semibold lowercase leading-[1.25] tracking-tight text-foreground",
          logoClassName,
          "h-auto sm:h-auto",
          matchBar ? "h-14 -my-2 py-0 sm:h-14" : "py-2 -my-2",
        )}
      >
        <span className="invisible col-start-1 row-start-1 whitespace-nowrap">{WORDMARK}</span>
        <motion.span
          key={`out-${rollId}`}
          className="absolute inset-0 flex items-center whitespace-nowrap"
          variants={outgoingVariants}
          initial="rest"
          animate={rolling ? "active" : "rest"}
          transition={rolling ? gestureTransition : snapTransition}
        >
          {renderLine(display, false, costumes, iconClass)}
        </motion.span>
        <motion.span
          key={`in-${rollId}`}
          className="absolute inset-0 flex items-center whitespace-nowrap"
          variants={incomingVariants}
          initial="rest"
          animate={rolling ? "active" : "rest"}
          transition={rolling ? gestureTransition : snapTransition}
        >
          {renderLine(incoming, rolling, costumes, iconClass)}
        </motion.span>
      </span>
    </Link>
  );
}
