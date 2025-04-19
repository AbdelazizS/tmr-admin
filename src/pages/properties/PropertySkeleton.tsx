// components/properties/PropertySkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export function PropertySkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-[180px]" />
          ))}
        </div>
      </div>

      <div className="rounded-md border">
        <div className="space-y-2 p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-16" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              {[...Array(8)].map((_, j) => (
                <Skeleton key={j} className="h-6 w-20" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-20" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-[100px]" />
        </div>
      </div>
    </div>
  );
}