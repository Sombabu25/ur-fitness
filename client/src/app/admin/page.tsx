'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminRoot() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get('ur_fitness_token');
    router.replace(token ? '/admin/dashboard' : '/admin/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#7B2FFF]/30 border-t-[#7B2FFF] rounded-full animate-spin" />
    </div>
  );
}
