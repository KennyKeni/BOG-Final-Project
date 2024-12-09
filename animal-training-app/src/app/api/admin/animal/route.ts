import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
import { Animal } from '@/models/animal.model'
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

    const animals = await Animal
      .find()
      .populate({
        path: 'owner',
        model: 'User',
        select: 'fullName'
      })
      .lean()
      .exec();

    return NextResponse.json({ 
      success: true, 
      data: animals
    });

  } catch (error) {
    console.error('Admin animals fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch animals' },
      { status: 500 }
    );
  }
}