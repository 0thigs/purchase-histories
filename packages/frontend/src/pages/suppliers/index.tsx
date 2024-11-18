// pages/suppliers/index.tsx

import { useEffect, useState } from "react";
import Link from "next/link";

interface Supplier {
  id: number;
  name: string;
  contact: string;
}

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const fetchSuppliers = async () => {
    const res = await fetch("/api/suppliers");
    const data = await res.json();
    setSuppliers(data);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this supplier?")) {
      await fetch(`/api/suppliers/${id}`, {
        method: "DELETE",
      });
      fetchSuppliers();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <Link
          href="/suppliers/add"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Supplier
        </Link>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Contact</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="text-center">
              <td className="py-2 px-4 border">{supplier.id}</td>
              <td className="py-2 px-4 border">{supplier.name}</td>
              <td className="py-2 px-4 border">{supplier.contact}</td>
              <td className="py-2 px-4 border">
                <Link
                  href={`/suppliers/${supplier.id}`}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(supplier.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {suppliers.length === 0 && (
            <tr>
              <td colSpan={4} className="py-2 px-4 border text-center">
                No suppliers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Suppliers;
