import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server" // Import the server-side Supabase client

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.redirect(new URL("/verification-status?status=error&message=No token provided", request.url))
  }

  try {
    // Find the application with the given token
    const { data: application, error: fetchError } = await supabaseServer
      .from("applications")
      .select("*")
      .eq("verification_token", token)
      .single()

    if (fetchError || !application) {
      console.error("Error fetching application or application not found:", fetchError)
      return NextResponse.redirect(
        new URL("/verification-status?status=error&message=Invalid or expired verification link", request.url),
      )
    }

    if (application.is_verified) {
      return NextResponse.redirect(
        new URL("/verification-status?status=success&message=Email already verified", request.url),
      )
    }

    // Check if the token has expired
    const tokenExpiresAt = new Date(application.token_expires_at)
    if (tokenExpiresAt < new Date()) {
      return NextResponse.redirect(
        new URL("/verification-status?status=error&message=Verification link has expired", request.url),
      )
    }

    // Mark the application as verified and clear the token
    const { error: updateError } = await supabaseServer
      .from("applications")
      .update({ is_verified: true, verification_token: null }) // Clear token after use
      .eq("id", application.id)

    if (updateError) {
      console.error("Error updating application verification status:", updateError)
      return NextResponse.redirect(
        new URL("/verification-status?status=error&message=Failed to update verification status", request.url),
      )
    }

    // Optionally, send a new Discord webhook notification here
    // to indicate that the application's email has been verified.
    // This would be a separate webhook or an update to the existing one.

    return NextResponse.redirect(
      new URL("/verification-status?status=success&message=Your email has been successfully verified!", request.url),
    )
  } catch (error) {
    console.error("Email verification API error:", error)
    return NextResponse.redirect(
      new URL(
        "/verification-status?status=error&message=An unexpected error occurred during verification",
        request.url,
      ),
    )
  }
}
