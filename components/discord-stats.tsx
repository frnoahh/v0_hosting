"use client"

import { useEffect, useState } from "react"
import { Users, Radio } from "lucide-react"

interface DiscordStats {
  memberCount: number
  onlineCount: number
}

export function DiscordStats() {
  const [stats, setStats] = useState<DiscordStats>({ memberCount: 51, onlineCount: 28 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDiscordStats = async () => {
      try {
        const response = await fetch("/api/discord")
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch Discord stats:", error)
        // Keep fallback values
      } finally {
        setLoading(false)
      }
    }

    fetchDiscordStats()

    // Refresh every 5 minutes
    const interval = setInterval(fetchDiscordStats, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        <span>{loading ? "..." : stats.memberCount} Discord Members</span>
      </div>
      <div className="flex items-center gap-2">
        <Radio className="h-4 w-4" />
        <span>{loading ? "..." : stats.onlineCount} Online Now</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <span>Server Active</span>
      </div>
    </div>
  )
}
