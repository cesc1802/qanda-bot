import { handleAnnouncements } from "./handleAnnouncement.js"
import { handleDailyAssignment } from "./handleDailyAssignment.js"
import { config } from '../config/config.js'
// import { handleDiscussion } from "./handleDiscussion.js"
import { google } from 'googleapis'

export async function registerHandlers(bot) {
    const googleCreds = config.GOOGLE_SHEET_CREDS;
    // Google Sheets setup
    const auth = new google.auth.GoogleAuth({
    credentials: googleCreds,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    await handleAnnouncements(bot, sheets)
    await handleDailyAssignment(bot, sheets)
    // handleDiscussion(bot)
}