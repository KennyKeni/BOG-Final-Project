'use client'
import { useState } from 'react';
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

interface CreateAnimalProps {
  onCancel: () => void;
  onSave: () => void;
}

export default function CreateAnimal({ onCancel, onSave }: CreateAnimalProps) {
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        name: formData.get('name'),
        breed: formData.get('breed'),
        hoursTrained: Number(formData.get('hoursTrained')) || 0,
        owner: user?._id,
        profilePicture: "https://d3544la1u8djza.cloudfront.net/APHI/Blog/2024/January/munchkin-cat-breed.jpg"
      };

      const response = await fetch('/api/animal', {
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
      console.error('Error creating animal:', error);
    }
  };

  return (
    <div>
      <ViewHeader 
        title="New Animal" 
      />
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div>
            <label className="block text-lg mb-2 font-semibold">Animal Name</label>
            <input 
              name="name"
              type="text" 
              className="w-full p-2 border rounded-lg"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">Breed</label>
            <input 
              name="breed"
              type="text" 
              className="w-full p-2 border rounded-lg"
              placeholder="Animal breed"
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2 font-semibold">Total hours trained</label>
            <input 
              name="hoursTrained"
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
              <label className="block text-lg mb-2 font-semibold">Birth Month</label>
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