'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { authAPI } from '@/lib/api';
import { Admin } from '@/types';

export function useAuth() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('ur_fitness_token');
    if (token) {
      authAPI.getMe()
        .then(res => setAdmin(res.data.admin))
        .catch(() => Cookies.remove('ur_fitness_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    Cookies.remove('ur_fitness_token');
    setAdmin(null);
    window.location.href = '/admin/login';
  };

  return { admin, loading, logout };
}
