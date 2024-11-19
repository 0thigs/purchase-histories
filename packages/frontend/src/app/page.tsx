// pages/index.tsx
"use client";

import Link from "next/link";

const Home: React.FC = ()  => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Purchase History App
      </h1>
      <p className="mb-6">
        Manage your products, suppliers, and purchase histories efficiently.
      </p>
      <div className="space-x-4">
        <Link
          href="/products"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Manage Products
        </Link>
        <Link
          href="/suppliers"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Manage Suppliers
        </Link>
        <Link
          href="/purchase-histories"
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Manage Purchase Histories
        </Link>
      </div>
    </div>
  );
};

export default Home;
