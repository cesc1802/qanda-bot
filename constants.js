import dotenv from "dotenv";
dotenv.config();

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

// chat special order
export const SUBMIT_HASHTAG = "#submit";

// ids
export const EXAM_GROUP_ID = process.env.EXAM_GROUP_ID;
export const ANNOUNCEMENTS_TOPIC_ID = process.env.ANNOUNCEMENTS_TOPIC_ID;
export const STUDENT_PRESENTATIONS_TOPIC_ID =
  process.env.STUDENT_PRESENTATIONS_TOPIC_ID;
export const QUESTION_AND_ANSWER_TOPIC_ID =
  process.env.QUESTION_AND_ANSWER_TOPIC_ID;
