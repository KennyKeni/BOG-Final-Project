import { User } from "@/models/user.model";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  admin: boolean;
}

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div 
      className="w-80 h-28 p-4 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{ boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)' }}
    > 
      <div className="flex h-full items-center">
        <div className="w-16 h-16 rounded-full bg-primary-component flex justify-center items-center">
          <span className="font-bold text-3xl text-white">{user.fullName[0].toUpperCase()}</span>
        </div>
        <div className="flex flex-col ml-4">
          <div>
            <span className="font-bold text-xl">{user.fullName}</span>
          </div>
          <div className="flex flex-row mt-2 text-gray-500">
            <span>{user.admin ? 'Admin' : 'User'}</span>
            <span className="pl-1">- Atlanta, Georgia</span>
          </div>
        </div>
      </div>
    </div>
  );
}