// pages/suppliers/add.tsx

import { useState } from "react";
import { useRouter } from "next/router";

const AddSupplier: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || contact.trim() === "") {
      alert("Name and Contact are required.");
      return;
    }

    await fetch("/api/suppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, contact }),
    });

    router.push("/suppliers");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Supplier</h1>
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
          <label className="block">Contact:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Supplier
        </button>
      </form>
    </div>
  );
};

export default AddSupplier;
