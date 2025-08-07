import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <svg 
            className="w-24 h-24 text-gray-400 mx-auto" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20c-2.18 0-4.156-.88-5.596-2.304m-1.04-.776A7.978 7.978 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8a7.978 7.978 0 01-1.364 4.92m-1.04.776A7.962 7.962 0 0112 20c-2.18 0-4.156-.88-5.596-2.304" 
            />
          </svg>
        </div>
        
        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404 – Page Not Found
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/">
            <button className="bg-sky-500 text-white rounded-md shadow px-6 py-3 hover:bg-sky-600 transition-colors inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go back home
            </button>
          </Link>
          
          <div className="text-center">
            <Link href="/events" className="text-sky-500 hover:text-sky-600 transition-colors">
              Or browse events
            </Link>
          </div>
        </div>
        
        {/* Help Text */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Need help? <Link href="/contact" className="text-sky-500 hover:text-sky-600">Contact our support team</Link></p>
        </div>
      </div>
    </div>
  );
}
