'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ViewHeader from '@/components/ViewHeader';

interface Animal {
  _id: string;
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
  profilePicture: string;
}

interface TrainingLog {
  _id: string;
  user: string;
  animal: Animal;
  title: string;
  date: Date;
  description: string;
  hours: number;
}

interface EditTrainingLogProps {
  onCancel: () => void;
  onSave: () => void;
  trainingLog: TrainingLog;
}

export default function EditTrainingLog({ onCancel, onSave, trainingLog }: EditTrainingLogProps) {
  const { user } = useAuth();
  const [animals, setAnimals] = useState<Animal[]>([]);


  const fetchAnimals = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch('/api/animal', {
        headers: {
          'Content-Type': 'application/json',
          'user-id': user._id
        }
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      setAnimals(result.data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    }
  };
  useEffect(() => {
    fetchAnimals();
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        _id: trainingLog._id,
        title: formData.get('title'),
        animal: formData.get('animalId'),
        hours: Number(formData.get('hours')),
        date: new Date(
          Number(formData.get('year')),
          Number(formData.get('month')) - 1,
          Number(formData.get('date'))
        ),
        description: formData.get('note'),
        user: user?._id
      };

      const response = await fetch(`/api/training/${trainingLog._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'user-id': user?._id || ''
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (!result.success) throw new Error(result.error);

      onSave();
    } catch (error) {
      console.error('Error updating training log:', error);
    }
  };

  const logDate = new Date(trainingLog.date);
  const year = logDate.getFullYear();
  const month = logDate.getMonth() + 1;
  const date = logDate.getDate();

  return (
    <div>
      <ViewHeader title="Edit Training Log" />
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div>
            <label className="block text-lg mb-2 font-semibold">Title</label>
            <input 
              name="title"
              type="text" 
              className="w-full p-2 border rounded-lg"
              defaultValue={trainingLog.title}
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">Select Animal</label>
            <select 
              name="animalId"
              className="w-full p-2 border rounded-lg bg-white" 
              defaultValue={trainingLog.animal._id}
              required
            >
              {animals.map((animal) => (
                <option key={animal._id} value={animal._id} selected={animal._id === trainingLog.animal._id}>
                  {animal.name} - {animal.breed}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">Total hours trained</label>
            <input 
              name="hours"
              type="number" 
              className="w-full p-2 border rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              defaultValue={trainingLog.hours}
              min="0"
              step="1"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-lg mb-2 font-semibold">Month</label>
              <select 
                name="month"
                className="w-full p-2 border rounded-lg bg-white" 
                defaultValue={month}
                required
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const date = new Date(2000, i, 1);
                  return (
                    <option key={i} value={i + 1}>
                      {date.toLocaleString('default', { month: 'long' })}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-lg mb-2 font-semibold">Date</label>
              <input 
                name="date"
                type="number" 
                className="w-full p-2 border rounded-lg"
                defaultValue={date}
                min="1"
                max="31"
                required
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-lg mb-2 font-semibold">Year</label>
              <input 
                name="year"
                type="number" 
                className="w-full p-2 border rounded-lg"
                defaultValue={year}
                min="2000"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">Note</label>
            <textarea 
              name="note"
              className="w-full p-2 border rounded-lg h-32"
              defaultValue={trainingLog.description}
              required
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onCancel}
              className="flex-1 p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 justify-center"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 justify-center"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}