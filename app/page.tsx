import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Calendar, Sparkles, Star, CheckCircle2, Car, Droplets, MessageCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import GallerySection from "@/components/sections/gallery"
import AnimatedOnView from "@/components/animated-on-view"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ContactForm from "@/components/ContactForm"

const WHATSAPP_LINK =
  "https://wa.me/447436778666?text=Hi%20EHD%20Detailing%2C%20I%27d%20like%20a%20quote%20for%20my%20car." // update number

 function SiteHeader() {
  const nav = [
    { href: "#services", label: "Services" },
    { href: "#packages", label: "Packages" },
    { href: "#gallery", label: "Gallery" },
    { href: "#process", label: "Process" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#contact", label: "Contact" },
    { href: "#faq", label: "FAQ" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-3 py-2">
        {/* Logo */}
        <Link href="#top" className="flex items-center gap-3">
          <div className="relative h-8 w-32 md:h-10 md:w-40">
            <Image
              src="/images/ehd-logo.png"
              alt="EHD Detailing logo"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          <span className="sr-only">EHD Detailing</span>
        </Link>

        {/* Nav (hidden on small screens) */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          {/* Desktop / tablet: text + icon (sm and up) */}
          <div className="hidden sm:flex items-center gap-2">
            <Button asChild className="inline-flex items-center gap-2 px-3 py-1 text-sm h-8">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex items-center"
              >
                <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={16} height={16} className="inline-block" />
                <span className="ml-1">WhatsApp</span>
              </a>
            </Button>

            <Button variant="secondary" asChild className="inline-flex items-center gap-2 px-3 py-1 text-sm h-8">
              <a href="tel:+447436778666" aria-label="Call EHD Detailing" className="flex items-center">
                <Image src="/icons/phone.svg" alt="Phone" width={16} height={16} className="inline-block" />
                <span className="ml-1">Call</span>
              </a>
            </Button>

            <Button variant="outline" asChild className="inline-flex items-center gap-2 px-3 py-1 text-sm h-8">
              <a href="mailto:info@ehddetailing.com" aria-label="Email EHD Detailing" className="flex items-center">
                <Image src="/icons/email.svg" alt="Email" width={16} height={16} className="inline-block" />
                <span className="ml-1">Email</span>
              </a>
            </Button>
          </div>

          {/* Mobile: icon-only circular buttons */}
          <div className="flex sm:hidden items-center gap-2">
            <Button asChild className="h-9 w-9 p-0 inline-flex items-center justify-center rounded-full">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="flex items-center">
                <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={18} height={18} />
              </a>
            </Button>

            <Button asChild className="h-9 w-9 p-0 inline-flex items-center justify-center rounded-full">
              <a href="tel:+447436778666" aria-label="Call EHD Detailing" className="flex items-center">
                <Image src="/icons/phone.svg" alt="Phone" width={18} height={18} />
              </a>
            </Button>

            <Button asChild className="h-9 w-9 p-0 inline-flex items-center justify-center rounded-full">
              <a href="mailto:info@ehddetailing.com" aria-label="Email EHD Detailing" className="flex items-center">
                <Image src="/icons/email.svg" alt="Email" width={18} height={18} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}


function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[90vh]">
      <Image
        src="/images/hero-gwagen.jpg"
        alt="Mercedes G‑Wagen with deep black, high‑gloss paint"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80" />
      <div className="container relative z-10 mx-auto grid min-h-[90vh] place-items-center px-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" />
            Eye-catching High-gloss Details
          </div>
          <h1 className="mt-5 text-pretty text-3xl font-semibold drop-shadow-md md:text-5xl">
            Professional Vehicle Detailing in Bathgate Excellence in Each Detail —  Make Your Vehicle Feel New Again!               </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg leading-relaxed">
            Deep Cleaning, Steam Cleaning, Pet Hair Removal, Odour Removal, Engine Bay Detail, Paint Corrections / Polishing, Cermaic Coatings, Any Size / Type of Vehicle! - Transform your Car!          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="#packages">
                <Calendar className="mr-2 h-5 w-5" /> View Packages
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const items = [
    { icon: Car, title: "Paint Correction", desc: "Remove swirls, haze, and light defects for true clarity." },
    { icon: Droplets, title: "Ceramic Coating", desc: "Long-lasting protection and insane hydrophobic behavior." },
    { icon: Sparkles, title: "Interior Deep Clean", desc: "Steam, sanitize, and protect every surface." },
    { icon: CheckCircle2, title: "Maintenance Wash", desc: "Safe contact wash to preserve your finish." },
  ]
  return (
    <section id="services" className="relative bg-background border-t border-b border-white/5">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <AnimatedOnView delay={0.02}>
            <h2 className="text-3xl md:text-4xl font-semibold">About Us</h2>
          </AnimatedOnView>
          <AnimatedOnView delay={0.08}>
            <p className="mt-3 text-muted-foreground">
              At EHD Detailing, we believe perfection is in the details.
              With care and precision we will aim to achieve mirror like finishes, spotless interiors, we don’t just clean we elevate your vehicle’s entire presence. Our craft blends precision, passion, and premium techniques to bring out the best in every curve, corner, and contour of your car. Whether it’s a daily driver or a showpiece, we treat every car like it’s our own, because great detailing isn’t just seen — it’s experienced. Book with us today and transform your vehicle
            </p>
          </AnimatedOnView>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <AnimatedOnView key={title} delay={i * 0.06}>
              <Card className="group relative overflow-hidden bg-secondary/40 ring-1 ring-border/60 transition duration-300 hover:-translate-y-1 hover:ring-primary/60 hover:shadow-[0_8px_32px_0_rgba(255,200,0,0.12)]">
                <CardHeader>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/30 transition group-hover:bg-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="mt-2 text-lg">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{desc}</CardContent>
              </Card>
            </AnimatedOnView>
          ))}
        </div>
      </div>
    </section>
  )
}

