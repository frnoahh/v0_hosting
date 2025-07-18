"use client"

import { useActionState, useRef } from "react"
import { signUp } from "@/app/actions/auth-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, {
    success: false,
    message: "",
    errors: {},
  })
  const formRef = useRef<HTMLFormElement>(null)

  // Reset form on successful submission
  if (state.success && !isPending) {
    formRef.current?.reset()
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Sign Up</h2>
        <p className="text-muted-foreground">Create your account to get started.</p>
      </div>
      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required disabled={isPending} />
          {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required disabled={isPending} />
          {state.errors?.password && <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>}
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing Up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
      {state.message && (
        <div
          className={`mt-4 p-3 rounded-md flex items-center gap-2 ${
            state.success ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"
          }`}
        >
          {state.success ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
          <p className="text-sm">{state.message}</p>
        </div>
      )}
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  )
}
