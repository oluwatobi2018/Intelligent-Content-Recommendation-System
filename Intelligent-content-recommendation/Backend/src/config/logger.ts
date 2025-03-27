import winston from "winston";
import path from "path";
import ENV from "./config"; // Import environment config

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create Winston Logger
const logger = winston.createLogger({
  level: ENV.NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json(),
    logFormat
  ),
  transports: [
    // Console log (colored for development)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    // File logs for general application logs
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/app.log"),
      level: "info",
    }),

    // File logs for error messages only
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
    }),
  ],
});

// Handle uncaught exceptions and unhandled promise rejections
logger.exceptions.handle(
  new winston.transports.File({ filename: path.join(__dirname, "../logs/exceptions.log") })
);

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`);
});

export default logger;

