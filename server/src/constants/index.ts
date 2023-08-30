import { config } from "dotenv";

config();

export const PORT = parseInt(process.env.PORT || "3001");
export const HOST = process.env.HOST || "0.0.0.0";
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3001";
export const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
export const CONNECTION_COUNT_KEY = "chat:connection-count";
export const CONNECTION_COUNT_UPDATED_CHANNEL = "chat:connection-count-updated";
export const NEW_MESSAGE_CHANNEL = "chat:new-message";
export const ALL_MESSAGES_CHANNEL = "chat:messages";
