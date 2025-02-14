"use client";
import { useRouter } from "next/navigation";
import React from "react";

const FailurePage: React.FC = () => {
  const router = useRouter();

  const handleRetry = () => {
    router.push("/shop"); // Redirect back to checkout
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md text-center space-y-6">
        <h2 className="text-3xl font-bold text-red-600">Checkout Failed</h2>
        <p className="text-lg text-gray-700">
          Unfortunately, there was an issue with your Checkout. Please try
          again.
        </p>
        <button
          onClick={handleRetry}
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Shop again and Retry Checkout
        </button>
      </div>
    </div>
  );
};

export default FailurePage;
