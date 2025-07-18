"use server"

import { z } from "zod"
import { v4 as uuidv4 } from "uuid"
import { Resend } from "resend"
import { supabaseServer } from "@/lib/supabase/server" // Import the server-side Supabase client

// Define the base schema with all fields as optional initially, except for the always-required ones
const baseApplicationSchema = z.object({
  name: z.string().min(1, "Roleplay Name is required"),
  email: z.string().email("Invalid email address"),
  discordId: z.string().min(1, "Discord ID is required").max(50, "Discord ID cannot exceed 50 characters"), // Always required
  age: z
    .number() // Changed from z.coerce.number()
    .min(15, "You must be at least 15 years old to apply.")
    .max(99, "Please enter a realistic age."), // New required field with min/max
  department: z.enum(["Boston Regional Communications Center", "Early Access"], {
    errorMap: () => ({ message: "Department selection is required." }),
  }),
  priorExperience: z.string().max(1000, "Prior experience cannot exceed 1000 characters").optional(),
  dispatchScenario: z.string().max(2000, "Response cannot exceed 2000 characters").optional(),
  code5Scenario: z.string().max(2000, "Response cannot exceed 2000 characters").optional(),
  message: z.string().max(1000, "Message cannot exceed 1000 characters").optional(),
  earlyAccessReason: z.string().max(1000, "Reason cannot exceed 1000 characters").optional(),
})

// Use superRefine for conditional validation
const applicationSchema = baseApplicationSchema.superRefine((data, ctx) => {
  if (data.department === "Boston Regional Communications Center") {
    if (!data.priorExperience || data.priorExperience.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Prior experience is required for Boston Regional Communications Center applications.",
        path: ["priorExperience"],
      })
    }
    if (!data.dispatchScenario || data.dispatchScenario.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Dispatch scenario (structure fire) is required for Boston Regional Communications Center applications.",
        path: ["dispatchScenario"],
      })
    } else if (data.dispatchScenario.length < 20) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please describe your structure fire dispatch process in more detail (min 20 characters).",
        path: ["dispatchScenario"],
      })
    }
    if (!data.code5Scenario || data.code5Scenario.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Dispatch scenario (code 5 stop) is required for Boston Regional Communications Center applications.",
        path: ["code5Scenario"],
      })
    } else if (data.code5Scenario.length < 20) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please describe your code 5 stop dispatch process in more detail (min 20 characters).",
        path: ["code5Scenario"],
      })
    }
    if (!data.message || data.message.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tell us about yourself is required for Boston Regional Communications Center applications.",
        path: ["message"],
      })
    } else if (data.message.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tell us about yourself (min 10 characters).",
        path: ["message"],
      })
    }
  } else if (data.department === "Early Access") {
    if (!data.earlyAccessReason || data.earlyAccessReason.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Reason for Early Access is required.",
        path: ["earlyAccessReason"],
      })
    }
  }
})

