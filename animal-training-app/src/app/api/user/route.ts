import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'
import { User } from '@/models/user.model'
import { isValidEmail, isValidPassword } from '@/lib/credentialValidation'
import bcrypt from 'bcrypt'
  
export async function POST(request: Request) {
  try {
    // Connect to Database
    await connectDB();

    // Get user data fields
    const data = await request.json();
    console.log('Data:', data)
    const { fullName, email, password, admin } = data;

    // Input validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email'},
        { status: 400 }
      )
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid password'},
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      admin: admin || false
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      { 
        success: true, 
        data: userWithoutPassword 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Sign up Error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}