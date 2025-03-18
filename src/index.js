require('dotenv').config();
const { bot } = require('./bot');

// Start bot
bot.launch()
  .then(() => console.log('Bot is running!'))
  .catch((err) => console.error('Bot launch failed:', err));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));