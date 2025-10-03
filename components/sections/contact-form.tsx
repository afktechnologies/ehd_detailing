"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 900))
      toast({ title: "Request sent", description: "We’ll get back to you shortly." })
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border bg-card p-6">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" name="name" required placeholder="Your name" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" name="email" type="email" required placeholder="you@example.com" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="vehicle" className="text-sm font-medium">
          Vehicle
        </label>
        <Input id="vehicle" name="vehicle" placeholder="Make / Model / Year" />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          What are you looking for?
        </label>
        <Textarea id="message" name="message" rows={4} placeholder="Tell us about your goals and condition" />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Request Quote"}
      </Button>
      <p className="text-xs text-muted-foreground">By submitting, you agree to be contacted about your inquiry.</p>
    </form>
  )
}
