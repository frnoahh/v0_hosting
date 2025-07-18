import { getSession } from "@/app/actions/auth-actions"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    // This case should ideally be handled by middleware, but as a fallback
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You must be logged in to view this page.</p>
            <div className="mt-4">
              <SignOutButton /> {/* This will redirect to sign-in */}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
          <User className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Welcome, {session.user.email}!</p>
          <div className="space-y-2">
            <p className="text-sm font-medium">Your User ID:</p>
            <p className="text-muted-foreground break-all">{session.user.id}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Account Created At:</p>
            <p className="text-muted-foreground">{new Date(session.user.created_at).toLocaleString()}</p>
          </div>
          <div className="pt-4">
            <SignOutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
