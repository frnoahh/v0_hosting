import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import ClientLayout from "./ClientLayout" // Import the client layout

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MassReality",
  description: null,
  icons: {
    icon: "/images/massreality-logo.png",
  },
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
