// components/Navbar.tsx
"use client";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto p-4 flex justify-between">
        <div className="flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/purchase-histories" className="hover:underline">
            Purchase Histories
          </Link>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/suppliers" className="hover:underline">
            Suppliers
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
