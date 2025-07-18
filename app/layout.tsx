import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import ClientLayout from "./ClientLayout" // Import the client layout

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MassReality",
  description:
    "🏙️  MassReality FivePD, We offer an immense hyper-realistic 1:1 Massachusetts state roleplay experience. We take our roleplay experience seriously to clone real life events. Additionally, at MassReality you can easily dive into our hard working departments to keep the state running smoothly.",
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
