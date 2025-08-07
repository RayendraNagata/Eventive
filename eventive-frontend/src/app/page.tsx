'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Trigger animations after mount
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Semi-transparent Fixed Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-3">
                <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Eventive</h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#events" className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200">
                Explore Events
              </a>
              <a href="#features" className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200">
                Features
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200">
                Pricing
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/auth">
                <Button variant="outline" className="border-gray-400 text-white bg-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-indigo-50">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-100/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className={`transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Professional
              <br />
              <span className="text-sky-600 tracking-tight drop-shadow-sm">
                Event Management
              </span>
              <br />
              Platform
            </h1>
            
            <p className={`text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Create, manage, and scale your events with comprehensive tools for ticketing,
              attendee management, and real-time analytics.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transform transition-all duration-1000 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <Link href="#events">
                <Button size="lg" className="bg-sky-600 hover:bg-sky-700 text-white px-10 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Explore Events
                </Button>
              </Link>
              <Link href="/auth">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-gray-900 text-white bg-gray-900 hover:bg-gray-800 hover:text-white px-10 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Managing Events
                </Button>
              </Link>
            </div>
            
            {/* Hero Visual Element */}
            <div className={`mt-20 transform transition-all duration-1000 delay-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="relative max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-sky-500 to-indigo-600 h-3 w-full"></div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Tech Conference 2024</h3>
                        <p className="text-sm text-gray-500">Event Dashboard Preview</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-sky-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-sky-600">1,234</div>
                        <div className="text-xs text-gray-600">Attendees</div>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-indigo-600">$12.5K</div>
                        <div className="text-xs text-gray-600">Revenue</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-600">98%</div>
                        <div className="text-xs text-gray-600">Check-in</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-sky-500 to-indigo-600 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Event capacity: 75% filled</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Search & Filter */}
      <div id="events" className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sky-600 font-semibold uppercase tracking-wide mb-4">Discover</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Find Your Next Event</h2>
            <p className="text-lg text-gray-900 max-w-2xl mx-auto">Explore upcoming events in your area and register with just a few clicks</p>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
              <div className="flex-1">
                <Input 
                  placeholder="Search events by keyword..." 
                  className="w-full h-12 border-gray-300 bg-white shadow-sm rounded-xl px-4 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="min-w-[160px]">
                <select className="w-full h-12 px-4 border border-gray-300 bg-white rounded-xl shadow-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Categories</option>
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="seminar">Seminar</option>
                  <option value="meetup">Meetup</option>
                </select>
              </div>
              <div className="min-w-[150px]">
                <select className="w-full h-12 px-4 border border-gray-300 bg-white rounded-xl shadow-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">All Locations</option>
                  <option value="jakarta">Jakarta</option>
                  <option value="bandung">Bandung</option>
                  <option value="surabaya">Surabaya</option>
                  <option value="online">Online</option>
                </select>
              </div>
              <div className="min-w-[120px]">
                <Button className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white px-6 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Event Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event Card 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:ring-4 hover:ring-sky-100 transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-sky-400 to-sky-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">Conference</span>
                  <span className="text-sm text-gray-500 font-medium">Dec 15, 2024</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Web Development Conference 2024
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  Learn the latest trends in web development from industry experts.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>Jakarta Convention Center</span>
                  </div>
                  <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:ring-4 hover:ring-green-100 transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Workshop</span>
                  <span className="text-sm text-gray-500 font-medium">Dec 20, 2024</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Digital Marketing Masterclass
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  Hands-on workshop for mastering digital marketing strategies.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>Online Event</span>
                  </div>
                  <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                    View Details
                  </Button>
                </div>
              </div>
            </div>

            {/* Event Card 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:ring-4 hover:ring-indigo-100 transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-indigo-400 to-indigo-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Seminar</span>
                  <span className="text-sm text-gray-500 font-medium">Jan 5, 2025</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Future of Technology
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  Insights into emerging technologies and their impact on business.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>Bandung Tech Hub</span>
                  </div>
                  <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-sky-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sky-600 font-semibold uppercase tracking-wide mb-4">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Complete Event Management Solution
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to create, manage, and analyze your events in one professional platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:ring-4 hover:ring-sky-100 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Digital Ticketing</h3>
              <p className="text-gray-600 text-center leading-relaxed text-sm">
                Create and manage tickets with QR codes, automated delivery, and real-time validation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:ring-4 hover:ring-green-100 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Analytics Dashboard</h3>
              <p className="text-gray-600 text-center leading-relaxed text-sm">
                Comprehensive analytics with real-time insights, revenue tracking, and detailed reports.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:ring-4 hover:ring-indigo-100 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Payment Integration</h3>
              <p className="text-gray-600 text-center leading-relaxed text-sm">
                Secure payment processing with Stripe and Midtrans. Accept payments globally.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:ring-4 hover:ring-orange-100 transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Mobile Check-in</h3>
              <p className="text-gray-600 text-center leading-relaxed text-sm">
                Fast QR code scanning and attendee management accessible from any mobile device.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-sky-600 font-semibold uppercase tracking-wide mb-4">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose the plan that fits your team and scale as you grow</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">Free</span>
                </div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 3 events
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    100 attendees per event
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic analytics
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Email support
                  </li>
                </ul>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-sky-50 to-sky-100 border-2 border-sky-500 rounded-2xl p-8 relative hover:shadow-2xl hover:ring-4 hover:ring-sky-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-sky-600 text-white px-6 py-2 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">$29</span>
                  <span className="text-xl text-gray-600">/month</span>
                </div>
                <p className="text-sm text-sky-600 font-medium mb-6">No credit card required</p>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited events
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited attendees
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom branding
                  </li>
                </ul>
                <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-xl font-semibold shadow-lg">
                  Start Free Trial
                </Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">Custom</span>
                </div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Pro
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    API access
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom integrations
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Dedicated support
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    SLA guarantee
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-2 border-gray-900 text-white bg-gray-900 hover:bg-gray-800 hover:text-white py-3 rounded-xl font-semibold">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-gray-700 to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Managing Events?
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of event organizers who trust Eventive for their event management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900 px-10 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/auth">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 text-lg rounded-xl transition-all transform hover:scale-105">
                Sign In to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-screen-xl mx-auto py-12 px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Eventive</h3>
              </div>
              <p className="text-gray-400 max-w-md mb-6 text-sm leading-relaxed">
                Professional event management platform designed to streamline your events 
                from creation to completion.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">API Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Eventive. All rights reserved.</p>
            <p className="text-gray-400 mt-4 md:mt-0 text-sm">
              Built for professional event organizers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}