"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface SplashScreenProps {
  onAnimationEnd: () => void
}

export function SplashScreen({ onAnimationEnd }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Start fade-in animation
    // The component is visible by default, so fade-in is implicit on mount.

    // After 1.5 seconds, start fading out
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 1500) // Logo visible for 1.5s before fading out

    // After fade-out animation completes (1s after fadeOutTimer starts), hide component
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      onAnimationEnd() // Notify parent that animation is complete
    }, 2500) // Total duration: 1.5s (visible) + 1s (fade-out) = 2.5s

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(hideTimer)
    }
  }, [onAnimationEnd])

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-1000
        ${isFadingOut ? "animate-fade-out" : "animate-fade-in"}
      `}
    >
      <Image
        src="/images/massreality-logo.png"
        alt="MassReality FivePD Logo"
        width={200}
        height={200}
        className="drop-shadow-lg"
      />
    </div>
  )
}
