import express from "express"
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors"
import selectAutoRoutes from './src/routes/selectAutoRoutes.js';
import postRoutes from './src/routes/postRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import entryRoutes from './src/routes/entryRoutes.js';
import accountRoutes from './src/routes/accountRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error('Could not connect to MongoDB:', error));

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/entries", entryRoutes)
app.use("/api/accounts", accountRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/select-auto", selectAutoRoutes)

export default app;