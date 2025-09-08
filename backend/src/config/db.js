import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set');
  }

  mongoose.set('strictQuery', true);

  const redacted = (() => {
    try {
      const url = new URL(mongoUri.replace('mongodb+srv://', 'http://'));
      return `${url.hostname}/${url.pathname.replace(/\//g, '')}`;
    } catch {
      return 'unparsed-uri';
    }
  })();

  console.log(`Connecting to MongoDB at ${redacted} ...`);

  await mongoose.connect(mongoUri, {
    autoIndex: true,
    serverSelectionTimeoutMS: 10000,
    family: 4,
  });

  console.log('Connected to MongoDB');
};


