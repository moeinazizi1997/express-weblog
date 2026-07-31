import cors from "cors";
import helmet from "helmet";
import express from "express";
import dotenv from "dotenv";
import methodOverride from 'method-override';
import path from "path";
import hpp from "hpp";
import xss from "xss";
dotenv.config();

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

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT,()=>{
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