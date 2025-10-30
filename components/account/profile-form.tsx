"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Profile } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle } from "lucide-react"

interface ProfileFormProps {
  user: any
  profile: Profile | null
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      full_name: formData.get("full_name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
    }

    try {
      const supabase = createClient()

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        ...data,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user.email} disabled />
            <p className="text-xs text-muted-foreground">Email cannot be changed</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input id="full_name" name="full_name" defaultValue={profile?.full_name || ""} placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={profile?.phone || ""}
              placeholder="(123) 456-7890"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              defaultValue={profile?.address || ""}
              placeholder="123 Main St, City, State 12345"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {isSuccess && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <CheckCircle className="h-4 w-4" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
