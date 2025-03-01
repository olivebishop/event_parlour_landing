'use client';

import { cn } from '@/lib/utils';
import { motion, Transition, Variants } from 'framer-motion';
import React, { CSSProperties } from 'react';

type SpinningTextProps = {
  children: string;
  style?: CSSProperties;
  duration?: number;
  className?: string;
  reverse?: boolean;
  fontSize?: number;
  radius?: number;
  transition?: Transition;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  showCenterDot?: boolean;
  centerDotSize?: number;
  centerDotColor?: string;
};

const BASE_TRANSITION = {
  repeat: Infinity,
  ease: 'linear',
};

const BASE_ITEM_VARIANTS = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};

export function SpinningText({
  children,
  duration = 10,
  style,
  className,
  reverse = false,
  fontSize = 0.8, // Reduced default font size from 1 to 0.8
  radius = 4, // Reduced default radius from 5 to 4
  transition,
  variants,
  showCenterDot = true, // Show center dot by default
  centerDotSize = 4, // Default size in pixels
  centerDotColor = 'white', // Default color
}: SpinningTextProps) {
  const letters = children.split('');
  const totalLetters = letters.length;

  const finalTransition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: (transition as { duration?: number })?.duration ?? duration,
  };

  const containerVariants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container,
  };

  const itemVariants = {
    ...BASE_ITEM_VARIANTS,
    ...variants?.item,
  };

  return (
    <motion.div
      className={cn('relative', className)}
      style={{
        ...style,
      }}
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      transition={finalTransition}
    >
      {letters.map((letter, index) => (
        <motion.span
          aria-hidden='true'
          key={`${index}-${letter}`}
          variants={itemVariants}
          className='absolute left-1/2 top-1/2 inline-block'
          style={
            {
              '--index': index,
              '--total': totalLetters,
              '--font-size': fontSize,
              '--radius': radius,
              fontSize: `calc(var(--font-size, 0.8) * 1rem)`,
              transform: `
                  translate(-50%, -50%)
                  rotate(calc(360deg / var(--total) * var(--index)))
                  translateY(calc(var(--radius, 4) * -1ch))
                `,
              transformOrigin: 'center',
            } as React.CSSProperties
          }
        >
          {letter}
        </motion.span>
      ))}
      {/* Center dot */}
      {showCenterDot && (
        <div
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: `${centerDotSize}px`,
            height: `${centerDotSize}px`,
            backgroundColor: centerDotColor,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      <span className='sr-only'>{children}</span>
    </motion.div>
  );
}