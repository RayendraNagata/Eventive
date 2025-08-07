'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SignOutModal from '@/components/ui/SignOutModal';

// UI Components with relative imports
const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}: {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  
  const variantStyles = {
    default: 'bg-sky-600 text-white shadow hover:bg-sky-700',
    outline: 'border border-gray-300 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900',
    secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200',
    ghost: 'hover:bg-gray-100 hover:text-gray-900',
    link: 'text-sky-600 underline-offset-4 hover:underline'
  };
  
  const sizeStyles = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9'
  };
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface AnalyticsData {
  totalRevenue: number;
  totalTicketsSold: number;
  totalEvents: number;
  conversionRate: number;
  monthlyRevenue: { month: string; revenue: number }[];
  topEvents: { name: string; revenue: number; tickets: number }[];
  audienceMetrics: {
    newUsers: number;
    returningUsers: number;
    averageAge: number;
    topLocations: { location: string; percentage: number }[];
  };
}

export default function Analytics() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [timeframe, setTimeframe] = useState('30days');
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [analyticsData] = useState<AnalyticsData>({
    totalRevenue: 78450,
    totalTicketsSold: 1847,
    totalEvents: 12,
    conversionRate: 68.5,
    monthlyRevenue: [
      { month: 'Jan', revenue: 12500 },
      { month: 'Feb', revenue: 15200 },
      { month: 'Mar', revenue: 18700 },
      { month: 'Apr', revenue: 22100 },
      { month: 'May', revenue: 19800 },
      { month: 'Jun', revenue: 25600 }
    ],
    topEvents: [
      { name: 'Tech Innovation Summit', revenue: 15200, tickets: 304 },
      { name: 'Digital Marketing Workshop', revenue: 12800, tickets: 256 },
      { name: 'Product Launch Conference', revenue: 11500, tickets: 230 },
      { name: 'Startup Pitch Competition', revenue: 9200, tickets: 184 }
    ],
    audienceMetrics: {
      newUsers: 1247,
      returningUsers: 600,
      averageAge: 32,
      topLocations: [
        { location: 'Jakarta', percentage: 45 },
        { location: 'Surabaya', percentage: 22 },
        { location: 'Bandung', percentage: 18 },
        { location: 'Medan', percentage: 15 }
      ]
    }
  });

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
          <p className="text-gray-600">Loading analytics...</p>
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
                <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Eventive</span>
              </Link>
              <div className="hidden md:flex items-center space-x-1">
                <span className="text-gray-400">|</span>
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
                <span className="text-gray-400">/</span>
                <span className="text-sm text-gray-900 font-semibold">Analytics</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, <span className="font-semibold">{session.user?.name}</span>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowSignOutModal(true)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-lg text-gray-600 mt-2">
              Track your event performance and audience insights
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${analyticsData.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Tickets Sold</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analyticsData.totalTicketsSold.toLocaleString()}</p>
                <p className="text-sm text-blue-600 mt-1">+8.2% from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Events Created</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analyticsData.totalEvents}</p>
                <p className="text-sm text-indigo-600 mt-1">+3 this month</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analyticsData.conversionRate}%</p>
                <p className="text-sm text-purple-600 mt-1">+2.1% from last month</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.monthlyRevenue.map((data, index) => {
              const maxRevenue = Math.max(...analyticsData.monthlyRevenue.map(d => d.revenue));
              const height = (data.revenue / maxRevenue) * 100;
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-gray-200 rounded-t-lg relative overflow-hidden">
                    <div 
                      className="bg-sky-600 rounded-t-lg transition-all duration-1000 ease-out"
                      style={{ height: `${height * 2}px` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 mt-2">{data.month}</span>
                  <span className="text-xs text-gray-500">${(data.revenue / 1000).toFixed(1)}k</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performing Events */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Events</h2>
            <div className="space-y-4">
              {analyticsData.topEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-sky-100 rounded-lg flex items-center justify-center">
                      <span className="text-sky-600 font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{event.name}</p>
                      <p className="text-sm text-gray-600">{event.tickets} tickets sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${event.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audience Insights */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Audience Insights</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">{analyticsData.audienceMetrics.newUsers.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">New Users</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">{analyticsData.audienceMetrics.returningUsers.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Returning Users</p>
                </div>
              </div>

              <div className="text-center p-4 bg-indigo-50 rounded-xl">
                <p className="text-2xl font-bold text-indigo-600">{analyticsData.audienceMetrics.averageAge}</p>
                <p className="text-sm text-gray-600">Average Age</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Top Locations</h3>
                <div className="space-y-3">
                  {analyticsData.audienceMetrics.topLocations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-900">{location.location}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-sky-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{location.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sign Out Modal */}
      <SignOutModal 
        isOpen={showSignOutModal} 
        onClose={() => setShowSignOutModal(false)} 
      />
    </div>
  );
}
