'use client'
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { isValidEmail, isValidPassword } from '@/lib/credentialValidation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password, admin }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      router.push('/login');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen -mt-[102px] flex items-center justify-center bg-white">

      <div className="absolute bottom-0 left-0">
        <img 
          src="/red-circle.svg"
          alt="decorative background shape"
          className="w-auto h-auto"
        />
      </div>

      <div className="max-w-xl w-full pb-10">
        <h2 className="text-center text-5xl font-bold text-gray-900">
          Create Account
        </h2>
        
        <form className="mt-8" onSubmit={handleSubmit}>
          {error && (
            <div className="text-primary-component bg-red-50 p-3 rounded text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-1 py-1 border-b-2 border-primary-component placeholder-black focus:outline-none"
            />
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-1 py-1 border-b-2 border-primary-component placeholder-black focus:outline-none"
            />
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-1 py-1 border-b-2 border-primary-component placeholder-black focus:outline-none"
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-1 py-1 border-b-2 border-primary-component placeholder-black focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2 mt-6">
            <input
              type="checkbox"
              id="admin"
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
              className="h-6 w-6 accent-primary-component cursor-pointer"
            />
            <label htmlFor="admin" className="text-gray-700 text-lg">
                Admin access
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-primary-component hover:bg-red-600 transition-colors duration-300 mt-8 text-white text-2xl font-semibold focus:outline-none"
          >
            Sign Up
          </button>
        </form>
      
        <p className="mt-6 text-center text-lg">
          Already have an account? <Link href="/login">
            <span className="text-primary-component font-semibold hover:text-red-600 transition-colors cursor-pointer">
              Sign in
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}