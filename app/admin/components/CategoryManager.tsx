"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function CategoryManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
  };

  const addCategory = async () => {
    if (!name) return;

    await supabase.from("categories").insert([{ name }]);

    setName("");
    fetchCategories();
  };

  const deleteCategory = async (id: number) => {
    if (!confirm("Delete category?")) return;

    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  };

  return (
    <div className="bg-white p-4 rounded-xl">
      <h2 className="font-bold mb-4">Category Manager</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={addCategory}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {categories.map((c) => (
        <div
          key={c.id}
          className="flex justify-between border-b py-2"
        >
          <span>{c.name}</span>

          <button
            onClick={() => deleteCategory(c.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}