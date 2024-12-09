import { NextResponse } from "next/server";
import { TrainingLog } from "@/models/training_log.model";
import { Animal } from "@/models/animal.model";
import connectDB from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = request.headers.get('user-id');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const id = await params.id;
    
    const requiredFields = ['title', 'animal', 'hours', 'date', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    await connectDB();

    const existingLog = await TrainingLog.findOne({
      _id: id,
      user: userId
    });

    if (!existingLog) {
      return NextResponse.json(
        { success: false, error: 'Training log not found or unauthorized' },
        { status: 404 }
      );
    }

    const updatedLog = await TrainingLog.findByIdAndUpdate(
      id,
      {
        title: body.title,
        animal: body.animal,
        hours: Number(body.hours),
        date: new Date(body.date),
        description: body.description
      },
      { 
        new: true, 
        runValidators: true 
      }
    ).populate({
      path: 'animal',
      model: 'Animal'
    }).populate({
      path: 'user',
      model: 'User',
      select: 'fullName'
    });

    return NextResponse.json({ 
      success: true, 
      data: updatedLog 
    });

  } catch (error) {
    console.error('Training log update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update training log' },
      { status: 500 }
    );
  }
}