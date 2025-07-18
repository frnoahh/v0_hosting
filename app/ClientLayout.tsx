"use client" // This layout needs to be a client component to manage state

import type React from "react"
import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { SplashScreen } from "@/components/splash-screen" // Import the new component

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashEnd = () => {
    setShowSplash(false)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {showSplash && <SplashScreen onAnimationEnd={handleSplashEnd} />}
      <div className={`${showSplash ? "opacity-0" : "opacity-100"} transition-opacity duration-1000`}>{children}</div>
    </ThemeProvider>
  )
}
