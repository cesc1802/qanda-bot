import { ANNOUNCEMENT_TOPIC_ID } from "../helper/constant.js";
import {config} from "../config/config.js";

export function handleAnnouncements(bot) {
    console.log("cron run every second");
    bot.telegram.sendMessage(config.EXAM_GROUP_ID, "cron run every second", {
      message_thread_id: ANNOUNCEMENT_TOPIC_ID,
    });
  }