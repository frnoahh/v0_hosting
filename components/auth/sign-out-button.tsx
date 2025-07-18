"use client"

import { useFormStatus } from "react-dom"
import { signOut } from "@/app/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Loader2, LogOut } from "lucide-react"

export function SignOutButton() {
  const { pending } = useFormStatus()

  return (
    <form action={signOut}>
      <Button type="submit" variant="outline" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing Out...
          </>
        ) : (
          <>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </>
        )}
      </Button>
    </form>
  )
}
