"use client";

import { searchProducts, type Product } from "@/lib/products";
import { useEffect, useState } from "react";
import ProductComponent from "./ProductComponent";

type ProductSearchProps = {
    search: string;
};
export default function ProductSearch({ search }: ProductSearchProps) {
  const [productResults, setProductResults] = useState<Product[] | null>(null);

  useEffect(() => {
    searchProducts(search).then(setProductResults);
    setProductResults(null);
  }, [search]);

  if (productResults === null) {
    return <div>Loading...</div>;
  }

  if (productResults.length === 0) {
    return <div className="p-4">No results.</div>
  }

  // Pintar usuarios
  return (
    <main className="p-4">
      <div className="flex flex-col gap-2">
        {productResults.map((product) => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
