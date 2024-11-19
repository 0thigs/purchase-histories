// pages/purchase-histories/[id].tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Product {
  id: number;
  name: string;
}

interface Supplier {
  id: number;
  name: string;
}

interface PurchaseHistory {
  id: number;
  purchaseDate: string;
  quantity: number;
  productId: number;
  supplierId: number;
}

const EditPurchaseHistory: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [purchaseHistory, setPurchaseHistory] =
    useState<PurchaseHistory | null>(null);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [productId, setProductId] = useState<number | "">("");
  const [supplierId, setSupplierId] = useState<number | "">("");
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    if (id) {
      const fetchPurchaseHistory = async () => {
        const res = await fetch(`/api/purchase-histories/${id}`);
        const data = await res.json();
        setPurchaseHistory(data);
        setPurchaseDate(data.purchaseDate.split("T")[0]); // Format to YYYY-MM-DD
        setQuantity(data.quantity);
        setProductId(data.productId);
        setSupplierId(data.supplierId);
      };

      const fetchProducts = async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      };

      const fetchSuppliers = async () => {
        const res = await fetch("/api/suppliers");
        const data = await res.json();
        setSuppliers(data);
      };

      fetchPurchaseHistory();
      fetchProducts();
      fetchSuppliers();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      purchaseDate.trim() === "" ||
      quantity === "" ||
      productId === "" ||
      supplierId === ""
    ) {
      alert("All fields are required.");
      return;
    }

    await fetch(`/api/purchase-histories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        purchaseDate,
        quantity,
        productId,
        supplierId,
      }),
    });

    router.push("/purchase-histories");
  };

  if (!purchaseHistory) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Purchase History</h1>
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
        <div>
          <label className="block">Supplier:</label>
          <select
            value={supplierId}
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
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Update Purchase History
        </button>
      </form>
    </div>
  );
};

export default EditPurchaseHistory;
