"use client";

import { LogOut } from "lucide-react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/api/actions";
import { AppRoutes, Assets } from "@/constants";
import { cn } from "@/utils";
import { Button } from "./ui/button";
import { Typography } from "./ui/typography";

interface LinksDefinition {
  [key: string]: {
    label: string;
    href: Route;
  };
}

export function AppNavbar() {
  const links = {
    dashboard: {
      label: "Dashboard",
      href: AppRoutes.dashboard,
    },
    products: {
      label: "Produtos",
      href: AppRoutes.products,
    },
  } satisfies LinksDefinition;

  const route = usePathname();

  const isCurrentPage = (href: string) => route === href;

  const router = useRouter();

  async function onLogout() {
    await logoutAction();
    router.push(AppRoutes.login);
  }

  return (
    <header className="bg-[#b91c1c] text-white">
      <nav className="flex items-center justify-between w-full px-6 py-2 mx-auto max-w-7xl 3xl:px-0">
        <Link href={"/"} className="flex items-center gap-3">
          <Image
            className="invert"
            src={Assets.icons.toyota}
            alt="Toyota logomarca"
            width={40}
            height={40}
          />
          <h1 className={cn(Typography.h1, "text-lg hidden sm:block")}>
            <span className="hidden sm:inline">Sistema </span>SSRFID
          </h1>
        </Link>
        <div className="hidden space-x-4 sm:flex">
          {[links.dashboard, links.products].map((link) => (
            <Link
              href={link.href}
              key={link.href}
              aria-current={isCurrentPage(link.href) ? "page" : undefined}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                isCurrentPage(link.href)
                  ? "text-white bg-gray-950/50"
                  : "text-gray-300 hover:bg-white/5 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href={
            isCurrentPage(links.dashboard.href)
              ? links.products.href
              : links.dashboard.href
          }
          className={cn(
            "px-3 py-2 text-sm font-medium rounded-md",
            "text-gray-300 hover:bg-white/5 hover:text-white border border-gray-50/50",
            "flex items-center gap-2",
            "sm:hidden",
          )}
        >
          {isCurrentPage(links.dashboard.href)
            ? links.products.label
            : links.dashboard.label}
        </Link>

        <Button onClick={onLogout}>
          <span className="hidden sm:inline">Sair</span>
          <LogOut />
        </Button>
      </nav>
    </header>
  );
}
