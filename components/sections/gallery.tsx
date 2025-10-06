"use client"

import Image from "next/image"
import { useMemo, useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

type GalleryImage = { src: string; alt?: string }

export default function GallerySection({
  images,
  initialVisible = 10,
  title = "Gallery",
  subtitle = "Deep gloss. Crisp reflections. Mirror-like finishes.",
}: {
  images?: GalleryImage[]
  initialVisible?: number
  title?: string
  subtitle?: string
}) {
  const fallback = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        src: `/placeholder.svg?height=480&width=720&query=car%20detailing%20closeup%20shot%20${i + 1}`,
        alt: `Detailing image ${i + 1}`,
      })),
    [],
  )

  const imgs = images && images.length > 0 ? images : fallback
  const [showAll, setShowAll] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const touchX = useRef<number | null>(null)

  const openLightbox = (i: number) => {
    setActiveIndex(i)
    setLightboxOpen(true)
  }
  const closeLightbox = () => setLightboxOpen(false)
  const prev = () => setActiveIndex((i) => (i - 1 + imgs.length) % imgs.length)
  const next = () => setActiveIndex((i) => (i + 1) % imgs.length)

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxOpen])

  const visible = showAll ? imgs : imgs.slice(0, initialVisible)
  const remaining = Math.max(imgs.length - initialVisible, 0)

  return (
    <section id="gallery" className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>
        <p className="mt-3 text-muted-foreground">{subtitle}</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((img, idx) => {
          const isLastTileCollapsed = !showAll && idx === initialVisible - 1 && remaining > 0
          return (
            <div
              key={(img.alt || img.src) + idx}
              className="group relative aspect-video overflow-hidden rounded-lg border cursor-zoom-in"
              onClick={() => openLightbox(idx)}
              role="button"
              aria-label={img.alt || "Open image"}
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt || "Gallery image"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {isLastTileCollapsed && (
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className={cn(
                    "absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm",
                    "text-center text-sm",
                  )}
                  aria-label={`Show ${remaining} more photos`}
                >
                  <span className="rounded-full border px-4 py-2 text-foreground">+{remaining} more photos</span>
                </button>
              )}
            </div>
          )
        })}
      </div>

      {remaining > 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="secondary" onClick={() => setShowAll((s) => !s)}>
            {showAll ? "Show less" : `Show all (${imgs.length})`}
          </Button>
        </div>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            const start = touchX.current
            if (start == null) return
            const end = e.changedTouches[0].clientX
            const delta = end - start
            if (Math.abs(delta) > 50) {
              delta > 0 ? prev() : next()
            }
            touchX.current = null
          }}
        >
          <button
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="relative mx-auto flex h-full max-w-6xl items-center justify-center px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full max-h-[80vh]">
              <Image
                src={imgs[activeIndex]?.src || "/placeholder.svg"}
                alt={imgs[activeIndex]?.alt || "Gallery image enlarged"}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
