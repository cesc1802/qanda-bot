import { google } from "googleapis";
import { message } from "telegraf/filters";
import { config } from "../config/index.js";

const mediaGroupCache = new Map();

const googleCreds = config.GOOGLE_SHEET_CREDS;
// Google Sheets setup
const auth = new google.auth.GoogleAuth({
  credentials: googleCreds,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

export function handleDiscussion(bot) {
  // bot.on(message("text"), async (ctx) => {
  //   bot.telegram.sendMessage(config.EXAM_GROUP_ID, "message content", {
  //     message_thread_id: DISCUSSION_TOPIC_ID,
  //   });
  // });
  // bot.on(message("text"), async (ctx) => {
  bot.on([message("text"), message("video")], async (ctx) => {
    // console.log("[DEBUG] Info", {
    //   chat: ctx.chat,
    //   message: ctx.message,
    //   ...ctx,
    // });

    const msg = ctx.message;
    const messageText = (msg.text || msg.caption || "").toLowerCase();
    const botUsername = ctx.botInfo.username;
    const isBotMentioned = messageText.includes(`@${botUsername}`);
    // const isReply = ctx.message.reply_to_message ? true : false;

    if (!isBotMentioned || !messageText.includes("#submit")) return;

    if (!msg.video && !msg.media_group_id) return;

    if (msg.text) {
      msg.text = msg.text.replace("#submit", "").trim();
      msg.text = msg.text.replace(`@${botUsername}`, "");
    }
    if (msg.caption) {
      msg.caption = msg.caption.replace("#submit", "").trim();
      msg.caption = msg.caption.replace(`@${botUsername}`, "");
    }

    // Handle single video submission
    if (!msg.media_group_id) {
      await processSingleVideo(ctx, msg.video, msg.text || msg.caption);
      return;
    }

    // Media group handling
    const groupId = msg.media_group_id;
    const now = Date.now();

    if (!mediaGroupCache.has(groupId)) {
      mediaGroupCache.set(groupId, {
        videos: [],
        processed: false,
        timestamp: now,
        caption: msg.caption,
      });
    }

    const group = mediaGroupCache.get(groupId);

    // Add video if not already present
    if (!group.videos.some((v) => v.unique_id === msg.video.file_unique_id)) {
      group.videos.push({
        video_id: msg.video.file_id,
        timestamp: new Date(msg.date * 1000).toISOString(),
      });
      mediaGroupCache.set(groupId, group);
    }

    // Process group after 3 seconds of first message
    setTimeout(async () => {
      const currentGroup = mediaGroupCache.get(groupId);
      if (!currentGroup.processed && currentGroup.videos.length > 0) {
        await processMediaGroup(ctx, groupId);
        mediaGroupCache.set(groupId, { ...currentGroup, processed: true });
      }
    }, 3000);
  });

  // Cache cleanup every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [groupId, entry] of mediaGroupCache) {
      if (now - entry.timestamp > 300000) {
        // 5 minutes
        mediaGroupCache.delete(groupId);
      }
    }
  }, 300000);
}

async function appendToSheet(data) {
  const values = [
    [
      data.timestamp,
      data.username,
      data.messageContent,
      Array.isArray(data.video_ids) ? data.video_ids.join(",") : data.video_ids,
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1!A2",
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });
}

async function processSingleVideo(ctx, video, text) {
  const botUsername = ctx.botInfo.username;
  await appendToSheet({
    timestamp: new Date(ctx.message.date * 1000).toISOString(),
    username: ctx.from.username || `user_${ctx.from.id}`,
    messageContent: text,
    video_ids: [video.file_id],
  });
}

async function processMediaGroup(ctx, groupId) {
  // Use Map.get() method instead of bracket notation
  const group = mediaGroupCache.get(groupId);

  // Add safety check to prevent accessing properties of undefined
  if (!group || !group.videos || group.videos.length === 0) {
    console.error("Group or videos not found for groupId:", groupId);
    return;
  }

  await appendToSheet({
    timestamp: group.videos[0].timestamp,
    username: ctx.from.username || `user_${ctx.from.id}`,
    messageContent: ctx.message.caption,
    video_ids: group.videos.map((v) => v.video_id),
  });
}
