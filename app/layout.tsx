import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FiveM Community - Roleplay Server",
  description:
    "🏙️  MassReality FivePD, We offer an immense hyper-realistic 1:1 Massachusetts state roleplay experience. We take our roleplay experience seriously to clone real life events. Additionally, at MassReality you can easily dive into our hard working departments to keep the state running smoothly.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
