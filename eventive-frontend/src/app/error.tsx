'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <svg 
            className="w-24 h-24 text-red-400 mx-auto" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L5.35 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>
        
        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We encountered an unexpected error. Please try again later or contact support if the problem persists.
        </p>
        
        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg max-w-lg mx-auto text-left">
            <h3 className="text-sm font-medium text-red-800 mb-2">Error Details:</h3>
            <p className="text-xs text-red-700 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-1">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <button 
            onClick={reset}
            className="bg-indigo-500 text-white rounded-md shadow px-6 py-3 hover:bg-indigo-600 transition-colors inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Try again
          </button>
          
          <div className="text-center">
            <a href="/" className="text-indigo-500 hover:text-indigo-600 transition-colors">
              Or go back to homepage
            </a>
          </div>
        </div>
        
        {/* Help Text */}
        <div className="mt-12 text-sm text-gray-500">
          <p>
            Still having issues? {' '}
            <a href="mailto:support@eventive.com" className="text-indigo-500 hover:text-indigo-600">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
