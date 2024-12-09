'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ViewHeader from '@/components/ViewHeader';

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

export default function AdminTrainingLogView() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [user]);

  const fetchLogs = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch('/api/admin/training', {
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

  return (
    <div className="flex flex-col h-full">
      <ViewHeader 
        title="Training logs" 
      />
      <div className="flex-1 min-h-0">
        <div className="h-full overflow-auto px-8">
          <div className="flex flex-col items-center space-y-6 w-full py-8">
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
                {/* <div className="mr-6 w-20 h-20 rounded-full bg-primary-component flex justify-center items-center">
                  <img 
                    src="/pencil.svg"
                    alt="Edit"
                    className=""
                  />
                </div> */}
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