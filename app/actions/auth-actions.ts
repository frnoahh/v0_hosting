"use server"

import { supabase } from "@/lib/supabaseClient"
import { z } from "zod"
import { redirect } from "next/navigation"
import { headers } from "next/headers" // Import headers for dynamic URL

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function signUp(prevState: any, formData: FormData) {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const { email, password } = parsed.data

  // Construct the base URL for email redirect
  const origin = headers().get("origin") || process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
  const emailRedirectTo = `${origin}/auth/callback`

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: emailRedirectTo,
    },
  })

  if (error) {
    console.error("Supabase sign-up error:", error.message)
    return {
      success: false,
      message: error.message || "Failed to sign up. Please try again.",
      errors: {},
    }
  }

  if (data.user) {
    // If user signed up successfully, record in Google Sheet
    try {
      const sheetResponse = await fetch(`${origin}/api/sheets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.user.id,
          email: data.user.email,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!sheetResponse.ok) {
        const sheetError = await sheetResponse.json()
        console.error("Failed to write to Google Sheet:", sheetError.error)
        // Don't fail the sign-up if sheet write fails, but log it.
      }
    } catch (sheetFetchError) {
      console.error("Error calling Google Sheets API:", sheetFetchError)
    }

    return {
      success: true,
      message:
        "Sign up successful! Please check your email to confirm your account. You will be redirected to the dashboard once verified.",
      errors: {},
    }
  }

  return {
    success: false,
    message: "An unexpected error occurred during sign up.",
    errors: {},
  }
}

export async function signIn(prevState: any, formData: FormData) {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const { email, password } = parsed.data

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Supabase sign-in error:", error.message)
    return {
      success: false,
      message: error.message || "Invalid credentials. Please try again.",
      errors: {},
    }
  }

  // After successful sign-in, redirect to dashboard. Middleware will handle verification check.
  redirect("/dashboard")
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Supabase sign-out error:", error.message)
  }
  redirect("/auth/signin") // Redirect to sign-in page after sign-out
}

export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}
