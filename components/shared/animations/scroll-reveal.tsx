"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  
  // Define the initial and animate properties based on direction
  let initialProps = {};
  
  switch (direction) {
    case "up":
      initialProps = { opacity: 0, y: 50 };
      break;
    case "down":
      initialProps = { opacity: 0, y: -50 };
      break;
    case "left":
      initialProps = { opacity: 0, x: 50 };
      break;
    case "right":
      initialProps = { opacity: 0, x: -50 };
      break;
    default:
      initialProps = { opacity: 0, y: 50 };
  }

  return (
    <motion.div
      ref={ref}
      initial={initialProps}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initialProps}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}