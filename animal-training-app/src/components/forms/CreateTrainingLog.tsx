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

interface CreateTrainingLogProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function CreateTrainingLog({ onCancel, onSave }: CreateTrainingLogProps) {
  const { user } = useAuth();
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        if (!user?._id) return;
        
        const response = await fetch('/api/animal', {
          headers: {
            'Content-Type': 'application/json',
            'user-id': user._id
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch animals');
        }

        setAnimals(result.data);
      } catch (error) {
        console.error('Error fetching animals:', error);
      }
    };

    fetchAnimals();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
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

      const response = await fetch('/api/training', {
        method: 'POST',
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
      console.error('Error saving training log:', error);
    }
  };

  return (
    <div>
      <ViewHeader 
        title="Training logs" 
      />
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div>
            <label className="block text-lg mb-2 font-semibold">Title</label>
            <input 
              name="title"
              type="text" 
              className="w-full p-2 border rounded-lg"
              placeholder="Title"
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">Select Animal</label>
            <select 
              name="animalId"
              className="w-full p-2 border rounded-lg bg-white" 
              required
            >
              <option value="">Select an animal</option>
              {animals.map((animal) => (
                <option key={animal._id} value={animal._id}>
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
              placeholder="0"
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
                className="w-full p-2 border rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="20"
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
                className="w-full p-2 border rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder={new Date().getFullYear().toString()}
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
              placeholder="Enter notes"
              required
            />
          </div>

          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onCancel}
              className="flex w-1/6 p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 justify-center"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex w-1/6 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 justify-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}