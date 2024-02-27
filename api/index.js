import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import swaggerDocument from './routes/swagger.json' assert { type: 'json' };

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const swaggerUI = require('swagger-ui-express');

dotenv.config();
dotenv.config();
mongoose
  .connect('mongodb+srv://trongdat0501:dat0501@mern.v6br9bp.mongodb.net/mern-auth?retryWrites=true&w=majority')
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});


app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
