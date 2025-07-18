"use client"

import { useActionState, useRef, useState } from "react"
import { submitApplication } from "@/app/actions/submit-application"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export function ApplicationForm() {
  const [state, formAction, isPending] = useActionState(submitApplication, {
    success: false,
    message: "",
    errors: {},
  })
  const formRef = useRef<HTMLFormElement>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")

  // Reset form on successful submission
  if (state.success && !isPending) {
    formRef.current?.reset()
    setSelectedDepartment("") // Reset selected department
  }

  const isBRCCSelected = selectedDepartment === "Boston Regional Communications Center"
  const isEarlyAccessSelected = selectedDepartment === "Early Access"

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {/* Always visible and required questions */}
      <div>
        <Label htmlFor="name">Roleplay Name</Label>
        <Input id="name" name="name" type="text" placeholder="Noah Miller" required disabled={isPending} />
        {state.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required disabled={isPending} />
        {state.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
      </div>

      {/* Discord ID Question - Always visible and required */}
      <div>
        <Label htmlFor="discordId">Discord ID (e.g., 793272843139416066)</Label>
        <Input
          id="discordId"
          name="discordId"
          type="text"
          placeholder="793272843139416066"
          required
          disabled={isPending}
        />
        {state.errors?.discordId && <p className="text-red-500 text-sm mt-1">{state.errors.discordId}</p>}
      </div>

      {/* New Age Question - Always visible and required */}
      <div>
        <Label htmlFor="age">How old are you?</Label>
        <Input
          id="age"
          name="age"
          type="number"
          placeholder="16"
          min="15" // Minimum age requirement
          required
          disabled={isPending}
        />
        {state.errors?.age && <p className="text-red-500 text-sm mt-1">{state.errors.age}</p>}
      </div>

      <div>
        <Label htmlFor="department">Department Applying For</Label>
        <Select
          name="department"
          required
          disabled={isPending}
          value={selectedDepartment} // Controlled component
          onValueChange={setSelectedDepartment} // Update state on change
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a department" />
          </SelectTrigger>
          <SelectContent>
            {/* Restricted department options */}
            <SelectItem value="Boston Regional Communications Center">Boston Regional Communications Center</SelectItem>
            <SelectItem value="Early Access">Early Access</SelectItem>
          </SelectContent>
        </Select>
        {state.errors?.department && <p className="text-red-500 text-sm mt-1">{state.errors.department}</p>}
      </div>

      {/* Conditionally rendered questions for BRCC */}
      {isBRCCSelected && (
        <>
          {/* Prior Experience Question */}
          <div>
            <Label htmlFor="priorExperience">
              Do you have any prior experience in FiveM roleplay or dispatching? If so, please describe.
            </Label>
            <Textarea
              id="priorExperience"
              name="priorExperience"
              rows={4}
              placeholder="Yes, I have 2 years of experience as a dispatcher in..."
              required={isBRCCSelected} // Required only if BRCC is selected
              disabled={isPending}
            />
            {state.errors?.priorExperience && (
              <p className="text-red-500 text-sm mt-1">{state.errors.priorExperience}</p>
            )}
          </div>

          {/* Dispatch Scenario: Structure Fire Question */}
          <div>
            <Label htmlFor="dispatchScenario">
              How would you dispatch the Boston Fire Department to a structure fire? Please describe your process.
            </Label>
            <Textarea
              id="dispatchScenario"
              name="dispatchScenario"
              rows={6}
              placeholder="3+ sentences"
              required={isBRCCSelected} // Required only if BRCC is selected
              disabled={isPending}
            />
            {state.errors?.dispatchScenario && (
              <p className="text-red-500 text-sm mt-1">{state.errors.dispatchScenario}</p>
            )}
          </div>

          {/* Dispatch Scenario: Code 5 Stop Question */}
          <div>
            <Label htmlFor="code5Scenario">
              How would you handle dispatching units to a code 5 stop (traffic stop requiring backup)? Please describe
              your process.
            </Label>
            <Textarea
              id="code5Scenario"
              name="code5Scenario"
              rows={6}
              placeholder="3+ sentences"
              required={isBRCCSelected} // Required only if BRCC is selected
              disabled={isPending}
            />
            {state.errors?.code5Scenario && <p className="text-red-500 text-sm mt-1">{state.errors.code5Scenario}</p>}
          </div>

          {/* "Tell us about yourself" question - now conditional for BRCC */}
          <div>
            <Label htmlFor="message">
              Tell us about yourself and why you want to join Boston Regional Communications Center.
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="3+ sentences"
              required={isBRCCSelected} // Required only if BRCC is selected
              disabled={isPending}
            />
            {state.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message}</p>}
          </div>
        </>
      )}

      {/* New conditionally rendered question for Early Access */}
      {isEarlyAccessSelected && (
        <div>
          <Label htmlFor="earlyAccessReason">Why would you like Early Access?</Label>
          <Textarea
            id="earlyAccessReason"
            name="earlyAccessReason"
            rows={4}
            placeholder="I am interested in Early Access because..."
            required={isEarlyAccessSelected} // Required only if Early Access is selected
            disabled={isPending}
          />
          {state.errors?.earlyAccessReason && (
            <p className="text-red-500 text-sm mt-1">{state.errors.earlyAccessReason}</p>
          )}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 hover:shadow-primary-glow"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>

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
    </form>
  )
}
