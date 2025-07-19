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

    // Send Discord webhook notification for successful email verification
    const webhookUrl = process.env.DISCORD_APPLICATION_WEBHOOK_URL

    if (webhookUrl) {
      const discordPayload = {
        username: "MassReality Application Bot",
        avatar_url: "https://massreality.vercel.app/images/massreality-logo.png",
        embeds: [
          {
            title: `✅ Email Verified: ${application.name} (${application.department})`,
            description: `The email address for **${application.name}** (Discord ID: ${application.discord_id}) applying for **${application.department}** has been successfully verified.`,
            color: 0x00ff00, // Green color
            fields: [
              {
                name: "Applicant Name",
                value: application.name,
                inline: true,
              },
              {
                name: "Email",
                value: application.email,
                inline: true,
              },
              {
                name: "Discord ID",
                value: application.discord_id,
                inline: true,
              },
              {
                name: "Department",
                value: application.department,
                inline: false,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "MassReality FivePD Application System",
            },
          },
        ],
      }

      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(discordPayload),
        })

        if (!webhookResponse.ok) {
          const errorText = await webhookResponse.text()
          console.error("Failed to send email verification webhook to Discord:", webhookResponse.status, errorText)
        } else {
          console.log("Email verification webhook sent successfully to Discord.")
        }
      } catch (webhookError) {
        console.error("Error sending email verification webhook:", webhookError)
      }
    } else {
      console.warn("DISCORD_APPLICATION_WEBHOOK_URL is not set. Skipping email verification webhook.")
    }

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
