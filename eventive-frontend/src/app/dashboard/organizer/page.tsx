'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SignOutModal from '@/components/ui/SignOutModal';

// Stat Cards Component
const StatCards = () => {
  const [stats] = useState({
    totalEvents: 12,
    ticketsSold: 1847,
    upcomingEvents: 5
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Events Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Events</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalEvents}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Tickets Sold Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Tickets Sold</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{stats.ticketsSold.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Events Preview Component
const EventsPreview = () => {
  const [events] = useState([
    {
      id: '1',
      title: 'Tech Innovation Summit 2025',
      date: '2025-08-15',
      status: 'upcoming',
      attendees: 245,
      revenue: 12250
    },
    {
      id: '2',
      title: 'Digital Marketing Workshop',
      date: '2025-08-10',
      status: 'ongoing',
      attendees: 89,
      revenue: 4450
    },
    {
      id: '3',
      title: 'Product Launch Conference',
      date: '2025-08-05',
      status: 'completed',
      attendees: 156,
      revenue: 7800
    },
    {
      id: '4',
      title: 'AI & Machine Learning Expo',
      date: '2025-08-25',
      status: 'upcoming',
      attendees: 320,
      revenue: 16000
    },
    {
      id: '5',
      title: 'Startup Networking Event',
      date: '2025-08-30',
      status: 'draft',
      attendees: 0,
      revenue: 0
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-sky-100 text-sky-700';
      case 'ongoing':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Events</h2>
        <p className="text-gray-600 mt-1">Manage and track your event performance</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow p-4 border border-gray-200 min-w-[280px] hover:shadow-md transition-shadow">
              <div className="mb-3">
                <h3 className="text-gray-900 font-semibold mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className={`${getStatusBadge(event.status)} rounded-full px-2 py-1 text-xs font-medium`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Attendees:</span>
                  <span className="text-gray-700 font-medium">{event.attendees}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Revenue:</span>
                  <span className="text-green-600 font-medium">${event.revenue.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-gray-100 text-gray-700 rounded-md py-2 px-3 text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700 transition-colors p-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function OrganizerDashboard() {
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
          <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Eventive</span>
              </Link>
              <div className="hidden md:flex items-center space-x-1">
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-600">Organizer Dashboard</span>
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
            Welcome back, {session.user?.name?.split(' ')[0] || 'Organizer'}! 🚀
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Manage your events and track performance metrics
          </p>
        </div>

        {/* Stat Cards */}
        <StatCards />

        {/* Events Preview */}
        <EventsPreview />
      </main>

      {/* Floating Action Button */}
      <Link href="/dashboard/events/create">
        <div className="fixed bottom-6 right-6 z-50">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 group">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
            <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
              Create Event
            </div>
          </div>
        </div>
      </Link>

      {/* Sign Out Modal */}
      <SignOutModal 
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        userName={session?.user?.name || 'Organizer'}
      />
    </div>
  );
}
