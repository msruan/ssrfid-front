"use server";

import type { ApplicationException } from "@/exceptions";
import type {
  GetAllInventoryDTO,
  GetProductDTO,
  InventorySummary,
  Product,
} from "@/types";
import { fetchWithAuth } from "./fetch-with-auth";

export async function getProducts(): Promise<Product[] | ApplicationException> {
  const endpoint = "/pecas/";
  const res = await fetchWithAuth(endpoint);

  if (!(res instanceof Response)) {
    return res;
  }

  const body: GetProductDTO[] = await res.json();

  const parse = (p: GetProductDTO): Product => {
    return {
      id: p.id,
      nome: p.nome,
      descricao: p.descricao,
      localizacao: p.localizacao,
      codigoProduto: p.codigo_produto,
    };
  };

  return body.map(parse);
}

export async function getInventories(): Promise<
  InventorySummary[] | ApplicationException
> {
  const endpoint = "/conferencia/";
  const res = await fetchWithAuth(endpoint);

  if (!(res instanceof Response)) {
    return res;
  }

  const body: GetAllInventoryDTO[] = await res.json();

  const parse = (i: GetAllInventoryDTO): InventorySummary => {
    return {
      id: i.id,
      status: i.status,
      employeeUsername: i.username_funcionario,
    };
  };

  return body.map(parse).toReversed();
}
