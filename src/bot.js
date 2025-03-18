const { Telegraf } = require('telegraf');
const { registerCommands } = require('./handlers/commands');
const { setupMiddleware } = require('./middleware/logger');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Setup middleware
setupMiddleware(bot);

// Register command handlers
registerCommands(bot);

module.exports = { bot };