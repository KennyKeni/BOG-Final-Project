import { NextResponse } from "next/server";
import { Animal } from "@/models/animal.model";
import connectDB from "@/lib/db";

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
    
    const animals = await Animal
      .find({ owner: userId })
      .populate({
        path: 'owner',
        model: 'User',
        select: 'fullName -_id'
      })
      .sort({ date: -1 })
      .exec();

    return NextResponse.json({ success: true, data: animals });

  } catch (error) {
    console.error('Animal fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch animals' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get('user-id');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    const requiredFields = ['name', 'breed', 'owner'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    await connectDB();

    const animal = await Animal.create({
      name: body.name,
      breed: body.breed,
      owner: userId,
      hoursTrained: body.hoursTrained || 0,
      profilePicture: body.profilePicture
    });

    const populatedAnimal = await Animal
      .findById(animal._id)
      .populate({
        path: 'owner',
        select: 'fullName -_id'
      });

    return NextResponse.json({ 
      success: true, 
      data: populatedAnimal 
    });

  } catch (error) {
    console.error('Animal creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create animal' },
      { status: 500 }
    );
  }
}