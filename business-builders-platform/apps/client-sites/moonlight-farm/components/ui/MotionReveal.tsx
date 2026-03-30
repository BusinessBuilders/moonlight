'use client'

import { type ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

// Shared spring config — organic, not mechanical
const organicSpring = { type: 'spring' as const, damping: 30, stiffness: 200 }
const gentleSpring = { type: 'spring' as const, damping: 25, stiffness: 120 }

// ─── Reveal on scroll ────────────────────────────────────
interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  once?: boolean
}

const directionVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  none: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={directionVariants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px 0px' }}
      transition={{ ...organicSpring, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}

// ─── Staggered children ──────────────────────────────────
interface StaggerProps {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
}

export function Stagger({
  children,
  className = '',
  stagger = 0.06,
  delay = 0,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}

// ─── Stagger child item ──────────────────────────────────
interface StaggerItemProps {
  children: ReactNode
  className?: string
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={staggerItemVariants}
      transition={organicSpring}
    >
      {children}
    </motion.div>
  )
}

// ─── Scale in (for pills, badges) ────────────────────────
interface ScaleInProps {
  children: ReactNode
  className?: string
  delay?: number
}

const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1 },
}

export function ScaleIn({ children, className = '', delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      className={className}
      variants={scaleVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ ...gentleSpring, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}

// ─── Hero entrance (staggered load sequence) ─────────────
interface HeroRevealProps {
  children: ReactNode
  className?: string
  index: number
}

export function HeroReveal({ children, className = '', index }: HeroRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...organicSpring, delay: 0.1 + index * 0.12 }}
    >
      {children}
    </motion.div>
  )
}

// ─── Hover lift (for cards) ──────────────────────────────
interface HoverLiftProps {
  children: ReactNode
  className?: string
}

export function HoverLift({ children, className = '' }: HoverLiftProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -6,
        transition: { type: 'spring', damping: 20, stiffness: 300 },
      }}
    >
      {children}
    </motion.div>
  )
}
