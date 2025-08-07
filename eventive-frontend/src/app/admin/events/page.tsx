'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SignOutModal from '@/components/ui/SignOutModal';

// Admin Filter Bar Component
const AdminFilterBar = ({ filters, onFilterChange }: {
  filters: any;
  onFilterChange: (key: string, value: string) => void;
}) => {
  const [organizers] = useState([
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Sarah Johnson' },
    { id: '3', name: 'Mike Wilson' },
    { id: '4', name: 'Emily Davis' }
  ]);

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Organizer Dropdown */}
        <div className="flex-shrink-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
          <select
            value={filters.organizer}
            onChange={(e) => onFilterChange('organizer', e.target.value)}
            className="bg-white rounded-md border-gray-300 text-gray-800 px-3 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-500"
          >
            <option value="">All Organizers</option>
            {organizers.map((organizer) => (
              <option key={organizer.id} value={organizer.id}>{organizer.name}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex-shrink-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="bg-white rounded-md border-gray-300 text-gray-800 px-3 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Events</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search by event title or organizer..."
            className="w-full rounded-full shadow-sm placeholder-gray-400 border-gray-300 text-gray-800 px-4 py-2 focus:ring-2 focus:ring-sky-200 focus:border-sky-500"
          />
        </div>
      </div>
    </div>
  );
};

// Admin Events Table Component
const AdminEventsTable = ({ events, onApprove, onReject }: { 
  events: any[]; 
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) => {
  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      approved: 'bg-green-100 text-green-800 border-green-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return `px-2 py-1 rounded-full text-xs font-medium border ${statusColors[status as keyof typeof statusColors] || statusColors.pending}`;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-auto">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Organizer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">{event.organizerName}</div>
                  <div className="text-sm text-gray-500">{event.organizerEmail}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-800">{event.title}</div>
                  <div className="text-sm text-gray-500">{event.location}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-4 py-4">
                  <span className={getStatusBadge(event.status)}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {event.status === 'pending' ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onApprove(event.id)}
                        className="bg-sky-500 text-white rounded-md px-3 py-1 text-sm hover:bg-sky-600 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(event.id)}
                        className="bg-red-500 text-white rounded-md px-3 py-1 text-sm hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">No action needed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function AdminEventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  
  const [filters, setFilters] = useState({
    organizer: '',
    status: '',
    search: ''
  });

  // Mock events data
  const [events, setEvents] = useState([
    {
      id: '1',
      organizerName: 'John Smith',
      organizerEmail: 'john@example.com',
      title: 'Tech Innovation Summit 2025',
      location: 'Convention Center',
      date: '2025-08-15',
      status: 'pending'
    },
    {
      id: '2',
      organizerName: 'Sarah Johnson',
      organizerEmail: 'sarah@example.com',
      title: 'Digital Marketing Workshop',
      location: 'Business Hall',
      date: '2025-08-10',
      status: 'approved'
    },
    {
      id: '3',
      organizerName: 'Mike Wilson',
      organizerEmail: 'mike@example.com',
      title: 'Product Launch Conference',
      location: 'Tech Hub',
      date: '2025-08-05',
      status: 'rejected'
    },
    {
      id: '4',
      organizerName: 'Emily Davis',
      organizerEmail: 'emily@example.com',
      title: 'Startup Pitch Competition',
      location: 'Innovation Center',
      date: '2025-08-20',
      status: 'pending'
    }
  ]);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth');
      return;
    }
  }, [session, status, router]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApprove = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, status: 'approved' } : event
    ));
  };

  const handleReject = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, status: 'rejected' } : event
    ));
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
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
                <Link href="/dashboard/admin" className="text-sm text-gray-600 hover:text-gray-900">Admin Dashboard</Link>
                <span className="text-gray-400">/</span>
                <span className="text-sm text-gray-900 font-semibold">Event Management</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Admin: <span className="font-semibold">{session.user?.name}</span>
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
          <p className="text-lg text-gray-600 mt-2">Review and manage event submissions from organizers</p>
        </div>

        {/* Admin Filter Bar */}
        <AdminFilterBar filters={filters} onFilterChange={handleFilterChange} />

        {/* Admin Events Table */}
        <AdminEventsTable 
          events={events} 
          onApprove={handleApprove}
          onReject={handleReject}
        />

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {events.filter(e => e.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">
              {events.filter(e => e.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Approved Events</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-red-600">
              {events.filter(e => e.status === 'rejected').length}
            </div>
            <div className="text-sm text-gray-600">Rejected Events</div>
          </div>
        </div>
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
