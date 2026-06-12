import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/funngro';

export const connectDB = async () => {
  try {
    // Attempt connection with a short timeout to prevent hanging if MongoDB is not installed/running
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`🟢 MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection failed: ${error.message}`);
    console.warn(`🟠 Falling back to local file-based storage database...`);
    return false;
  }
};
