// pages/purchase-histories/add.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
}

interface Supplier {
  id: number;
  name: string;
}

const AddPurchaseHistory: React.FC = () => {
  const router = useRouter();
  const [purchaseDate, setPurchaseDate] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [productId, setProductId] = useState<number | "">("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (purchaseDate.trim() === "" || quantity === "" || productId === "") {
      alert("All fields are required.");
      return;
    }

    await fetch("/api/purchase-histories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        purchaseDate,
        quantity,
        productId,
      }),
    });

    router.push("/purchase-histories");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Purchase History</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block">Purchase Date:</label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Product:</label>
          <select
            value={productId}
            onChange={(e) => setProductId(parseInt(e.target.value))}
            className="border p-2 w-full"
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add Purchase History
        </button>
      </form>
    </div>
  );
};

export default AddPurchaseHistory;
