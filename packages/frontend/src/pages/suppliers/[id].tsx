// pages/suppliers/[id].tsx

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Supplier {
  id: number;
  name: string;
  contact: string;
}

const EditSupplier: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`/api/suppliers/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSupplier(data);
          setName(data.name);
          setContact(data.contact);
        })
        .catch(() => {
          alert("Failed to fetch supplier.");
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === "" || contact.trim() === "") {
      alert("Name and Contact are required.");
      return;
    }

    await fetch(`/api/suppliers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, contact }),
    });

    router.push("/suppliers");
  };

  if (!supplier) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Supplier</h1>
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
          Update Supplier
        </button>
      </form>
    </div>
  );
};

export default EditSupplier;
