import rateLimit from "express-rate-limit";
import { RedisStore, type RedisReply } from "rate-limit-redis";
import { redisClient } from "../config/redis";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,

    standardHeaders: true,
    legacyHeaders: false,

    store: new RedisStore({
      sendCommand: (command: string, ...args: string[]) => {
        return redisClient.call(command, ...args) as Promise<RedisReply>;
      },
    }),

    message: {
        message: "Too many requests.",
    },
});

export default limiter;