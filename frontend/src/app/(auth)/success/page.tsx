'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { userAuthStore } from '@/store/authStore';
import  Loader  from '@/components/Loader';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = userAuthStore();

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type'); // Backend sends 'type', not 'userRole'
        const userParam = searchParams.get('user');

        if (!token || !type) {
          router.push('/login/patient');
          return;
        }

        // Store token in localStorage
        localStorage.setItem('token', token);

        // Parse user data from query params (backend sends it as encoded JSON)
        let userData = null;
        if (userParam) {
          try {
            userData = JSON.parse(decodeURIComponent(userParam));
          } catch (e) {
            console.error('Failed to parse user data:', e);
          }
        }

        // If we have user data from query params, use it; otherwise fetch from API
        if (userData) {
          // Set user with type information
          setUser({ ...userData, type }, token);
        } else {
          // Fallback: fetch user profile with the token using the correct endpoint
          const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
          const endpoint = type === 'doctor' ? '/api/doctor/me' : '/api/patient/me';
          const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch profile');
          }

          const responseData = await response.json();
          setUser({ ...responseData.data, type }, token);
        }

        // Redirect based on type
        if (type === 'doctor') {
          router.push('/doctor/dashboard');
        } else {
          router.push('/patient/dashboard');
        }
      } catch (err) {
        console.error('Auth success error:', err);
        router.push('/login/patient');
      }
    };

    handleAuthSuccess();
  }, [searchParams, router, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader />
        <p className="text-gray-600 mt-4">Setting up your account...</p>
      </div>
    </div>
  );
}
