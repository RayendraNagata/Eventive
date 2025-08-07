import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        {/* Unauthorized Icon */}
        <div className="mb-8">
          <svg 
            className="w-24 h-24 text-orange-400 mx-auto" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
          </svg>
        </div>
        
        {/* Unauthorized Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Unauthorized Access
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You need to log in to view this page. Please sign in with your account to continue.
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/auth">
            <button className="bg-sky-500 text-white rounded-md shadow px-6 py-3 hover:bg-sky-600 transition-colors inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Go to Login
            </button>
          </Link>
          
          <div className="text-center">
            <Link href="/" className="text-sky-500 hover:text-sky-600 transition-colors">
              Or return to homepage
            </Link>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Need an account?</h3>
          <p className="text-sm text-blue-800 mb-3">
            Create a free account to access event management tools and purchase tickets.
          </p>
          <Link href="/auth" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Sign up now →
          </Link>
        </div>
        
        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Having trouble signing in? {' '}
            <Link href="/help" className="text-sky-500 hover:text-sky-600">
              Get help
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
