import Link from "next/link";
import {
  AlertCircleIcon,
  Container,
  UserCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AppRoutes } from "@/constants";
import { cn } from "@/utils";
import type { Employee, InventorySummary, Product } from "@/types";
import { Typography } from "../ui/typography";

interface PageProps {
  products: Product[];
  inventories: InventorySummary[];
  employees: Employee[];
}

export function HomePage(props: PageProps) {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto flex pt-8 gap-8">
      <div className="flex flex-1/2 flex-col gap-8">
        <InvetoriesCard inventories={props.inventories} />
        <ProductsCard products={props.products} />
      </div>
      <aside className="flex flex-1/2 flex-col">
        <EmployeesCard emplooyees={props.employees} />
      </aside>
    </main>
  );
}

function ProductsCard(props: { products: Product[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("text-center", Typography.h4)}>
          Total de produtos: {props.products.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {props.products.length > 0 ? (
          <p>
            <span className="text-muted-foreground">
              Último produto cadastrado:{" "}
            </span>
            {props.products.at(0)?.nome}
          </p>
        ) : (
          <Alert>
            <AlertCircleIcon />
            <AlertTitle>Nenhum produto cadastrado até o momento.</AlertTitle>
          </Alert>
        )}
        <Link
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
          href={AppRoutes.products}
        >
          <Container />
          Ver lista completa
        </Link>
      </CardContent>
    </Card>
  );
}

function InvetoriesCard({ inventories }: { inventories: InventorySummary[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("text-center", Typography.h4)}>
          Inventários
        </CardTitle>
      </CardHeader>

      <CardContent>
        {inventories.length > 0 ? (
          <p>
            <span className="text-muted-foreground">
              Último inventário realizado:{" "}
            </span>
            {inventories.at(-1)?.id}
          </p>
        ) : (
          <Alert>
            <AlertCircleIcon />
            <AlertTitle>Nenhum inventário registrado até o momento.</AlertTitle>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

function EmployeesCard({ emplooyees }: { emplooyees: Employee[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("text-center", Typography.h4)}>
          Funcionários operadores
        </CardTitle>
      </CardHeader>
      <CardContent>
        {emplooyees.length > 0 ? (
          <ul className="space-y-3">
            {emplooyees.map((e) => (
              <li
                key={e.username}
                className="flex bg-gray-100 border rounded-lg p-3 items-center justify-between"
              >
                <div className="flex gap-2 items-center">
                  <UserCircle />
                  <p className="flex flex-col">
                    <span className="font-semibold text-sm">Funcionário</span>
                    <span>{e.username}</span>
                  </p>
                </div>
                <Button disabled variant="destructive">Remover Acesso</Button>
              </li>
            ))}
          </ul>
        ) : (
          <Alert>
            <AlertCircleIcon />
            <AlertTitle>
              Nenhum funcionário cadastrado até o momento.
            </AlertTitle>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
