import type { Route } from "next";

interface AssetsDefinition {
  [key: string]: string | AssetsDefinition;
}

export const Assets = {
  icons: {
    toyota: "/icons/toyota-icon.svg",
    newland: "/icons/newland-icon.svg",
  },
} satisfies AssetsDefinition;

interface AppRoutesDefinition {
  [key: string]: Route | AppRoutesDefinition;
}

export const AppRoutes = {
  dashboard: "/",
  login: "/autenticacao/login",
  products: "/produtos",
} satisfies AppRoutesDefinition;

export const DEFAULT_HEADERS = {
  "Accept-Language": "pt-BR" as const,
  "Content-Type": "application/json" as const,
};
