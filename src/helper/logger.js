import { config } from "../config/index.js";

// Log levels
const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4
};

// Get log level from config or default to NONE in production, DEBUG in dev
const getLogLevel = () => {
  if (!config.SERVICE_ENV || config.SERVICE_ENV !== 'dev') {
    return LOG_LEVELS.INFO;
  }
  
  // If a specific log level is configured, use that
  if (config.LOG_LEVEL && LOG_LEVELS[config.LOG_LEVEL] !== undefined) {
    return LOG_LEVELS[config.LOG_LEVEL];
  }
  
  return LOG_LEVELS.DEBUG; // Otherwise, log everything in dev
};

// Logger utility function
const logger = {
  debug: (message, data) => {
    if (getLogLevel() <= LOG_LEVELS.DEBUG) {
      console.log(`[DEBUG] ${message}`, data || '');
    }
  },
  
  info: (message, data) => {
    if (getLogLevel() <= LOG_LEVELS.INFO) {
      console.log(`[INFO] ${message}`, data || '');
    }
  },
  
  warn: (message, data) => {
    if (getLogLevel() <= LOG_LEVELS.WARN) {
      console.warn(`[WARN] ${message}`, data || '');
    }
  },
  
  error: (message, data) => {
    if (getLogLevel() <= LOG_LEVELS.ERROR) {
      console.error(`[ERROR] ${message}`, data || '');
    }
  },
  
  // For backward compatibility
  log: (message, data) => {
    if (getLogLevel() <= LOG_LEVELS.DEBUG) {
      console.log(message, data || '');
    }
  }
};

export default logger; 