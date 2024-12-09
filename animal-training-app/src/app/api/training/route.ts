import { NextResponse } from "next/server";
import { TrainingLog } from "@/models/training_log.model";
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
    
    const trainingLogs = await TrainingLog
      .find({ user: userId })
      .populate({
        path: 'animal',
        model: 'Animal'
      })
      .populate({
        path: 'user',
        model: 'User',
        select: 'fullName'
      })
      .sort({ date: -1 })
      .exec();

    return NextResponse.json({ success: true, data: trainingLogs });

  } catch (error) {
    console.error('Training logs fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch training logs' },
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

    const trainingLog = await TrainingLog.create({
      user: userId,
      animal: body.animal,
      title: body.title,
      date: new Date(body.date),
      description: body.description,
      hours: Number(body.hours)
    });

    const populatedLog = await TrainingLog
      .findById(trainingLog._id)
      .populate({
        path: 'animal',
        model: 'Animal'
      });

    return NextResponse.json({ 
      success: true, 
      data: populatedLog 
    });

  } catch (error) {
    console.error('Training log creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create training log' },
      { status: 500 }
    );
  }
}