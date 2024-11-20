// pages/products/add.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Supplier {
  id: number;
  name: string;
}

const AddProduct: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [supplierId, setSupplierId] = useState<number | "">("");
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || price === "") {
      alert("Name and Price are required.");
      return;
    }

    console.log("Submitting form");

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, supplierId }),
    });

    console.log("Product added successfully");

    const response = await fetch("/api/products", {
      method: "GET",
    });

    console.log("Response:", response);

    router.push("/products");
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      const res = await fetch("/api/suppliers");
      const data = await res.json();
      setSuppliers(data);
    };

    fetchSuppliers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block">Price:</label>
          <input
            type="number"
            step="0.01"
            value={price.toString()}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Supplier:</label>
          <select
            value={supplierId.toString()}
            onChange={(e) => setSupplierId(parseInt(e.target.value))}
            className="border p-2 w-full"
            required
          >
            <option value="">Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
