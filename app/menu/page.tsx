"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/Product";
import Image from "next/image";
import { allProducts } from "@/data/products";

const categories = [
  "Kitchenware",
  "Home Decor",
  "Stationery",
  "Garden",
  "Apparel",
  "Art",
];

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      return matchCategory && matchSearch;
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategories, searchTerm]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <div className="flex flex-col md:flex-row w-[95%] mx-auto p-6">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 p-4  rounded-lg mb-6 md:mb-0">
        <h3 className="text-xl font-bold mb-4">Category</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 accent-[#DC143C]"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mt-6 mb-4">Search</h3>
        <input
          type="text"
          className="border p-2 rounded-full w-full"
          placeholder="Search by name or tags"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </aside>

      {/* Product Grid */}
      <main className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-56 object-cover rounded"
                />
                <h2 className="text-lg font-bold mt-4">{product.name}</h2>
                <p className="text-sm text-gray-600ii mt-1">${product.price}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.tags &&
                    product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-[#DC143C] text-zinc-50 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
