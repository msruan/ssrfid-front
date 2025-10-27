import type {
  GetAllInventoryDTO,
  GetProductDTO,
  InventorySummary,
  Product,
} from "@/types";
import { apiFetch } from "./config";

export async function getProducts(): Promise<Product[]> {
  const path = "/pecas/";
  const body = await apiFetch<GetProductDTO[]>(path);

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

export async function getInventories(): Promise<InventorySummary[]> {
  const path = "/conferencia/";
  const body = await apiFetch<GetAllInventoryDTO[]>(path);

  const parse = (i: GetAllInventoryDTO): InventorySummary => {
    return {
      id: i.id,
      status: i.status,
      employeeUsername: i.username_funcionario,
    };
  };

  return body.map(parse);
}
