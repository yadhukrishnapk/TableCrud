// src/components/common/ErrorPage.tsx
import { useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}

const ErrorPage = ({ message, onRetry, title = "Something went wrong" }: ErrorPageProps) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    if (onRetry) {
      setIsRetrying(true);
      
      // Add a small delay to show the loading state
      setTimeout(() => {
        onRetry();
        setIsRetrying(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-red-500 p-6 flex justify-center">
          <AlertCircle size={64} color="white" />
        </div>
        
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          
          {onRetry && (
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
            >
              {isRetrying ? (
                <>
                  <RefreshCw size={18} className="animate-spin mr-2" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw size={18} className="mr-2" />
                  Try Again
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;