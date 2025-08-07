'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SignOutModal from '@/components/ui/SignOutModal';

// Global Stat Cards Component
const GlobalStatCards = () => {
  const [stats] = useState({
    totalOrganizers: 156,
    totalEvents: 423,
    totalTickets: 8947,
    totalRevenue: 567890
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Organizers Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Organizers</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalOrganizers}</p>
        </div>
      </div>

      {/* Total Events Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Events</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalEvents}</p>
        </div>
      </div>

      {/* Total Tickets Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Tickets</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalTickets.toLocaleString()}</p>
        </div>
      </div>

      {/* Total Revenue Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">${stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

// Recent Activities Component
const RecentActivities = () => {
  const [activities] = useState([
    {
      id: '1',
      icon: 'user-plus',
      description: 'New organizer "John Smith" registered',
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      icon: 'calendar',
      description: 'Event "Tech Summit 2025" was approved',
      timestamp: '15 minutes ago'
    },
    {
      id: '3',
      icon: 'ticket',
      description: '50 tickets sold for "AI Workshop"',
      timestamp: '1 hour ago'
    },
    {
      id: '4',
      icon: 'warning',
      description: 'Event "Startup Pitch" flagged for review',
      timestamp: '2 hours ago'
    },
    {
      id: '5',
      icon: 'check',
      description: 'Event "Marketing Conference" completed',
      timestamp: '3 hours ago'
    },
    {
      id: '6',
      icon: 'x',
      description: 'Event "Music Festival" was rejected',
      timestamp: '4 hours ago'
    }
  ]);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'user-plus':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'ticket':
        return (
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L5.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'check':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'x':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
      <div className="max-h-64 overflow-y-auto space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="mt-1">{getIcon(activity.icon)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-800 text-sm">{activity.description}</p>
              <p className="text-gray-600 text-xs mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Management Tables Component
const ManagementTables = () => {
  const [organizers] = useState([
    { id: '1', name: 'John Smith', email: 'john@example.com', status: 'active' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active' },
    { id: '3', name: 'Mike Wilson', email: 'mike@example.com', status: 'suspended' },
    { id: '4', name: 'Emily Davis', email: 'emily@example.com', status: 'active' }
  ]);

  const [events] = useState([
    { id: '1', title: 'Tech Summit 2025', organizer: 'John Smith', date: '2025-08-15', status: 'approved' },
    { id: '2', title: 'AI Workshop', organizer: 'Sarah Johnson', date: '2025-08-20', status: 'pending' },
    { id: '3', title: 'Startup Pitch', organizer: 'Mike Wilson', date: '2025-08-25', status: 'pending' },
    { id: '4', title: 'Music Festival', organizer: 'Emily Davis', date: '2025-08-30', status: 'rejected' }
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Organizers Table */}
      <div className="bg-white rounded-lg shadow overflow-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Organizers Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {organizers.map((organizer) => (
                <tr key={organizer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 text-sm">{organizer.name}</td>
                  <td className="px-4 py-3 text-gray-800 text-sm">{organizer.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      organizer.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {organizer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className={`px-3 py-1 rounded-md text-xs text-white ${
                      organizer.status === 'active'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-sky-500 hover:bg-sky-600'
                    }`}>
                      {organizer.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow overflow-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Events Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Organizer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 text-sm">{event.title}</td>
                  <td className="px-4 py-3 text-gray-800 text-sm">{event.organizer}</td>
                  <td className="px-4 py-3 text-gray-800 text-sm">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      event.status === 'approved' 
                        ? 'bg-green-100 text-green-700'
                        : event.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm space-x-1">
                    {event.status === 'pending' && (
                      <>
                        <button className="px-2 py-1 bg-sky-500 text-white rounded-md text-xs hover:bg-sky-600">
                          Approve
                        </button>
                        <button className="px-2 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600">
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
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
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
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
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Eventive</span>
              </Link>
              <div className="hidden md:flex items-center space-x-1">
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-600">Admin Dashboard</span>
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
            Admin Dashboard 🛡️
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Monitor and manage the entire Eventive platform
          </p>
        </div>

        {/* Global Stat Cards */}
        <GlobalStatCards />

        {/* Recent Activities */}
        <RecentActivities />

        {/* Management Tables */}
        <ManagementTables />
      </main>

      {/* Sign Out Modal */}
      <SignOutModal 
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        userName={session?.user?.name || 'Admin'}
      />
    </div>
  );
}
