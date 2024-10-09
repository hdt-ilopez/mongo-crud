import mongoose from 'mongoose';

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.log('Unable to connect to Mongodb', error);
  }
};
