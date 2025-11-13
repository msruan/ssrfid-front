import { useEffect, useState } from "react";
import { getInventories } from "@/api/queries";
import { type InventorySummary, RequestStatus } from "@/types";

interface UseInventoriesReturn {
  inventories: InventorySummary[];
  requestStatus: RequestStatus;
}

export function useFetchInventories(): UseInventoriesReturn {
  const [requestStatus, setRequestStatus] = useState(RequestStatus.PENDING);
  const [inventories, setInventories] = useState<InventorySummary[]>([]);

  useEffect(() => {
    async function attemptFetch() {
      const data = await getInventories();
      if (data instanceof Error) {
        setRequestStatus(RequestStatus.ERROR);
      } else {
        setInventories(data);
        setRequestStatus(RequestStatus.SUCCESS);
      }
    }
    attemptFetch();
  }, []);

  return {
    inventories,
    requestStatus,
  };
}
