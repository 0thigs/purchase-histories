// pages/purchase-histories/index.tsx

import { useEffect, useState } from "react";
import Link from "next/link";

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
  product: Product;
  supplier: Supplier;
}

const PurchaseHistories: React.FC = () => {
  const [histories, setHistories] = useState<PurchaseHistory[]>([]);

  const fetchHistories = async () => {
    const res = await fetch("/api/purchase-histories");
    const data = await res.json();
    setHistories(data);
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this purchase history?")) {
      await fetch(`/api/purchase-histories/${id}`, {
        method: "DELETE",
      });
      fetchHistories();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Purchase Histories</h1>
        <Link
          href="/purchase-histories/add"
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Add Purchase
        </Link>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Purchase Date</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Product</th>
            <th className="py-2 px-4 border">Supplier</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((history) => (
            <tr key={history.id} className="text-center">
              <td className="py-2 px-4 border">{history.id}</td>
              <td className="py-2 px-4 border">
                {new Date(history.purchaseDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">{history.quantity}</td>
              <td className="py-2 px-4 border">{history.product.name}</td>
              <td className="py-2 px-4 border">{history.supplier.name}</td>
              <td className="py-2 px-4 border">
                <Link
                  href={`/purchase-histories/${history.id}`}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(history.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {histories.length === 0 && (
            <tr>
              <td colSpan={6} className="py-2 px-4 border text-center">
                No purchase histories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistories;