export async function submitApplication(prevState: any, formData: FormData) {
const data = {
  name: formData.get("name"),
  email: formData.get("email"),
  discordId: formData.get("discordId"),
  age: formData.get("age") ? Number(formData.get("age")) : undefined, // This is the updated line
  department: formData.get("department"),
  priorExperience: formData.get("priorExperience") || undefined,
  dispatchScenario: formData.get("dispatchScenario") || undefined,
  code5Scenario: formData.get("code5Scenario") || undefined,
  message: formData.get("message") || undefined,
  earlyAccessReason: formData.get("earlyAccessReason") || undefined,
}

  // Validate the form data
  const parsed = applicationSchema.safeParse(data)

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors,
    }
  }

  const {
    name,
    email,
    discordId,
    age, // Destructure new age field
    department,
    priorExperience,
    dispatchScenario,
    code5Scenario,
    message,
    earlyAccessReason,
  } = parsed.data

  // Generate verification token and expiration
  const verificationToken = uuidv4()
  const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // Token valid for 24 hours

  try {
    // Save application to Supabase
    const { data: newApplication, error: dbError } = await supabaseServer
      .from("applications")
      .insert({
        name,
        email,
        discord_id: discordId,
        age,
        department,
        prior_experience: priorExperience,
        dispatch_scenario: dispatchScenario,
        code5_scenario: code5Scenario,
        message,
        early_access_reason: earlyAccessReason,
        verification_token: verificationToken,
        is_verified: false,
        token_expires_at: tokenExpiresAt.toISOString(),
      })
      .select()
      .single()

    if (dbError) {
      console.error("Supabase insert error:", dbError)
      return {
        success: false,
        message: `Failed to save application: ${dbError.message}`,
      }
    }

    // Send verification email using Resend
    const resend = new Resend(process.env.RESEND_API_KEY)
    const verificationLink = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/verify-email?token=${verificationToken}`

    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "onboarding@massreality.vercel.app", // Replace with your verified Resend domain email
      to: email,
      subject: "Verify your MassReality FivePD Application Email",
      html: `<p>Hello ${name},</p>
             <p>Thank you for applying to MassReality FivePD. Please click the link below to verify your email address:</p>
             <p><a href="${verificationLink}">Verify Email Address</a></p>
             <p>This link will expire in 24 hours.</p>
             <p>If you did not apply, please ignore this email.</p>`,
    })

    if (emailError) {
      console.error("Resend email error:", emailError)
      // You might want to delete the application from DB here if email sending is critical
      return {
        success: false,
        message: `Failed to send verification email: ${emailError.message}`,
      }
    }

    // Get the Discord webhook URL from environment variables
    const webhookUrl = process.env.DISCORD_APPLICATION_WEBHOOK_URL

    if (!webhookUrl) {
      console.error("DISCORD_APPLICATION_WEBHOOK_URL is not set.")
      return {
        success: false,
        message: "Server configuration error: Discord webhook URL is missing.",
      }
    }

    // Construct the Discord webhook payload
    const discordPayload = {
      username: "MassReality Application Bot",
      avatar_url: "https://massreality.vercel.app/images/massreality-logo.png", // Replace with your bot's avatar or server logo
      embeds: [
        {
          title: `New Application: ${name} (${department}) - Email Pending Verification`, // Indicate pending verification
          description: `A new application has been submitted for the **${department}** department. Email verification is pending.`,
          color: 0xa1c1f2, // Your primary color #a1c1f2 in decimal
          fields: [
            {
              name: "Applicant Name",
              value: name,
              inline: true,
            },
            {
              name: "Email",
              value: email,
              inline: true,
            },
            {
              name: "Discord ID",
              value: discordId,
              inline: true,
            },
            {
              name: "Age", // Add age to Discord payload
              value: age.toString(),
              inline: true,
            },
            {
              name: "Department Applied For",
              value: department,
              inline: false,
            },
            // Conditionally add fields based on department, providing "N/A" if not applicable
            ...(department === "Boston Regional Communications Center"
              ? [
                  {
                    name: "Prior Experience",
                    value: priorExperience || "N/A",
                    inline: false,
                  },
                  {
                    name: "Dispatch Scenario: Structure Fire",
                    value: dispatchScenario || "N/A",
                    inline: false,
                  },
                  {
                    name: "Dispatch Scenario: Code 5 Stop",
                    value: code5Scenario || "N/A",
                    inline: false,
                  },
                  {
                    name: "About Applicant",
                    value: message || "N/A",
                    inline: false,
                  },
                ]
              : []),
            ...(department === "Early Access"
              ? [
                  {
                    name: "Reason for Early Access",
                    value: earlyAccessReason || "N/A",
                    inline: false,
                  },
                ]
              : []),
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "MassReality FivePD Application System",
          },
        },
      ],
    }

    // Send the payload to the Discord webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordPayload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Failed to send application to Discord:", response.status, errorText)
      return {
        success: false,
        message: `Failed to send application to Discord. Status: ${response.status}`,
      }
    }

    return {
      success: true,
      message: "Application submitted successfully! Please check your email to verify your address.",
    }
  } catch (error: any) {
    console.error("Error submitting application:", error)
    return {
      success: false,
      message: `An unexpected error occurred: ${error.message}`,
    }
  }
}
