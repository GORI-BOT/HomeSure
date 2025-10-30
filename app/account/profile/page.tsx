import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/account/profile-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/account"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Account
          </Link>

          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

          <ProfileForm user={user} profile={profile} />
        </div>
      </div>
    </div>
  )
}
