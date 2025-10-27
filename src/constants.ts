import type { Route } from "next";

interface AssetsDefinition {
  [key: string]: string | AssetsDefinition;
}

export const Assets = {
  icons: {
    toyota: "/icons/toyota-icon.svg",
  },
} satisfies AssetsDefinition;


interface AppRoutesDefinition {
  [key: string]: Route | AppRoutesDefinition
}

export const AppRoutes = {
  products: "/produtos"
} satisfies AppRoutesDefinition