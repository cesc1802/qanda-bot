import cron from "node-cron";
import { setDefaultResultOrder } from "node:dns";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import {
  QUESTION_AND_ANSWER_TOPIC_ID,
  STUDENT_PRESENTATIONS_TOPIC_ID,
  TELEGRAM_BOT_TOKEN,
} from "./constants.js";
import {
  handle1150AMAnnouncementsTopic,
  handle5AMAnnouncementsTopic,
} from "./usecase/announcement.js";
import { handleQuestionAndAnswerTopic } from "./usecase/question_and_answer.js";
import { hadleStudentPresentations } from "./usecase/student_presentations.js";

setDefaultResultOrder("ipv6first");

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.on(message("text"), async (ctx) => {
  const currentTopicID = ctx.message.message_thread_id;
  switch (currentTopicID) {
    case Number(STUDENT_PRESENTATIONS_TOPIC_ID):
      hadleStudentPresentations(ctx);
      break;
    case Number(QUESTION_AND_ANSWER_TOPIC_ID):
      handleQuestionAndAnswerTopic(ctx);
  }
});

// Run every second
// cron.schedule("* * * * * *", () => {
//   handleAnnouncementsTopicForTest(bot);
// });

// Run every day at 5:00 AM
cron.schedule("0 5 * * *", () => {
  handle5AMAnnouncementsTopic(bot);
});

// Run every day at 11:50 AM
cron.schedule("50 11 * * *", () => {
  handle1150AMAnnouncementsTopic(bot);
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

export function startBot() {
  // Start the bot
  console.log("Starting bot...");
  bot.launch();
}
