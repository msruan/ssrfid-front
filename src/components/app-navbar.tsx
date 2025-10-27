import Link from "next/link";
import Image from "next/image";
import { Assets } from "@/constants";
import { cn } from "@/utils";
import { Typography } from "./ui/typography";

export function AppNavbar() {
  return (
    <header className="bg-[#eb0a1e] text-white">
      <nav className="flex items-center justify-between max-w-7xl px-6 mx-auto 3xl:px-0 w-full py-2">
        <Link href={"/"} className="flex items-center gap-3">
          <Image
            className="invert"
            src={Assets.icons.toyota}
            alt="Toyota logomark"
            width={40}
            height={40}
          />
          <h1 className={cn(Typography.h1, "text-lg")}>GRUPO NEW TOYOTA</h1>
        </Link>
        <h2 className={cn(Typography.h2, "text-lg")}>Módulo SSRFID</h2>
      </nav>
    </header>
  );
}
