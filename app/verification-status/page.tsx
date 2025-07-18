"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VerificationStatusPage() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status")
  const message = searchParams.get("message")

  const isSuccess = status === "success"

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            {isSuccess ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <XCircle className="h-8 w-8 text-red-500" />
            )}
            {isSuccess ? "Verification Successful!" : "Verification Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className={isSuccess ? "text-green-600" : "text-red-600"}>
            {message ||
              (isSuccess ? "Your email has been successfully verified." : "There was an issue verifying your email.")}
          </p>
          <Link href="/" passHref>
            <Button className="bg-primary hover:bg-primary/90 hover:shadow-primary-glow">Go to Homepage</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
