"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
              className="group relative aspect-video overflow-hidden rounded-lg border"
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
    </section>
  )
}