function Packages() {
  const tiers = [
    {
      name: "Standard Valet",
      price: "From £45",
      features: [
        "Prewash & handwash",
        "Wheels cleaned",
        "Interior hoover",
        "Dash & centre console cleaned",
        "Plastics wiped down",
        "Plastics wiped down",
        "Air freshener",
      ],
      highlight: false,
    },
    {
      name: "Full Valet",
      price: "From £75",
      features: [
        "Seats & carpets shampooed",
        "Leather treatment & interior protection",
        "Arches cleaned & hand dried",
        "Exterior wax, vinyl trims dressed",
        "Tar spot removal & exhaust tips polished",
        "Alloy protection & glass sealant applied",
      ],
      highlight: false,
    },
    {
      name: "Deep Clean",
      price: "From £135",
      features: [
        "Seats shampooed and extracted",
        "Full steam clean / full safe wash",
        "Full paintwork decontamination",
        "12 month protective coating",
        "Wheel sealant & glass sealant",
        "Engine bay detailed",
      ],
      highlight: false,
    },
    {
      name: "Maintenance Valet",
      price: "From £40-50",
      features: [
        "Post full valet / deep clean upkeep",
        "Keep vehicle at best possible standard",
        "Guaranteed slots every 4–6 weeks",
        "Deep clean standards maintained every time",
      ],
      highlight: false,
    },
    {
      name: "Extras",
      price: "Add-ons",
      features: [
        "Pet Hair Removal — £10",
        "Steam Clean — £15",
        "Engine Bay Detail — £20",
        "7 Seater extra — £15",
        "Machine Polishing — From £50",
        "Motorbikes — From £40",
      ],
      highlight: false,
    },
    {
      name: "Terms & Conditions",
      price: "",
      features: [
        "Prices based on average condition of vehicle",
        "Heavily soiled vehicles (dirt, pet hair, vomit) may incur extra charges",
        "Cancellation within 24 hrs of appointment may incur a charge",
      ],
      highlight: false,
    },

  ]

  return (
    <section id="packages" className="relative bg-background border-b border-white/5">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <AnimatedOnView delay={0.02}>
            <h2 className="text-3xl md:text-4xl font-semibold">Packages</h2>
          </AnimatedOnView>
          <AnimatedOnView delay={0.08}>
            <p className="mt-3 text-muted-foreground">
              Transparent pricing. Tailored to your car’s needs and condition.
            </p>
          </AnimatedOnView>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tiers.map((t, i) => {
            const card = (
              <Card
                className={cn(
                  "flex flex-col bg-secondary/40 ring-1 ring-border/60 transition duration-300 hover:scale-[1.01] hover:shadow-[0_8px_36px_0_rgba(255,200,0,0.14)]",
                  t.highlight ? "border-transparent" : "",
                )}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{t.name}</span>
                    {t.highlight && (
                      <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        Most Popular
                      </span>
                    )}
                  </CardTitle>
                  <div className="mt-2 text-3xl font-semibold">{t.price}</div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {t.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{f}</span>
                    </div>
                  ))}
                  <div className="pt-4">
                    <Button asChild className="w-full">
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" /> Book via WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )

            return (
              <AnimatedOnView key={t.name} delay={i * 0.08}>
                {t.highlight ? (
                  <div className="relative rounded-lg bg-gradient-to-b from-primary/50 via-primary/20 to-primary/0 p-[1px]">
                    {card}
                  </div>
                ) : (
                  card
                )}
              </AnimatedOnView>
            )
          })}
        </div>
      </div>
    </section>
  )
}


