'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ViewHeader from '@/components/ViewHeader';
import CreateAnimal from '@/components/forms/CreateAnimal';
import AnimalCard from '@/components/AnimalCard';

import { Heebo } from 'next/font/google';

const heebo = Heebo({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export interface Animal {
  _id: string;
  name: string;
  breed: string;
  hoursTrained: number;
  profilePicture: string;
  owner: {
    fullName: string;
  };
}

export default function AnimalView() {
  const { user } = useAuth();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchAnimals();
  }, [user]);

  const fetchAnimals = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch('/api/animal', {
        headers: {
          'user-id': user._id
        }
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      setAnimals(result.data);
    } catch (error) {
      console.error('Error fetching animals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div></div>;
  }

  if (isCreating) {
    return (
      <CreateAnimal 
        onCancel={() => setIsCreating(false)}
        onSave={() => {
          setIsCreating(false);
          fetchAnimals();
        }}
      />
    );
  }

  return (
    <div>
      <ViewHeader 
        title="Animals" 
        onCreateNew={() => setIsCreating(true)}
      />
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <AnimalCard 
            key={animal._id}
            animal={animal}
          />
        ))}
  
        {animals.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            No animals found
          </div>
        )}
      </div>
    </div>
  );
}