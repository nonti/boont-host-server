import express from 'express';
import { authRoutes } from './routes/authRoutes.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/errorMiddleware.js';


const app = express()
const port = 4000;

// Middlewares
app.use(express.json());
app.use(cookieParser())
app.use(errorHandler);

// Routes
app.use('/api/auth', authRoutes);

// DB Connection

let dbUrl = 'mongodb://localhost:27017/ubuntu-db'
mongoose.connect(dbUrl).then(()=> console.log('MongoDB Connected')).catch((err) => console.log('MongoDB Connection Error', err));

// Server
app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})