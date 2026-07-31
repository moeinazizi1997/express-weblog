import { getEnv } from "../utils/get-env";

const appConfig = ()=>({
    NODE_ENV : getEnv("NODE_ENV","development"),
    PORT : getEnv("PORT","5000"),
    MONGO_URI : getEnv("MONGO_URI"),
    REDIS_URI : getEnv("REDIS_URI")
});

export const config = appConfig();