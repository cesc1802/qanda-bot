import { SUBMIT_HASHTAG } from "../constants.js";

export async function hadleStudentPresentations(ctx) {
  const messageText = ctx.message.text;
  if (!messageText?.includes(SUBMIT_HASHTAG)) {
    return;
  }

  await ctx.reply("Received Submit!");
}
