import mongoose from "mongoose";
import {config} from "../config/app.config";
import logger from "../utils/logger";

const connectDatabase = async()=>{
    try{
        const conn = await mongoose.connect(config.MONGO_URI);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        logger.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

export default connectDatabase;