import { registerHandlers } from "./handlers/index.js";

import { Telegraf } from "telegraf";

import { setDefaultResultOrder } from "node:dns";
setDefaultResultOrder("ipv6first");

const bot = new Telegraf(process.env.BOT_TOKEN);

registerHandlers(bot);

// Start bot
bot
  .launch()
  .then(() => console.log("Bot is running!"))
  .catch((err) => console.error("Bot launch failed:", err));

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
