"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { loginAction } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AppRoutes } from "@/constants";
import { cn } from "@/utils";
import { Typography } from "./ui/typography";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [apiMessage, setApiMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      const delay = 8000;
      const timer = setTimeout(() => {
        setError(false);
        setApiMessage(null);
      }, delay);

      return () => clearTimeout(timer);
    }
    return;
  }, [error]);

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSubmitting) {
      return;
    }
    const result = await loginAction(values);
    setError(!result.success);
    setApiMessage(result.message);

    router.replace(AppRoutes.dashboard);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Bem vindo</CardTitle>
          <CardDescription>
            Entre com suas credenciais do sistema SSRFID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Usuário</FieldLabel>
                <Input
                  autoFocus
                  id="username"
                  type="text"
                  placeholder="Seu nome"
                  required
                  {...register("username")}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Sua senha"
                  {...register("password")}
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={isSubmitting || (!error && !!apiMessage)}
                >
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
                <FieldDescription className="text-center">
                  Não tem uma conta? <Link href="#">Criar</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          {apiMessage && (
            <p
              className={cn(
                error ? "text-red-500" : "text-green-500",
                Typography.small,
              )}
            >
              {apiMessage}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
