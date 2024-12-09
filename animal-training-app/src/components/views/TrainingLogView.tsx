'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ViewHeader from '@/components/ViewHeader';
import CreateTrainingLog from '@/components/forms/CreateTrainingLog';
import EditTrainingLog from '@/components/forms/EditTrainingLog';

import { Heebo } from 'next/font/google';

const heebo = Heebo({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

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

export default function TrainingLogView() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingLog, setEditingLog] = useState<TrainingLog | null>(null);

  useEffect(() => {
    fetchLogs();
  }, [user]);

  const fetchLogs = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch('/api/training', {
        headers: {
          'user-id': user._id
        }
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      setLogs(result.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div></div>;
  }

  if (isCreating) {
    return (
      <CreateTrainingLog 
        onCancel={() => setIsCreating(false)}
        onSave={() => {
          setIsCreating(false);
          fetchLogs();
        }}
      />
    );
  }

  if (editingLog) {
    return (
      <EditTrainingLog 
        trainingLog={editingLog}
        onCancel={() => setEditingLog(null)}
        onSave={() => {
          setEditingLog(null);
          fetchLogs();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ViewHeader 
        title="Training logs" 
        onCreateNew={() => setIsCreating(true)}
      />
      <div className="flex-1 min-h-0">
      <div className="h-full overflow-auto px-8">
      <div className="flex flex-col items-center w-full space-y-6 py-8">
        {logs.map((log) => (
          <div 
            key={log._id} 
            className="flex max-w-6xl w-11/12 h-36 bg-white rounded-2xl overflow-hidden border-gray-50"
            style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}
          >
            <div className="bg-secondary p-4 w-36 text-white flex flex-col justify-center items-center rounded-l-2xl">
              <span className="font-['Oswald'] text-5xl font-bold">{new Date(log.date).getDate()}</span>
              <span className="text-xl font-['Oswald'] font-thin mt-4">
                {new Date(log.date).toLocaleDateString('en-US', {
                month: 'short'
                })} - {new Date(log.date).toLocaleDateString('en-US', {
                year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {log.animal ? (
                <>
                  <div className={`${heebo.className} bg-white h-full pl-6 py-3`}>
                    <h3 className={`flex items-center`}>
                      <span className="font-semibold text-2xl">{log.title}</span> 
                      <span className="text-base font-semibold text-gray-400 pl-1">• {log.hours} hours</span></h3>
                    <p className="tracking-wider text-lg text-gray-400 font-semibold mt-1">{log.animal.breed} - {log.animal.name}</p>
                    <p className="mt-4">{log.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${heebo.className} bg-white h-full pl-6 py-3`}>
                    <h3 className={`flex items-center`}>
                      <span className="font-semibold text-2xl">{log.title}</span> 
                      <span className="text-base font-semibold text-gray-400 pl-1">• {log.hours} hours</span></h3>
                    <p className="tracking-wider text-lg text-gray-400 font-semibold mt-1">No Animal found</p>
                    <p className="mt-4">{log.description}</p>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-grow justify-end items-center">
              <button 
                onClick={() => setEditingLog(log)}
                className="mr-6 w-20 h-20 rounded-full bg-primary-component flex justify-center items-center hover:bg-red-500 transition-colors duration-200"
              >
                <img 
                  src="/pencil.svg"
                  alt="Edit"
                  className="w-8 h-8"
                />
              </button>
            </div>
          </div>
        ))}
        
        {logs.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No training logs found
          </div>
        )}
      </div>
      </div>
      </div>
    </div>
  );
}