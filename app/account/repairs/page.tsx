import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function RepairsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: repairRequests } = await supabase
    .from("repair_requests")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in_progress":
        return "secondary"
      case "confirmed":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/account"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Account
          </Link>

          <h1 className="text-3xl font-bold mb-8">Repair Requests</h1>

          {repairRequests && repairRequests.length > 0 ? (
            <div className="space-y-6">
              {repairRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-lg">{request.appliance_type}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.brand && `${request.brand} `}
                          {request.model && `- ${request.model}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Requested on {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(request.status)} className="capitalize">
                        {request.status.replace("_", " ")}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div>
                        <p className="text-sm font-semibold">Issue Description</p>
                        <p className="text-sm text-muted-foreground">{request.issue_description}</p>
                      </div>
                      {request.technician_notes && (
                        <div>
                          <p className="text-sm font-semibold">Technician Notes</p>
                          <p className="text-sm text-muted-foreground">{request.technician_notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-muted-foreground">Service Address</p>
                      <p className="text-sm">{request.address}</p>
                      {request.preferred_date && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Preferred Date: {new Date(request.preferred_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't requested any repairs yet</p>
                <Link href="/repair">
                  <Button>Request Repair</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
