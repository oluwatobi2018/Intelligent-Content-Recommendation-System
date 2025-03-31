import Logger from "@/utils/logger";

const logData = [
  { level: "info", message: "Application started." },
  { level: "warn", message: "Potential issue detected", data: { user: "John Doe" } },
  { level: "error", message: "API call failed", data: { endpoint: "/users", status: 500 } },
  { level: "debug", message: "Debugging session", data: { sessionId: "abc123" } },
];

// Log each message dynamically based on its level
logData.forEach(({ level, message, data }) => {
  Logger[level as keyof typeof Logger](message, data);
});
