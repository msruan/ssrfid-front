import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Assets } from "@/constants";

export function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 bg-muted min-h-svh md:p-10">
      <div className="flex flex-col w-full max-w-sm gap-6">
        <Link
          href="#"
          className="flex items-center self-center gap-2 font-medium"
        >
          <div className="relative flex items-center justify-center rounded-lg text-primary-foreground size-8">
            <Image
              src={Assets.icons.newland}
              alt="Newland logomarca"
              width={40}
              height={40}
            />
          </div>
          GRUPO NEW
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
