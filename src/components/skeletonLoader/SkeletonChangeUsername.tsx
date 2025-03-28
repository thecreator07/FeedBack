import { Skeleton } from "@/components/ui/skeleton";

const SkeletonChangeUsername = () => {
  return (
    <div className="bg-white rounded-lg p-4">
      <Skeleton className="h-7 w-56 mb-4" />

      <div className="space-y-4">
        {/* Email Skeleton */}
        <div className="flex flex-col sm:gap-4 sm:items-center sm:flex-row gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-[480px]" />
        </div>

        {/* Username Skeleton */}
        <div className="flex flex-col sm:gap-4 sm:items-center sm:flex-row gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-[480px]" />
        </div>

        {/* Password Skeleton */}
        <div className="flex flex-col sm:gap-4 sm:items-center sm:flex-row gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-[480px]" />
        </div>

        {/* Submit Button Skeleton */}
        <div className="flex sm:ml-[104px]">
          <Skeleton className="h-10 w-[140px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonChangeUsername;