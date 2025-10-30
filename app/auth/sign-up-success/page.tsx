import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Check Your Email</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              We've sent you an email with a confirmation link. Please check your inbox and click the link to activate
              your account.
            </p>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full bg-transparent">
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
