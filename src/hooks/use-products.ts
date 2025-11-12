import { useEffect, useState } from "react";
import { getProducts } from "@/api/queries";
import { type Product, RequestStatus } from "@/types";

interface UseProductsReturn {
  products: Product[];
  requestStatus: RequestStatus;
}

export function useProducts(): UseProductsReturn {
  const [requestStatus, setRequestStatus] = useState(RequestStatus.PENDING);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function attemptFetch() {
      const data = await getProducts();

      if (data instanceof Error) {
        setRequestStatus(RequestStatus.ERROR);
      } else {
        setProducts(data);
        setRequestStatus(RequestStatus.SUCCESS);
      }
    }

    attemptFetch();
  }, []);

  return {
    products,
    requestStatus,
  };
}
