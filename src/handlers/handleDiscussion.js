import { DISCUSSION_TOPIC_ID, EXAM_GROUP_ID } from "../helper/constant";

export function handleDiscussion(bot) {
    console.log("cron run every second");
    bot.telegram.sendMessage(EXAM_GROUP_ID, "cron run every second", {
      message_thread_id: DISCUSSION_TOPIC_ID,
    });
  }