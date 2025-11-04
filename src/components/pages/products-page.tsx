// low-code: v0 made

"use client";

import { ProductList } from "@/components/products/product-list";
import type { Product } from "@/types";

interface PageProps {
  products: Product[];
}

export function ProductsPage(props: PageProps) {
  return (
    <main className="max-w-6xl px-6 py-8 mx-auto">
      <div className="p-8 border rounded-lg bg-card border-border">
        <ProductList products={props.products} />
      </div>
    </main>
  );
}
