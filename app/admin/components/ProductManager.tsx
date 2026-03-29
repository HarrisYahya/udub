"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function ProductManager() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    setProducts(data || []);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
  };

  const uploadImage = async () => {
    if (!file) return null;

    const fileName = Date.now() + "-" + file.name;

    await supabase.storage.from("products").upload(fileName, file);

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const addOrUpdateProduct = async () => {
    const imageUrl = await uploadImage();

    if (editingId) {
      await supabase
        .from("products")
        .update({
          name,
          price: Number(price),
          discount: Number(discount) || 0,
          description,
          category,
          featured,
          ...(imageUrl && { image: imageUrl }),
        })
        .eq("id", editingId);
    } else {
      await supabase.from("products").insert([
        {
          name,
          price: Number(price),
          discount: Number(discount) || 0,
          description,
          category,
          featured,
          image: imageUrl,
        },
      ]);
    }

    resetForm();
    fetchProducts();
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDiscount("");
    setDescription("");
    setCategory("");
    setFeatured(false);
    setFile(null);
    setPreview(null);
    setEditingId(null);
    setIsModalOpen(false);
  };

  const editProduct = (p: any) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price.toString());
    setDiscount((p.discount || 0).toString());
    setDescription(p.description || "");
    setCategory(p.category || "");
    setFeatured(p.featured || false);
    setPreview(p.image);
    setIsModalOpen(true);
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("Delete product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  return (
    <div>
      {/* ADD FORM */}
      <div className="bg-white p-4 rounded-xl mb-6 space-y-3">
        <h2 className="font-bold text-lg">Add Product</h2>

        <input
          placeholder="Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          className="border p-2 w-full"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Discount % (optional)"
          className="border p-2 w-full"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <textarea
          placeholder="Product description (optional)"
          className="border p-2 w-full"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id}>{c.name}</option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            setFile(f);
            if (f) setPreview(URL.createObjectURL(f));
          }}
        />

        {preview && (
          <img src={preview} className="h-32 object-cover rounded" />
        )}

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured
        </label>

        <button
          onClick={addOrUpdateProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => {
          const finalPrice =
            p.discount > 0
              ? (p.price - (p.price * p.discount) / 100).toFixed(2)
              : p.price;

          return (
            <div key={p.id} className="bg-white p-3 rounded-xl">
              <img
                src={p.image}
                className="h-40 w-full object-cover rounded"
              />
              <h3 className="font-bold">{p.name}</h3>

              {p.discount > 0 ? (
                <>
                  <p className="line-through text-gray-400">
                    ${p.price}
                  </p>
                  <p className="font-bold text-green-600">
                    ${finalPrice}
                  </p>
                  <p className="text-red-500 text-sm">
                    -{p.discount}%
                  </p>
                </>
              ) : (
                <p>${p.price}</p>
              )}

              <p className="text-sm text-gray-500">{p.category}</p>

              {p.featured && <span>⭐ Featured</span>}

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => editProduct(p)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-3">
            <h2 className="font-bold text-lg">Edit Product</h2>

            <input
              placeholder="Name"
              className="border p-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Price"
              className="border p-2 w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              placeholder="Discount %"
              className="border p-2 w-full"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />

            <textarea
              placeholder="Product description"
              className="border p-2 w-full"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className="border p-2 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id}>{c.name}</option>
              ))}
            </select>

            <input
              type="file"
              onChange={(e) => {
                const f = e.target.files?.[0] || null;
                setFile(f);
                if (f) setPreview(URL.createObjectURL(f));
              }}
            />

            {preview && (
              <img src={preview} className="h-32 object-cover rounded" />
            )}

            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              Featured
            </label>

            <div className="flex gap-2">
              <button
                onClick={addOrUpdateProduct}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}