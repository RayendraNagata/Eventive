'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SignOutModal from '@/components/ui/SignOutModal';

// User Stat Cards Component
const UserStatCards = () => {
  const [stats] = useState({
    ticketsOwned: 8,
    upcomingEvents: 3
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Tickets Owned Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Tickets Owned</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.ticketsOwned}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Upcoming Events Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Upcoming Events</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.upcomingEvents}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// User Events List Component
const UserEventsList = () => {
  const [userEvents] = useState([
    {
      id: '1',
      title: 'Tech Innovation Summit 2025',
      date: '2025-08-15',
      status: 'confirmed',
      ticketType: 'VIP Pass'
    },
    {
      id: '2',
      title: 'Digital Marketing Workshop',
      date: '2025-08-10',
      status: 'confirmed',
      ticketType: 'General Admission'
    },
    {
      id: '3',
      title: 'Product Launch Conference',
      date: '2025-08-20',
      status: 'pending',
      ticketType: 'Early Bird'
    },
    {
      id: '4',
      title: 'AI & Machine Learning Expo',
      date: '2025-08-25',
      status: 'confirmed',
      ticketType: 'Student Pass'
    },
    {
      id: '5',
      title: 'Startup Networking Event',
      date: '2025-08-30',
      status: 'confirmed',
      ticketType: 'Standard'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-sky-100 text-sky-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Events</h2>
        <p className="text-gray-600 mt-1">Events you're registered for</p>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="mb-3">
              <h3 className="text-gray-900 font-semibold mb-2 line-clamp-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
              <p className="text-gray-500 text-xs mb-3">{event.ticketType}</p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className={`${getStatusBadge(event.status)} rounded-full px-2 py-1 text-xs font-medium`}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </span>
            </div>

            <button className="w-full bg-indigo-500 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-indigo-600 transition-colors mt-4">
              View Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Eventive</span>
              </Link>
              <div className="hidden md:flex items-center space-x-1">
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-600">User Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-semibold">{session.user?.name}</span>
              </div>
              <button
                onClick={() => setShowSignOutModal(true)}
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session.user?.name?.split(' ')[0] || 'User'}! 🎉
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Manage your event tickets and upcoming events
          </p>
        </div>

        {/* User Stat Cards */}
        <UserStatCards />

        {/* User Events List */}
        <UserEventsList />
      </main>

      {/* Sign Out Modal */}
      <SignOutModal 
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        userName={session?.user?.name || 'User'}
      />
    </div>
  );
}
