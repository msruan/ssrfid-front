import type { ReactNode } from "react";
import { AppNavbar } from "@/components/app-navbar";

export default function NavbarLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppNavbar />
      {children}
    </>
  );
}
