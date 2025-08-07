'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

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

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  attendees: number;
  maxAttendees: number;
  description: string;
  image: string;
  organizer: string;
  tags: string[];
}

export default function PublicEvents() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Tech Innovation Summit 2025',
      date: '2025-08-15',
      time: '09:00',
      location: 'Convention Center, Jakarta',
      category: 'Technology',
      price: 50,
      attendees: 245,
      maxAttendees: 500,
      description: 'Join industry leaders for a comprehensive summit on the latest technology innovations and trends shaping the future.',
      image: '/api/placeholder/600/400',
      organizer: 'Tech Events Indonesia',
      tags: ['Innovation', 'Technology', 'Future', 'Networking']
    },
    {
      id: '2',
      title: 'Digital Marketing Workshop',
      date: '2025-08-10',
      time: '14:00',
      location: 'Business Hub, Surabaya',
      category: 'Business',
      price: 50,
      attendees: 89,
      maxAttendees: 100,
      description: 'Hands-on workshop covering modern digital marketing strategies, social media optimization, and growth hacking techniques.',
      image: '/api/placeholder/600/400',
      organizer: 'Marketing Pro Academy',
      tags: ['Marketing', 'Digital', 'Strategy', 'Growth']
    },
    {
      id: '3',
      title: 'Startup Networking Event',
      date: '2025-08-20',
      time: '18:30',
      location: 'Co-working Space, Bandung',
      category: 'Networking',
      price: 0,
      attendees: 156,
      maxAttendees: 200,
      description: 'Connect with fellow entrepreneurs, investors, and startup enthusiasts in this exclusive networking event.',
      image: '/api/placeholder/600/400',
      organizer: 'Startup Community Bandung',
      tags: ['Startup', 'Networking', 'Entrepreneurship', 'Investment']
    },
    {
      id: '4',
      title: 'Data Science Conference',
      date: '2025-08-25',
      time: '09:30',
      location: 'University Auditorium, Yogyakarta',
      category: 'Education',
      price: 75,
      attendees: 78,
      maxAttendees: 150,
      description: 'Explore the latest developments in data science, machine learning, and artificial intelligence with leading experts.',
      image: '/api/placeholder/600/400',
      organizer: 'Data Science Indonesia',
      tags: ['Data Science', 'AI', 'Machine Learning', 'Analytics']
    }
  ]);

  const categories = ['Technology', 'Business', 'Education', 'Networking', 'Entertainment', 'Sports'];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'free' && event.price === 0) ||
                        (priceFilter === 'paid' && event.price > 0);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Eventive</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/events" className="text-gray-900 font-semibold">Events</Link>
              <Link href="/#features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              {session ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {session.user?.name}</span>
                  <Link href="/dashboard">
                    <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                      Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/auth">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-600 to-sky-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Find and register for the best events in your area. From conferences to workshops, 
            we have something for everyone.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                Search Events
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>
              <select
                id="price"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
              >
                <option value="all">All Prices</option>
                <option value="free">Free Events</option>
                <option value="paid">Paid Events</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm opacity-75">Event Image</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white text-sky-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {event.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    event.price === 0 
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {event.price === 0 ? 'FREE' : `$${event.price}`}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">{new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })} at {event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm">{event.attendees} / {event.maxAttendees} attendees</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {event.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                      {tag}
                    </span>
                  ))}
                  {event.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-md">
                      +{event.tags.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    by {event.organizer}
                  </div>
                  <Link href={`/events/${event.id}`}>
                    <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                      View Details
                    </Button>
                  </Link>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Registration Progress</span>
                    <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-sky-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>
    </div>
  );
}
