'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
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
  endTime: string;
  location: string;
  category: string;
  price: number;
  attendees: number;
  maxAttendees: number;
  description: string;
  fullDescription: string;
  image: string;
  organizer: {
    name: string;
    description: string;
    email: string;
    eventsCount: number;
  };
  tags: string[];
  agenda: {
    time: string;
    title: string;
    speaker?: string;
  }[];
  speakers: {
    name: string;
    title: string;
    company: string;
    bio: string;
  }[];
}

export default function EventDetail() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [attendeeInfo, setAttendeeInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    title: ''
  });

  // Mock event data - in real app, this would be fetched based on eventId
  const event: Event = {
    id: eventId,
    title: 'Tech Innovation Summit 2025',
    date: '2025-08-15',
    time: '09:00',
    endTime: '17:00',
    location: 'Convention Center, Jakarta',
    category: 'Technology',
    price: 50,
    attendees: 245,
    maxAttendees: 500,
    description: 'Join industry leaders for a comprehensive summit on the latest technology innovations and trends shaping the future.',
    fullDescription: 'The Tech Innovation Summit 2025 is the premier technology conference bringing together industry leaders, entrepreneurs, and tech enthusiasts to explore the cutting-edge developments that are reshaping our world. This full-day event features keynote presentations, panel discussions, networking sessions, and hands-on workshops covering AI, blockchain, IoT, cybersecurity, and emerging technologies. Whether you are a startup founder, enterprise executive, or technology professional, this summit will provide valuable insights, practical knowledge, and networking opportunities to accelerate your career and business growth.',
    image: '/api/placeholder/800/400',
    organizer: {
      name: 'Tech Events Indonesia',
      description: 'Leading organizer of technology events in Southeast Asia, connecting professionals and fostering innovation.',
      email: 'info@techevents.id',
      eventsCount: 47
    },
    tags: ['Innovation', 'Technology', 'Future', 'Networking', 'AI', 'Blockchain', 'Startup'],
    agenda: [
      { time: '09:00', title: 'Registration & Welcome Coffee' },
      { time: '10:00', title: 'Opening Keynote: The Future of Technology', speaker: 'Dr. Sarah Chen' },
      { time: '11:00', title: 'Panel: AI Revolution in Business', speaker: 'Industry Experts' },
      { time: '12:00', title: 'Networking Lunch' },
      { time: '13:30', title: 'Workshop: Building Scalable Applications', speaker: 'John Smith' },
      { time: '15:00', title: 'Startup Pitch Session' },
      { time: '16:00', title: 'Closing Remarks & Next Steps' }
    ],
    speakers: [
      {
        name: 'Dr. Sarah Chen',
        title: 'Chief Technology Officer',
        company: 'Innovation Labs',
        bio: 'Leading expert in AI and machine learning with 15+ years of experience in enterprise technology solutions.'
      },
      {
        name: 'John Smith',
        title: 'Senior Software Architect',
        company: 'CloudTech Solutions',
        bio: 'Specialized in cloud infrastructure and scalable system design, author of 3 technical books.'
      }
    ]
  };

  const handleRegistration = async () => {
    if (!session) {
      router.push('/auth');
      return;
    }
    
    setIsRegistering(true);
    
    try {
      // Here you would typically send the registration data to your API
      console.log('Registration data:', { eventId, attendeeInfo });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success and redirect or update UI
      alert('Registration successful! Check your email for confirmation.');
      setRegistrationStep(1);
      setIsRegistering(false);
    } catch (error) {
      console.error('Registration error:', error);
      setIsRegistering(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAttendeeInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
              <Link href="/events" className="text-gray-600 hover:text-gray-900">Events</Link>
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

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/events" className="hover:text-gray-900">Events</Link>
          <span>›</span>
          <span className="text-gray-900">{event.title}</span>
        </div>
      </div>

      {/* Event Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="aspect-video bg-gray-200 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
              <div className="text-white text-center">
                <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-lg opacity-75">Event Banner</p>
              </div>
            </div>
            <div className="absolute top-6 right-6">
              <span className="bg-white text-sky-600 px-4 py-2 rounded-full font-semibold">
                {event.category}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 lg:mr-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold">{new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                      <p className="text-sm">{event.time} - {event.endTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold">{event.location}</p>
                      <p className="text-sm">In-person event</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold">{event.attendees} registered</p>
                      <p className="text-sm">{event.maxAttendees - event.attendees} spots remaining</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <div>
                      <p className="font-semibold">
                        {event.price === 0 ? 'FREE' : `$${event.price}`}
                      </p>
                      <p className="text-sm">Per ticket</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm bg-sky-100 text-sky-800 rounded-full border border-sky-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Registration Card */}
              <div className="lg:w-80 lg:flex-shrink-0">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="text-center mb-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {event.price === 0 ? 'FREE' : `$${event.price}`}
                    </p>
                    <p className="text-sm text-gray-600">Registration fee</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
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

                  {registrationStep === 1 ? (
                    <Button
                      onClick={() => session ? setRegistrationStep(2) : router.push('/auth')}
                      className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      {session ? 'Register Now' : 'Sign In to Register'}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Registration Details</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={attendeeInfo.fullName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={attendeeInfo.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          required
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={attendeeInfo.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          name="company"
                          placeholder="Company (Optional)"
                          value={attendeeInfo.company}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setRegistrationStep(1)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleRegistration}
                          disabled={isRegistering || !attendeeInfo.fullName || !attendeeInfo.email}
                          className="flex-1 bg-sky-600 hover:bg-sky-700"
                        >
                          {isRegistering ? 'Registering...' : 'Complete Registration'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-600 leading-relaxed">{event.fullDescription}</p>
            </div>

            {/* Agenda */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Agenda</h2>
              <div className="space-y-4">
                {event.agenda.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 text-sm font-semibold text-sky-600 flex-shrink-0">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      {item.speaker && (
                        <p className="text-sm text-gray-600 mt-1">Speaker: {item.speaker}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Speakers */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Speakers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{speaker.name}</h3>
                      <p className="text-sm text-sky-600 mb-2">{speaker.title}, {speaker.company}</p>
                      <p className="text-sm text-gray-600">{speaker.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organizer Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Organized by</h3>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">{event.organizer.name}</h4>
                <p className="text-sm text-gray-600">{event.organizer.description}</p>
                <div className="text-sm text-gray-500">
                  <p>{event.organizer.eventsCount} events organized</p>
                  <p>{event.organizer.email}</p>
                </div>
              </div>
            </div>

            {/* Share Event */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Share Event</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
