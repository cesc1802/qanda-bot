import { Telegraf } from 'telegraf';
import { registerHandlers } from './handlers';

export const bot = new Telegraf(process.env.BOT_TOKEN);

registerHandlers(bot)