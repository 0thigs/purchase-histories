// pages/products/index.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      fetchProducts();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/products/add"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="py-2 px-4 border">{product.id}</td>
              <td className="py-2 px-4 border">{product.name}</td>
              <td className="py-2 px-4 border">{product.description || "-"}</td>
              <td className="py-2 px-4 border">${product.price.toFixed(2)}</td>
              <td className="py-2 px-4 border">
                <Link
                  href={`/products/${product.id}`}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="py-2 px-4 border text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
