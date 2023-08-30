import { Redis } from "ioredis";
import { UPSTASH_REDIS_REST_URL } from "../constants";

if (!UPSTASH_REDIS_REST_URL) {
  console.error("Missing UPSTASH_REDIS_REST_URL!");
  process.exit(1);
}

export const publisher = new Redis(UPSTASH_REDIS_REST_URL);
export const subscriber = new Redis(UPSTASH_REDIS_REST_URL);
