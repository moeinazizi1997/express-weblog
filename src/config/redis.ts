import Redis from "ioredis";
import logger from "../utils/logger";
import { config } from "./app.config";

export const redisClient = new Redis(config.REDIS_URI);

redisClient.on("connect", () => {
    logger.info("Redis connected");
});

redisClient.on("error", (err) => {
    logger.error("Redis error:", err);
});