function Gallery() {
  return <GallerySection />
}

function Process() {
  const steps = [
    { title: "Assessment", desc: "We inspect paint and interior to prescribe the perfect treatment." },
    { title: "Decontamination", desc: "Citrus pre-wash, foam, contact wash, clay, and iron removal." },
    { title: "Correction", desc: "Machine polishing to remove swirls and unveil clarity." },
    { title: "Protection", desc: "Sealants or ceramic coatings for durable, easy-clean gloss." },
  ]
  return (
    <section id="process" className="relative bg-background border-t border-b border-white/5">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <AnimatedOnView delay={0.02}>
            <h2 className="text-3xl md:text-4xl font-semibold">Our Process</h2>
          </AnimatedOnView>
          <AnimatedOnView delay={0.08}>
            <p className="mt-3 text-muted-foreground">A proven, paint-safe methodology for repeatable excellence.</p>
          </AnimatedOnView>
        </div>
        <div className="relative mt-12">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-border to-transparent"
          />
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <AnimatedOnView key={s.title} delay={i * 0.08}>
                <Card className="relative bg-secondary/40 ring-1 ring-border/60 transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(255,200,0,0.12)]">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary ring-1 ring-primary/40">
                        {i + 1}
                      </span>
                      {s.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{s.desc}</CardContent>
                </Card>
              </AnimatedOnView>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const quotes = [
    { name: "Jamie", text: "Incredible results. My black paint looks like a mirror now." },
    { name: "Priya", text: "Professional, punctual, and meticulous. Worth every penny." },
    { name: "Owen", text: "The ceramic coating makes washing a breeze. 10/10 shine." },
    { name: "Amir", text: "Attention to detail is unreal. My interior looks brand new." },
  ]

  return (
    <section id="testimonials" className="relative bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <AnimatedOnView delay={0.02}>
            <h2 className="text-3xl md:text-4xl font-semibold">5‑Star Reviews</h2>
          </AnimatedOnView>
          <AnimatedOnView delay={0.08}>
            <p className="mt-3 text-muted-foreground">See What our clients have to say</p>
          </AnimatedOnView>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <AnimatedOnView key={i} delay={i * 0.06}>
              <Card className="relative bg-secondary/40 ring-1 ring-border/60 transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_28px_0_rgba(255,200,0,0.12)]">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-primary">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardTitle className="mt-2 text-base leading-relaxed font-normal text-foreground">
                    “{q.text}”
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">— {q.name}</CardContent>
              </Card>
            </AnimatedOnView>
          ))}
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const faqs = [
    {
      q: "How long does a full detail take?",
      a: "Typically 3–6 hours depending on vehicle size and package. Correction/coatings can extend to a full day.",
    },
    {
      q: "Do you offer mobile service?",
      a: "At the moment, we operate exclusively from our fully equipped detailing unit. This controlled environment allows us to deliver the highest quality results, with the right tools, lighting, and conditions to care for your vehicle properly. By working from our dedicated space, we can ensure a safer, cleaner, and more consistent finish every time.",
    },
    {
      q: "How long does ceramic coating last?",
      a: "Our coatings range from 6–12 months (sealant) up to multi‑year systems, depending on maintenance and package.",
    },
    {
      q: "How do I book?",
      a: "Message us on WhatsApp with your car model, condition, and goals. We’ll confirm availability and pricing.",
    },
  ]

  return (
    <section id="faq" className="relative bg-background border-t border-b border-white/5">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <AnimatedOnView delay={0.02}>
            <h2 className="text-3xl md:text-4xl font-semibold">FAQ</h2>
          </AnimatedOnView>
          <AnimatedOnView delay={0.08}>
            <p className="mt-3 text-muted-foreground">Answers to common questions from our clients.</p>
          </AnimatedOnView>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AnimatedOnView key={i} delay={i * 0.06}>
                <AccordionItem value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              </AnimatedOnView>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/images/ehd-logo.jpg" alt="EHD Detailing" width={120} height={30} />
          <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} EHD Detailing</span>
        </div>
        <div className="text-sm text-muted-foreground">Crafted with care. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default function Page() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <Services />
      <Packages />
      <Gallery />
      <Process />
      <Testimonials />
      <Faq />
      <section id="contact" className="bg-secondary/40">
        <div className="container mx-auto grid items-center gap-8 px-4 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold md:text-4xl">Questions or quotes?</h2>
            <p className="mt-3 text-muted-foreground">
              Message us on WhatsApp—send your car model, condition, and goals. We’ll reply promptly.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp chat"
        className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border bg-background/80 text-foreground shadow-lg backdrop-blur transition hover:border-primary hover:shadow-primary/30"
      >
        <MessageCircle className="h-6 w-6 text-primary" />
      </a>
    </main>
  )
}