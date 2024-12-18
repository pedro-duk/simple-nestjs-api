import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export async function connectToMongo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database!');
  } catch (e) {
    console.log(`mongo.ts Name:${e.name} Message:${e.message}`);
  }
}
