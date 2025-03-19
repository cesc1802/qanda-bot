import { google } from "googleapis";
import { message } from "telegraf/filters";
import { config } from "../config/index.js";
import logger from "../helper/logger.js";

const googleCreds = config.GOOGLE_SHEET_CREDS;
// Google Sheets setup
const auth = new google.auth.GoogleAuth({
  credentials: googleCreds,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

export async function handleAnnouncements(bot) {
  bot.on(message("text"), async (ctx) => {
    logger.debug("Received message", {
      chat: ctx.chat,
      message: ctx.message,
      ...ctx,
    });

    const msg = ctx.message.text;
    const botUsername = ctx.botInfo.username;
    const isBotMentioned = msg.includes(`@${botUsername}`);
    const messageText = msg.replace(`@${botUsername}`, "");

    if (!isBotMentioned) return;

    await appendToSheet({
      timestamp: new Date(ctx.message.date * 1000).toISOString(),
      username: ctx.from.username || `user_${ctx.from.id}`,
      messageContent: messageText.trim(),
    });
  });
}

async function appendToSheet(data) {
  const values = [
    [
      data.timestamp,
      data.username,
      data.messageContent,
    ],
  ];
  logger.debug("Uploading data to sheet", data);

  await sheets.spreadsheets.values.append({
    spreadsheetId: config.SHEET_ID,
    range: "Sheet1!A2",
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });
}
