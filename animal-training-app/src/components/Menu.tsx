'use client'
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '@/app/login/page';

type View = 'training-logs' | 'animals' | 'all-training' | 'all-animals' | 'all-users';

interface MenuProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export default function Menu({ currentView, onViewChange }: MenuProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout(); 
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="h-full w-80 bg-white py-4 px-6 flex flex-col border-r-2">
      <div className="flex-1 space-y-4">
        <div 
          onClick={() => onViewChange('training-logs')}
          className={`p-3 rounded-lg flex items-center space-x-2 cursor-pointer
            ${currentView === 'training-logs' ? 'bg-primary-component text-white' : 'hover:bg-gray-100'}`}
        >
        <img 
            src="/training-logs.svg"
            alt="Edit"
            className="w-8"
          />
          <span className="text-xl pl-2">Training logs</span>
        </div>

        <div 
          onClick={() => onViewChange('animals')}
          className={`p-3 rounded-lg flex items-center space-x-2 cursor-pointer
            ${currentView === 'animals' ? 'bg-primary-component text-white' : 'hover:bg-gray-100'}`}
        >
        <img 
            src="/animals.svg"
            alt="Edit"
            className="w-8"
          />
          <span className="text-xl pl-2">Animals</span>
        </div>
        {mounted && user?.admin && (
          <>
            <div className="pt-4 font-bold text-xl text-gray-600 border-t-2 pl-3 pr-3">Admin access</div>
            
            <div 
              onClick={() => onViewChange('all-training')}
              className={`p-3 rounded-lg flex items-center space-x-2 cursor-pointer
              ${currentView === 'all-training' ? 'bg-primary-component text-white' : 'hover:bg-gray-100'}`}
            >
              <img 
                  src="/all-training.svg"
                  alt="Edit"
                  className="w-8"
                />
              <span className="text-xl pl-2">All training</span>
            </div>

            <div 
              onClick={() => onViewChange('all-animals')}
              className={`p-3 rounded-lg flex items-center space-x-2 cursor-pointer
                ${currentView === 'all-animals' ? 'bg-primary-component text-white' : 'hover:bg-gray-100'}`}
            >
              <img 
                  src="/all-animals.svg"
                  alt="Edit"
                  className="w-8"
                />
              <span className="text-xl pl-2">All animals</span>
            </div>

            <div 
              onClick={() => onViewChange('all-users')}
              className={`p-3 rounded-lg flex items-center space-x-2 cursor-pointer
                ${currentView === 'all-users' ? 'bg-primary-component text-white' : 'hover:bg-gray-100'}`}
            >
              <img 
                  src="/all-users.svg"
                  alt="Edit"
                  className="w-8"
                />
              <span className="text-xl pl-2">All users</span>
            </div>
          </>
        )}
      </div>

      {mounted && (
        <div className="pt-4 border-t">
          <div className="p-3 flex items-center space-x-2 text-gray-600">
            <span className="text-2xl">🐧</span>
            <span className="text-xl">{user?.fullName || 'User'}</span>
            <div className="flex flex-grow items-center justify-end">
              <img 
                  src="/logout.svg"
                  alt="Edit"
                  className=""
                  onClick={handleLogout}
                />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}