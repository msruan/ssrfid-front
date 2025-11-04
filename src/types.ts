export interface APIErrorDTO {
  detail: string;
}

/* --------------------------------- PRODUCT -------------------------------- */

export interface Product {
  id: number;
  nome: string;
  codigoProduto: string;
  descricao: string;
  localizacao: string;
}

export interface CreateProductDTO {
  nome: string;
  codigo_produto: string;
  descricao: string;
  localizacao: string;
}

export interface UpdateProductDTO extends CreateProductDTO {}

export interface GetProductDTO {
  id: number;
  nome: string;
  codigo_produto: string;
  descricao: string;
  localizacao: string;
}

/* -------------------------------- INVENTORY ------------------------------- */

export type InventoryStatus = "iniciada" | "finalizada" | "cancelada";

export interface InventorySummary {
  // And InventoryDetails
  id: number;
  status: InventoryStatus;
  employeeUsername: string;
}

export interface GetAllInventoryDTO {
  id: number;
  status: InventoryStatus;
  username_funcionario: string;
}

interface ReadingDTO {
  id: number;
  codigo_produto: string;
  ultima_leitura: string;
  quantidade: number;
}

interface EventDTO {
  id: number;
  tipo: string;
  descricao: string;
  ocorreu_em: string;
}

export interface GetByIdInventoryDTO {
  id: number;
  status: InventoryStatus;
  username_funcionario: string;
  leituras: ReadingDTO[];
  eventos: EventDTO[];
}

export interface Employee {
  username: string;
  role: string;
}

export interface CreateEmployeeDTO {
  username: string;
  role: string;
  password: string;
}

/* ---------------------------------- AUTH ---------------------------------- */

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface LoginResponseDTO {
  access_token: string;
  token_type: string;
}

export interface CreateUserResponseDTO {
  id: number;
  username: string;
  role: string;
}
