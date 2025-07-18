"use client"

import type * as React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_test_1234")

interface StripeProps extends React.HTMLAttributes<HTMLDivElement> {
  options: {
    mode: "payment" | "subscription"
    amount: number
    currency: string
  }
}

export function Stripe({ children, options, ...props }: StripeProps) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: options.mode,
        amount: options.amount,
        currency: options.currency,
        appearance: {
          theme: "night",
        },
      }}
    >
      <div {...props}>{children}</div>
    </Elements>
  )
}
