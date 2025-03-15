import { ANNOUNCEMENTS_TOPIC_ID, EXAM_GROUP_ID } from "../constants.js";

export function handleAnnouncementsTopicForTest(bot) {
  console.log("cron run every second");
  bot.telegram.sendMessage(EXAM_GROUP_ID, "cron run every second", {
    message_thread_id: ANNOUNCEMENTS_TOPIC_ID,
  });
}

export function handle5AMAnnouncementsTopic(bot) {
  bot.telegram.sendMessage(EXAM_GROUP_ID, "Good morning! It is 5:00 AM.", {
    message_thread_id: ANNOUNCEMENTS_TOPIC_ID,
  });
}

export function handle1150AMAnnouncementsTopic(bot) {
  bot.telegram.sendMessage(EXAM_GROUP_ID, "Almost noon! It is 11:50 AM.", {
    message_thread_id: ANNOUNCEMENTS_TOPIC_ID,
  });
}
