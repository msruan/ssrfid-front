import { useEffect, useRef, useState } from "react";
import { getInventoryDetails } from "@/api/queries";
import {
  type InventoryDetails,
  type InventorySummary,
  RequestStatus,
} from "@/types";

interface UseDetailsReturn {
  selectedInventory: InventorySummary | null;
  inventoryDetails: InventoryDetails | null;
  setSelectedInventory: (inventory: InventorySummary | null) => void;
  requestStatus: RequestStatus;
}

export function useFetchInventoryDetails(): UseDetailsReturn {
  const [selectedInventory, setSelectedInventory] =
    useState<InventorySummary | null>(null);

  const [inventoryDetails, setInventoryDetails] =
    useState<InventoryDetails | null>(null);

  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    RequestStatus.IDLE,
  );

  const fetchInfo = useRef<{ isFetching: boolean; inventoryId: number | null }>(
    { isFetching: false, inventoryId: null },
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation> [selectedInventory] -> We just want to monitor onSelect event
  useEffect(() => {
    async function attemptFetch(targetId: number) {
      if (!selectedInventory) {
        return;
      }

      fetchInfo.current = {
        isFetching: true,
        inventoryId: targetId,
      };

      setRequestStatus(RequestStatus.PENDING);

      const data = await getInventoryDetails(targetId);

      if (fetchInfo.current.inventoryId !== targetId) {
        return;
      }

      if (data instanceof Error) {
        console.log(data);
        console.log("REQUISICAO DEU ERRO");

        setInventoryDetails(null);
        setRequestStatus(RequestStatus.ERROR);
      } else {
        console.log("REQUISICAO BEM SUCEDIDA");
        setInventoryDetails(data);
        setRequestStatus(RequestStatus.IDLE);
      }

      fetchInfo.current = { isFetching: false, inventoryId: null };
    }

    function abortFetch() {
      fetchInfo.current = { inventoryId: null, isFetching: false };
    }

    // console.debug("INVENTÁRIO SELECIONADO: ", selectedInventory?.id);

    if (selectedInventory === null) {
      // console.debug(
      //   "NENHUM INVENTÁRIO SELECIONADO: { abort? NAO. initFetch? NAO }",
      // );
      return;
    } else if (selectedInventory.id === inventoryDetails?.id) {
      // console.debug("DADOS JA SALVOS EM MEMORIA: { abort? SIM. initFech? NAO}");
      abortFetch();
      return;
    } else if (
      fetchInfo.current.isFetching &&
      fetchInfo.current.inventoryId === selectedInventory.id
    ) {
      // console.debug(
      //   "BUSCANDO O INVENTARIO ATUAL: { abort? NAO. initFetch? NAO }",
      // );
      return;
    } else {
      // console.debug("BUSCANDO OUTRO INVENTARIO: abort? SIM. initFetch? SIM");
      abortFetch();
      attemptFetch(selectedInventory.id);
    }
  }, [selectedInventory]);

  return {
    selectedInventory,
    setSelectedInventory,

    inventoryDetails,
    requestStatus,
  };
}
