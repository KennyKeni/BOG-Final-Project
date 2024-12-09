'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ViewHeader from '@/components/ViewHeader';
import UserCard from '@/components/UserCard';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  admin: boolean;
}

export default function AdminUserView() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      if (!user?._id) return;
      const response = await fetch('/api/admin/users', {
        headers: {
          'Content-Type': 'application/json',
          'user-id': user._id
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      setUsers(result.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div>
      <ViewHeader 
        title="Users" 
      />
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {users.map((userData) => (
          <UserCard 
            key={userData._id}
            user={userData}
          />
        ))}
  
        {users.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}