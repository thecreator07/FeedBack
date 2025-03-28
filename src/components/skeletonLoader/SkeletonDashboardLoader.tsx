import { Separator } from "@/components/ui/separator";

const Loading = () => {
    return (
      <div className="pt-40 md:pt-28 lg:mx-8 xl:mx-auto bg-white w-full max-w-6xl">
        <div className="sm:p-4 sm:border sm:rounded-lg mb-4 animate-pulse">
          {/* Header */}
          <div className="flex flex-col gap-2 mb-4 sm:justify-between sm:flex-row">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-32 bg-gray-300 rounded"></div>
            </div>
          </div>
  
          <Separator />
  
          {/* Copy Link Section */}
          <div className="my-4">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-2"></div>
            <div className="relative flex items-center">
              <div className="w-full h-10 bg-gray-200 rounded"></div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>
          </div>
  
          {/* Accept Messages Switch */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
              <div className="h-6 w-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>
  
          <Separator />
  
          {/* Button Loader */}
          <div className="mt-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"></div>
          </div>
  
          {/* Messages Section */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  