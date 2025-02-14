import Link from "next/link";
import React from "react";

const SuccessPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md text-center space-y-6">
        <h2 className="text-3xl font-bold text-thirty">Order Placed!</h2>
        <p className="text-lg text-gray-700">
          Thank you for your purchase. We have received your order and will give
          you a confirmation call soon.
        </p>
        <Link href="/shop">
          <button className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accentthirty hover:bg-thirty focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
