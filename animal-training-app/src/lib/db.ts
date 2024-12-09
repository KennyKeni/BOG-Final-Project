import mongoose from 'mongoose';
import { Animal } from '@/models/animal.model';
import { TrainingLog } from '@/models/training_log.model';
import { User } from '@/models/user.model';

const MONGODB_URI = process.env.MONGODB_URI;
console.log('MongoDB URI:', MONGODB_URI ? 'exists' : 'not found');
if (!MONGODB_URI) {
  throw new Error('No URI Set!');
}

async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    if (!mongoose.models.Animal) {
      mongoose.model('Animal', Animal.schema);
    }
    if (!mongoose.models.TrainingLog) {
      mongoose.model('TrainingLog', TrainingLog.schema);
    }
    if (!mongoose.models.User) {
      mongoose.model('User', User.schema);
    }

    return await mongoose.connect(MONGODB_URI as string);
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export default connectDB;