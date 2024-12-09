import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
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

    const users = await User
      .find({})
      .select('-password')
      .lean()
      .exec();
    
    return NextResponse.json({ 
      success: true, 
      data: users
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch users' 
      },
      { status: 500 }
    )
  }
}
