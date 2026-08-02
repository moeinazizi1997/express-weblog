import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import helmet from "helmet";
import express from "express";
import methodOverride from 'method-override';
import path from "path";
import hpp from "hpp";
import xss from "xss";
import { config } from "./config/app.config";
import connectDatabase from "./config/db";
import limiter from "./middlewares/rateLimiter";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import userRouter from "./modules/user/routes/user.routes";


const app = express();

// Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(hpp());
// --- XSS Sanitization Middleware (using the 'xss' package) ---
app.use((req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key) && typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
});

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// View engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(limiter);

app.use("/api/v1/users",userRouter);

app.use(errorHandlerMiddleware);

const PORT = config.PORT;

const server = app.listen(PORT,async ()=>{
    connectDatabase();
    console.log(`Server is listening on port ${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});