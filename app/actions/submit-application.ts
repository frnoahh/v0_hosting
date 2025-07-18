"use server"

import { Resend } from "resend"
import type { z } from "zod"

import type { formSchema } from "@/components/form/schema"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitApplication(input: z.infer<typeof formSchema>) {
  try {
    const data = await resend.emails.send({
      from: "onboarding@massreality.site",
      to: ["delivered@resend.dev"],
      subject: "Application Submission",
      html: `<p>Application details:</p>
         <ul>
           <li>Name: ${input.name}</li>
           <li>Email: ${input.email}</li>
           <li>Phone: ${input.phone}</li>
           <li>Age: ${input.age}</li>
           <li>City: ${input.city}</li>
           <li>Experience: ${input.experience}</li>
         </ul>`,
    })

    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}
