"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

type GalleryImage = { src: string; alt?: string }

export default function GallerySection({
  title = "Gallery",
  subtitle = "Deep gloss. Crisp reflections. Mirror-like finishes.",
}: {
  title?: string
  subtitle?: string
}) {
  const images: GalleryImage[] = [
    { src: "/images/gallery/ford-transit-van.jpg", alt: "Gallery Image 1" },
    { src: "/images/gallery/golf-r-white.jpg", alt: "Gallery Image 3" },
    { src: "/images/gallery/gwagen-black.jpg", alt: "Gallery Image 4" },
    { src: "/images/gallery/mercedes-vclass.jpg", alt: "Gallery Image 5" },
    { src: "/images/gallery/range-rover-sport.jpg", alt: "Gallery Image 6" },
  ]

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const touchX = useRef<number | null>(null)

  const openLightbox = (i: number) => {
    setActiveIndex(i)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setActiveIndex((i) => (i + 1) % images.length)

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

  return (
    <section id="gallery" className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>
        <p className="mt-3 text-muted-foreground">{subtitle}</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((img, idx) => (
          <div
            key={img.src + idx}
            className="group relative aspect-video overflow-hidden rounded-lg border cursor-zoom-in"
            onClick={() => openLightbox(idx)}
            role="button"
            aria-label={img.alt || "Open image"}
          >
            <Image
              src={img.src}
              alt={img.alt || "Gallery image"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox} // clicking outside closes
        >
          {/* Close */}
          <button
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 z-[101]"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 z-[101]"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next */}
          <button
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 z-[101]"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image container: use plain <img> for reliability in fullscreen */}
          <div
            className="relative mx-auto flex h-full max-w-6xl items-center justify-center px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-center">
              <img
                src={images[activeIndex]?.src}
                alt={images[activeIndex]?.alt || "Gallery image enlarged"}
                className="max-h-[80vh] w-auto object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
