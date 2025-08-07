'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUserRole, getDashboardUrl } from '@/lib/auth-utils';

export default function DashboardRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const userRole = useUserRole();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth');
      return;
    }

    // Redirect to role-specific dashboard
    const dashboardUrl = getDashboardUrl(userRole);
    router.push(dashboardUrl);
  }, [session, status, router, userRole]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  // This will show briefly while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
