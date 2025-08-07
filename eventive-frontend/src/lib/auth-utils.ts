import { useSession } from 'next-auth/react';

export function useUserRole(): 'admin' | 'organizer' | 'user' {
  const { data: session } = useSession();
  const userEmail = session?.user?.email?.toLowerCase() || '';
  
  if (userEmail.includes('admin') || userEmail === 'admin@eventive.com') {
    return 'admin';
  } else if (userEmail.includes('organizer') || userEmail === 'organizer@eventive.com') {
    return 'organizer';
  } else {
    return 'user';
  }
}

export function getDashboardUrl(role?: 'admin' | 'organizer' | 'user'): string {
  if (!role) return '/dashboard';
  
  switch (role) {
    case 'admin':
      return '/dashboard/admin';
    case 'organizer':
      return '/dashboard/organizer';
    case 'user':
      return '/dashboard/user';
    default:
      return '/dashboard';
  }
}
