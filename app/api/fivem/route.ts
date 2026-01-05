export async function GET() {
  try {
    const serverIP = "31.214.128.244:29401"

    let playerCount = 0
    let maxPlayers = 10
    let isOnline = false
    let serverName = "MassReality FivePD"

    console.log("Attempting to connect to FiveM server:", serverIP)

    // Try the custom webapi info.json endpoint first (most reliable)
    try {
      const infoResponse = await fetch(`http://${serverIP}/info.json`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "MassReality-Website/1.0",
          "Cache-Control": "no-cache",
        },
        signal: AbortSignal.timeout(10000),
      })

      console.log("Custom webapi info.json response status:", infoResponse.status)

      if (infoResponse.ok) {
        const infoText = await infoResponse.text()
        console.log("Custom webapi info response:", infoText)

        if (infoText.trim().startsWith("{")) {
          try {
            const serverInfo = JSON.parse(infoText)
            playerCount = serverInfo.clients || 0
            maxPlayers = serverInfo.sv_maxclients || 10
            serverName = serverInfo.server || "MassReality FivePD"
            isOnline = true
            console.log("Successfully got custom webapi info - Players:", playerCount, "Max:", maxPlayers)
          } catch (parseError) {
            console.error("Custom webapi info JSON parse error:", parseError)
          }
        }
      } else {
        console.log("Custom webapi info.json failed with status:", infoResponse.status)
      }
    } catch (error) {
      console.log("Custom webapi info.json failed:", error.message)
    }

    // If info.json worked, also try to get detailed player list
    if (isOnline) {
      try {
        const playersResponse = await fetch(`http://${serverIP}/players.json`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "User-Agent": "MassReality-Website/1.0",
            "Cache-Control": "no-cache",
          },
          signal: AbortSignal.timeout(8000),
        })

        console.log("Custom webapi players.json response status:", playersResponse.status)

        if (playersResponse.ok) {
          const playersText = await playersResponse.text()
          console.log("Custom webapi players response (first 200 chars):", playersText.substring(0, 200))

          if (playersText.trim().startsWith("[")) {
            try {
              const players = JSON.parse(playersText)
              // Double-check player count from players array
              if (Array.isArray(players)) {
                playerCount = players.length
                console.log("Updated player count from players array:", playerCount)
              }
            } catch (parseError) {
              console.error("Custom webapi players JSON parse error:", parseError)
            }
          }
        }
      } catch (error) {
        console.log("Custom webapi players.json failed (non-critical):", error.message)
        // This is non-critical since we already have player count from info.json
      }
    }

    // If custom webapi failed, try fallback methods
    if (!isOnline) {
      console.log("Custom webapi failed, trying fallback methods...")

      // Try standard FiveM endpoints as fallback
      try {
        const fallbackResponse = await fetch(`http://${serverIP}/players.json`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; MassReality-Website/1.0)",
          },
          signal: AbortSignal.timeout(8000),
        })

        if (fallbackResponse.ok) {
          const text = await fallbackResponse.text()
          if (text.trim().startsWith("[")) {
            const players = JSON.parse(text)
            playerCount = Array.isArray(players) ? players.length : 0
            isOnline = true
            console.log("Fallback method successful, player count:", playerCount)
          }
        }
      } catch (error) {
        console.log("Fallback method also failed:", error.message)
      }

      // Final ping test
      if (!isOnline) {
        try {
          const pingResponse = await fetch(`http://${serverIP}/`, {
            method: "HEAD",
            signal: AbortSignal.timeout(5000),
          })

          if (pingResponse.status < 500) {
            isOnline = true
            console.log("Server responding to ping, marking as online with 0 players")
          }
        } catch (error) {
          console.log("Ping test failed:", error.message)
        }
      }
    }

    const result = {
      playerCount,
      maxPlayers,
      isOnline,
      serverName,
      timestamp: new Date().toISOString(),
      serverIP,
      status: isOnline ? "online" : "offline",
      method: isOnline ? "custom-webapi" : "offline",
    }

    console.log("Final FiveM API result:", result)

    return Response.json(result)
  } catch (error) {
    console.error("FiveM API error:", error)
    return Response.json(
      {
        playerCount: 0,
        maxPlayers: 128,
        isOnline: false,
        serverName: "MassReality FivePD",
        error: error.message || "Server connection failed",
        timestamp: new Date().toISOString(),
        status: "error",
        method: "error",
      },
      { status: 200 },
    )
  }
}
