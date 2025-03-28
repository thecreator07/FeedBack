import React from "react";

function SkeletonProfileLoader() {
  return (
     <div className="pt-40 pb-6 md:pt-24 sm:mx-4 lg:mx-8 xl:mx-auto bg-white max-w-6xl">
      <div className="p-4 md:p-8 space-y-4 border rounded-lg bg-slate-50">
        <div className="flex flex-col justify-center items-center sm:justify-between sm:flex-row gap-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="h-1 bg-gray-200 rounded w-full my-4 animate-pulse"></div>
        
        {/* Change Username Skeleton */}
        <div className="bg-white rounded-lg p-4">
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
           <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse"></div>
           <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse"></div>
           <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse"></div>
        </div>
         <div className="h-1 bg-gray-200 rounded my-4 animate-pulse"></div>

        {/* Change Password Skeleton */}
        <div className="bg-white rounded-lg p-4">
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
           <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse"></div>
           <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse"></div>
           <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse"></div>
        </div>
         <div className="h-1 bg-gray-200 rounded my-4 animate-pulse"></div>

        {/* Delete Profile Skeleton */}
        <div className="bg-white rounded-lg p-4">
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="flex justify-end mt-4">
            <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonProfileLoader;