"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type Props = {
  as?: ElementType
  className?: string
  children: ReactNode
  delay?: number // seconds to stagger
  once?: boolean
}

export default function AnimatedOnView({ as: Tag = "div", className, children, delay = 0, once = true }: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current as Element | null
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true)
            if (once) io.disconnect()
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref as any}
      data-inview={inView ? "true" : "false"}
      style={{ transitionDelay: `${delay}s` }}
      className={cn("reveal-up will-change-transform", className)}
    >
      {children}
    </Tag>
  )
}
