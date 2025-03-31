type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
  private static log(level: LogLevel, message: string, data?: Record<string, unknown>) {
    const timestamp = new Date().toISOString();
    const logMessage = { timestamp, level, message, ...data };

    // Only log "debug" messages in development mode
    if (level === "debug" && process.env.NODE_ENV !== "development") return;

    console[level === "debug" ? "debug" : level](JSON.stringify(logMessage, null, 2));
  }
}

// Dynamically create logging methods to avoid repetition
(["info", "warn", "error", "debug"] as LogLevel[]).forEach((level) => {
  Logger[level] = (message: string, data?: Record<string, unknown>) => {
    Logger.log(level, message, data);
  };
});

export default Logger;
