export async function GET() {
  try {
    const response = await fetch("https://discord.com/api/v10/invites/massreality?with_counts=true", {
      headers: {
        "User-Agent": "MassReality-Website/1.0",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch Discord data")
    }

    const data = await response.json()

    return Response.json({
      memberCount: data.approximate_member_count || 0,
      onlineCount: data.approximate_presence_count || 0,
    })
  } catch (error) {
    console.error("Discord API error:", error)
    return Response.json(
      { memberCount: 51, onlineCount: 28 }, // Fallback values
      { status: 200 },
    )
  }
}
