import { ANNOUNCEMENTS_TOPIC_ID, EXAM_GROUP_ID } from "../helper/constant";

export function handleAnnouncements(bot) {
    console.log("cron run every second");
    bot.telegram.sendMessage(EXAM_GROUP_ID, "cron run every second", {
      message_thread_id: ANNOUNCEMENTS_TOPIC_ID,
    });
  }