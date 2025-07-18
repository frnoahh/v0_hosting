import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MailCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <MailCheck className="h-7 w-7 text-primary" />
            Verify Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            A verification link has been sent to your email address. Please check your inbox (and spam folder) and click
            the link to activate your account.
          </p>
          <p className="text-sm text-muted-foreground">
            Once your email is verified, you will be able to access your dashboard.
          </p>
          <div className="pt-4">
            <Link href="/auth/signin">
              <Button variant="outline">Go to Sign In</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
