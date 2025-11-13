"use client";

import { AlertCircleIcon, Loader } from "lucide-react";
import { ProductList } from "@/components/products/product-list";
import { useFetchProducts } from "@/hooks/use-fetch-products";
import { RequestStatus } from "@/types";
import { Alert, AlertTitle } from "../ui/alert";

export function ProductsPage() {
  const { requestStatus, products } = useFetchProducts();

  return (
    <main className="max-w-6xl px-2.5 sm:px-6 py-8 mx-auto">
      <div className="md:p-8 md:border rounded-lg bg-card sm:border-border">
        {requestStatus === RequestStatus.SUCCESS && (
          <ProductList products={products} />
        )}
        {requestStatus === RequestStatus.PENDING && (
          <Alert>
            <Loader className="h-4 w-4 animate-spin" />
            <AlertTitle>Buscando dados no servidor</AlertTitle>
          </Alert>
        )}
        {requestStatus === RequestStatus.ERROR && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>
              Erro ao buscar dados do servidor. Por favor, recarregue a página e
              tente novamente.
            </AlertTitle>
          </Alert>
        )}
      </div>
    </main>
  );
}
