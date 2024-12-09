'use client'
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { isValidEmail } from '@/lib/credentialValidation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      await login(email, password);
      router.push('/dashboard'); 
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please try again.');
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
          Login
        </h2>
        
        <form className="mt-8" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 bg-red-50 p-3 rounded text-center">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
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
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-primary-component hover:bg-red-600 transition-colors duration-300 mt-16 text-white text-2xl font-semibold focus:outline-none"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-lg">
          Don't have an account?{' '}
          <Link href="/signup">
            <span className="text-primary-component font-semibold hover:text-red-600 transition-colors cursor-pointer">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}