'use client';

interface LoadingSkeletonProps {
  count?: number;
  type?: 'card' | 'table' | 'list';
  className?: string;
}

export default function LoadingSkeleton({ 
  count = 3, 
  type = 'card',
  className = '' 
}: LoadingSkeletonProps) {
  
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
          <div className="h-3 bg-gray-200 rounded-md w-2/3"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded-md"></div>
        <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded-md w-4/6"></div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <div className="h-8 bg-gray-200 rounded-md w-20"></div>
        <div className="h-8 bg-gray-200 rounded-md w-24"></div>
      </div>
    </div>
  );

  const SkeletonTableRow = () => (
    <tr className="animate-pulse">
      <td className="px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-24"></div>
            <div className="h-3 bg-gray-200 rounded-md w-16"></div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="h-4 bg-gray-200 rounded-md w-32"></div>
      </td>
      <td className="px-4 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
      </td>
      <td className="px-4 py-4">
        <div className="h-4 bg-gray-200 rounded-md w-20"></div>
      </td>
      <td className="px-4 py-4">
        <div className="flex space-x-2">
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
          <div className="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
      </td>
    </tr>
  );

  const SkeletonListItem = () => (
    <div className="flex items-center space-x-4 p-4 animate-pulse">
      <div className="w-4 h-4 bg-gray-200 rounded"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
        <div className="h-3 bg-gray-200 rounded-md w-2/3"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded-md w-16"></div>
    </div>
  );

  if (type === 'table') {
    return (
      <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
              </th>
              <th className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
              </th>
              <th className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
              </th>
              <th className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
              </th>
              <th className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded-md animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.from({ length: count }).map((_, index) => (
              <SkeletonTableRow key={index} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={`bg-white rounded-lg shadow divide-y divide-gray-200 ${className}`}>
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonListItem key={index} />
        ))}
      </div>
    );
  }

  // Default: card type
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

// Specialized skeleton components for different use cases
export const EventCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded-md mb-3"></div>
      <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        <div className="h-8 bg-gray-200 rounded-md w-24"></div>
      </div>
    </div>
  </div>
);

export const StatCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow p-6 animate-pulse">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded-md w-24 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded-md w-16"></div>
      </div>
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-8">
    {/* Header skeleton */}
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded-md w-64 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded-md w-96"></div>
    </div>
    
    {/* Stats cards skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
    
    {/* Content skeleton */}
    <LoadingSkeleton count={6} type="card" />
  </div>
);
