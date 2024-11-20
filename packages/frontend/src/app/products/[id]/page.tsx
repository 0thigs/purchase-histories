// pages/products/[id].tsx
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  supplier: Supplier;
}

interface Supplier {
  id: number;
  name: string;
}

const EditProduct = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [supplierId, setSupplierId] = useState<number | "">("");
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setName(data.name);
          setDescription(data.description || "");
          setPrice(data.price);
          setSupplierId(data.supplier.id);
        })
        .catch(() => {
          alert("Failed to fetch product.");
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || price === "") {
      alert("Name and Price are required.");
      return;
    }

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, supplierId }),
    });

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
            value={price}
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
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
