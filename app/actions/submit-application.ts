"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function submitApplication(formData: FormData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    discordId: formData.get("discordId"),
    age: formData.get("age") ? Number(formData.get("age")) : undefined,
    department: formData.get("department"),
    priorExperience: String(formData.get("priorExperience") || ""), // Changed
    dispatchScenario: String(formData.get("dispatchScenario") || ""), // Changed
    code5Scenario: String(formData.get("code5Scenario") || ""), // Changed
    message: String(formData.get("message") || ""), // Changed
    earlyAccessReason: String(formData.get("earlyAccessReason") || ""), // Changed
  }

  console.log(data)

  revalidatePath("/")
  redirect("/success")
}
