import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
import { User } from '@/models/user.model'
import { isValidEmail, isValidPassword } from '@/lib/credentialValidation'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    // Connect to Database
    await connectDB();

    // Email, Password
    const {email, password } = await request.json();

    // Check Email / Password
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email' },
        { status: 400 }
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid password format' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(userWithoutPassword);

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'Internel server error' },
      { status: 500 }
    )
  }
}