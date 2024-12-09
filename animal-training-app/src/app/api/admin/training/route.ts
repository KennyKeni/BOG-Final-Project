import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
import { Animal } from '@/models/animal.model'
import { TrainingLog } from '@/models/training_log.model'
import { User } from '@/models/user.model'

export async function GET(request: Request) {
  try {
    const userId = request.headers.get('user-id');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const isAdmin = await User.exists({ _id: userId, admin: true });
    
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Need Admin' },
        { status: 403 }
      );
    }

    const trainingLog = await TrainingLog
      .find()
      .populate({
        path: 'user',
        model: 'User',
        select: 'fullName'
      })
      .populate({
        path: 'animal',
        model: 'Animal'
      })
      .sort({ date: -1 })
      .lean()
      .exec();

    return NextResponse.json({ 
      success: true, 
      data: trainingLog
    });

  } catch (error) {
    console.error('Admin animals fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch animals' },
      { status: 500 }
    );
  }
}