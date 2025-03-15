export function handleQuestionAndAnswerTopic(ctx) {
  // Check if this message is a reply to another message
  const isReply = ctx.message.reply_to_message ? true : false;

  // Check if the bot is mentioned in the message
  const messageText = ctx.message.text || "";
  const botUsername = ctx.botInfo.username;
  const isBotMentioned = messageText.includes(`@${botUsername}`);

  // Handle case where bot is mentioned in a new question
  if (isBotMentioned && !isReply) {
    const question = messageText.replace(`@${botUsername}`, "").trim();
    handleNewQuestion(ctx, question);
    return;
  }

  // Handle case where bot is mentioned in a reply to another message
  if (isBotMentioned && isReply) {
    const replyToMessage = ctx.message.reply_to_message.text || "";
    const responseText = messageText.replace(`@${botUsername}`, "").trim();
    handleReplyQuestion(ctx, replyToMessage, responseText);
    return;
  }
}

async function handleNewQuestion(ctx, question) {
  try {
    // Reply directly to the user's message that mentioned the bot
    await ctx.replyWithHTML(
      `I received your question: "<i>${question}</i>"\n\nI'll respond shortly.`,
      { reply_to_message_id: ctx.message.message_id }
    );

    // Here you would implement logic to process the question and generate an answer
    // For now we'll use a simple response
    const answer = generateAnswer(question);

    // Send the answer after a short delay to simulate processing time
    setTimeout(async () => {
      await ctx.replyWithHTML(`<b>Answer:</b> ${answer}`, {
        reply_to_message_id: ctx.message.message_id,
      });
    }, 2000);
  } catch (error) {
    console.error("Error handling new question:", error);
    await ctx.reply("Sorry, I encountered an error processing your question.", {
      reply_to_message_id: ctx.message.message_id,
    });
  }
}

async function handleReplyQuestion(ctx, originalMessage, responseText) {
  try {
    // Reply directly to the user's follow-up message
    await ctx.replyWithHTML(
      `I see you're following up on: "<i>${originalMessage.substring(0, 50)}${
        originalMessage.length > 50 ? "..." : ""
      }</i>"\n\nYour follow-up: "<i>${responseText}</i>"\n\nLet me address that.`,
      { reply_to_message_id: ctx.message.message_id }
    );

    // Process the follow-up question
    const answer = generateAnswer(responseText, originalMessage);

    // Send the answer after a short delay
    setTimeout(async () => {
      await ctx.replyWithHTML(`<b>Additional information:</b> ${answer}`, {
        reply_to_message_id: ctx.message.message_id,
      });
    }, 2000);
  } catch (error) {
    console.error("Error handling reply question:", error);
    await ctx.reply(
      "Sorry, I encountered an error processing your follow-up question.",
      { reply_to_message_id: ctx.message.message_id }
    );
  }
}

function generateAnswer(question, context = "") {
  // This is a placeholder. In a real implementation, you would:
  // 1. Use an AI model, database lookup, or other method to generate an answer
  // 2. Consider the context if this is a follow-up question

  // For demo purposes, return a simple response
  return `This is a placeholder answer to your question. In a production environment, this would be replaced with a real answer generation system.`;
}
