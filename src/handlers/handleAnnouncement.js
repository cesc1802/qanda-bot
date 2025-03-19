import { message } from "telegraf/filters";
import { config } from "../config/index.js";
import logger from "../helper/logger.js";
import { formatDateTime } from "../helper/time.js";

export async function handleAnnouncements(bot, sheets) {
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

    const { announcementCreatedDate, announcementCreatedTime } = formatDateTime(
      new Date(ctx.message.date * 1000)
    );
    const username = ctx.from.username || `user_${ctx.from.id}`;
    const firstName = ctx.message.from.first_name;
    const lastName = ctx.message.from.last_name || "";

    await appendToSheet(
      {
        announcementCreatedDate: announcementCreatedDate,
        announcementCreatedTime: announcementCreatedTime,
        username: username,
        nameOfUser: `${firstName} ${lastName}`,
        messageContent: messageText.trim(),
      },
      sheets
    );
  });
}

async function appendToSheet(data, sheets) {
  const values = [
    [
      data.announcementCreatedDate,
      data.announcementCreatedTime,
      data.username,
      data.nameOfUser,
      data.messageContent,
    ],
  ];
  logger.debug("Upload data to sheet", data);

  const dataStartFrom = "A2";
  await sheets.spreadsheets.values.append({
    spreadsheetId: config.SPREADSHEET_ID,
    range: `${config.SHEET_NAME_ANNOUNCEMENT}!${dataStartFrom}`,
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });
}
