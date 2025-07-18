"use client"

import { useEffect, useState } from "react"
import { Users, Shield, AlertCircle, RefreshCw, Wifi, WifiOff, Server } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ServerStats {
  discordMembers: number
  discordOnline: number
  fivemPlayers: number
  fivemMaxPlayers: number
  serverOnline: boolean
  // Removed dispatcherCount from this interface as it's no longer fetched here
  serverName?: string
  method?: string
  error?: string
}

export function ServerStats() {
  const [stats, setStats] = useState<ServerStats>({
    discordMembers: 51,
    discordOnline: 28,
    fivemPlayers: 0,
    fivemMaxPlayers: 128,
    serverOnline: false,
    // Removed dispatcherCount from initial state
  })
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchStats = async () => {
    console.log("Fetching server stats...")
    try {
      // Fetch Discord stats (now only general invite stats)
      const discordPromise = fetch("/api/discord").then((res) => res.json()) // Changed to /api/discord

      // Fetch FiveM server stats
      const fivemPromise = fetch("/api/fivem").then((res) => res.json())

      const [discordData, fivemData] = await Promise.all([discordPromise, fivemPromise])

      console.log("Discord API Response:", discordData)
      console.log("FiveM API Response:", fivemData)

      setStats({
        discordMembers: discordData.memberCount || 51, // Changed from totalMembers to memberCount
        discordOnline: discordData.onlineCount || 28, // Changed from onlineMembers to onlineCount
        fivemPlayers: fivemData.playerCount || 0,
        fivemMaxPlayers: fivemData.maxPlayers || 128,
        serverOnline: fivemData.isOnline || false,
        // Removed dispatcherCount from setStats
        serverName: fivemData.serverName,
        method: fivemData.method,
        error: fivemData.error || discordData.error,
      })

      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to fetch server stats:", error)
      // Keep existing stats but mark as error
      setStats((prev) => ({
        ...prev,
        serverOnline: false,
        error: "Connection failed",
      }))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()

    // Refresh every 60 seconds for more frequent updates with custom webapi
    const interval = setInterval(fetchStats, 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const getServerStatusText = () => {
    if (loading) return "Checking Status..."
    if (stats.method === "custom-webapi" && stats.serverOnline) return "Server Online"
    if (stats.error && (stats.error.includes("FiveM") || stats.error === "Connection failed")) return "Server Issues"
    return stats.serverOnline ? "Server Online" : "Server Offline"
  }

  const getServerStatusColor = () => {
    if (loading) return "bg-yellow-500 animate-pulse"
    if (stats.method === "custom-webapi" && stats.serverOnline) return "bg-green-500"
    if (stats.error && (stats.error.includes("FiveM") || stats.error === "Connection failed")) return "bg-orange-500"
    return stats.serverOnline ? "bg-green-500" : "bg-red-500"
  }

  const getServerIcon = () => {
    if (loading) return <RefreshCw className="h-4 w-4 animate-spin" />
    if (stats.method === "custom-webapi") return <Server className="h-4 w-4" />
    return stats.serverOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />
  }

  const handleRefresh = () => {
    setLoading(true)
    fetchStats()
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-2 bg-background/20 backdrop-blur px-3 py-2 rounded-full">
          <Users className="h-4 w-4" />
          <span>{loading ? "..." : stats.discordMembers} Discord Members</span>
        </div>
        <div className="flex items-center gap-2 bg-background/20 backdrop-blur px-3 py-2 rounded-full">
          <Shield className="h-4 w-4" />
          <span>{loading ? "..." : `${stats.fivemPlayers}/${stats.fivemMaxPlayers}`} Players Online</span>
        </div>
        <div className="flex items-center gap-2 bg-background/20 backdrop-blur px-3 py-2 rounded-full">
          <div className={`h-2 w-2 rounded-full ${getServerStatusColor()}`} />
          {getServerIcon()}
          <span>{getServerStatusText()}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleRefresh}
          disabled={loading}
          variant="ghost"
          size="sm"
          className="text-xs hover:bg-background/20 backdrop-blur"
        >
          <RefreshCw className={`h-3 w-3 mr-1 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh Stats"}
        </Button>
      </div>

      {stats.method === "custom-webapi" && stats.serverOnline && (
        <div className="flex items-center justify-center gap-2 text-xs text-green-400 bg-green-400/10 backdrop-blur px-3 py-2 rounded-full mx-auto w-fit">
          <Server className="h-3 w-3" />
          <span>Live API Connected</span>
        </div>
      )}

      {stats.error && stats.method !== "custom-webapi" && (
        <div className="flex items-center justify-center gap-2 text-xs text-orange-400 bg-orange-400/10 backdrop-blur px-3 py-2 rounded-full mx-auto w-fit">
          <AlertCircle className="h-3 w-3" />
          <span>Using fallback data</span>
        </div>
      )}

      {lastUpdate && !loading && (
        <div className="text-xs text-muted-foreground/70 text-center">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}

// Removed the entire useDispatcherCount export as it's no longer needed.
