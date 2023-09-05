export const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:3001/api/v1";
export const CONNECTION_COUNT_UPDATED_CHANNEL = "chat:connection-count-updated";
export const NEW_MESSAGE_CHANNEL = "chat:new-message";
