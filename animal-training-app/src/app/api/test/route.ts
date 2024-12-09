import { NextResponse } from "next/server";
import { Animal } from "@/models/animal.model";
import { TrainingLog } from "@/models/training_log.model";
import connectDB from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    // Create a test animal
    const testAnimal = await Animal.create({
      name: "Max",
      breed: "German Shepherd",
      owner: "673f0ebdcea2564c85af1a04", // Replace with a valid user ID from your database
      hoursTrained: 10,
      profilePicture: "https://placedog.net/500"
    });

    // Create a training log referencing the animal
    const testLog = await TrainingLog.create({
      user: "673f0ebdcea2564c85af1a04", // Same user ID as above
      animal: testAnimal._id,
      title: "Basic Obedience",
      date: new Date(),
      description: "Worked on sit, stay, and come commands",
      hours: 2
    });

    return NextResponse.json({ 
      success: true, 
      data: { 
        animal: testAnimal,
        trainingLog: testLog
      }
    });

  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}