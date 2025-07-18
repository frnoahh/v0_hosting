import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userId, email, timestamp } = await req.json()

    if (!userId || !email || !timestamp) {
      return NextResponse.json({ error: "Missing required fields: userId, email, timestamp" }, { status: 400 })
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // Handle newline characters
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    const range = "Sheet1!A:C" // Assuming your sheet is named 'Sheet1' and has 3 columns

    if (!spreadsheetId) {
      console.error("GOOGLE_SHEET_ID environment variable is not set.")
      return NextResponse.json({ error: "Server configuration error: Google Sheet ID is missing." }, { status: 500 })
    }

    // Append the new row to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[userId, email, timestamp]],
      },
    })

    return NextResponse.json(
      { message: "User data written to Google Sheet successfully", updates: response.data },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Error writing to Google Sheet:", error.message, error.stack)
    return NextResponse.json({ error: "Failed to write data to Google Sheet", details: error.message }, { status: 500 })
  }
}
