"use client";

import { AlertCircleIcon, PackageSearch } from "lucide-react";
import { useState } from "react";
import type { InventoryStatus, InventorySummary } from "@/types";
import { cn } from "@/utils";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { Typography } from "./ui/typography";

interface Props {
  inventories: InventorySummary[];
  className?: string;
}

export function InventoriesCards({ inventories }: Props) {
  const [selectedInventory, setSelectedInventory] =
    useState<InventorySummary | null>(null);

  return (
    <>
      <InventoriesListCard
        className="w-full sm:w-1/2"
        inventories={inventories}
        selectedInventory={selectedInventory}
        setSelectedInventory={setSelectedInventory}
      />
      <InventoryDetailsCard
        className="hidden sm:flex sm:w-1/2"
        inventories={inventories}
        selectedInventory={selectedInventory}
        setSelectedInventory={setSelectedInventory}
      />
    </>
  );
}
type CardProps = Props & {
  className?: string;
  selectedInventory: InventorySummary | null;
  setSelectedInventory: (inv: InventorySummary | null) => void;
};

function InventoriesListCard(props: CardProps) {
  return (
    <Card className={cn(props.className)}>
      <CardHeader>
        <CardTitle className={cn("text-center", Typography.h3)}>
          Inventários
        </CardTitle>
      </CardHeader>

      <div className="px-3 sm:px-6">
        {props.inventories.length > 0 ? (
          <ul className="space-y-3 sm:space-y-4">
            {props.inventories.map((inv) => (
              <li
                key={inv.id}
                className={cn(
                  "bg-gray-100 hover:bg-gray-200 rounded-sm transition-colors box-border",
                  {
                    "outline-2 outline-blue-400 bg-gray-300 hover:bg-gray-300":
                      props.selectedInventory?.id === inv.id,
                  },
                )}
              >
                <button
                  className="flex items-center justify-between w-full p-3 cursor-pointer"
                  type="button"
                  onClick={() =>
                    props.setSelectedInventory(
                      props.selectedInventory?.id === inv.id ? null : inv,
                    )
                  }
                >
                  Inventário {inv.id}{" "}
                  <InventoryStatusBadge status={inv.status} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Empty className="p-0 md:p-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageSearch />
              </EmptyMedia>
              <EmptyTitle>Sem inventários</EmptyTitle>
              <EmptyDescription>
                Nenhum inventário realizado com a pistola ainda.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        {/* {props.inventories.length > 0 && (
          <CardFooter className="px-0 mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )} */}
      </div>
    </Card>
  );
}

function InventoryDetailsCard(props: CardProps) {
  return (
    <Card className={cn("h-fit", props.className)}>
      <CardHeader>
        <CardTitle className={cn("text-center relative", Typography.h3)}>
          Detalhes do inventário
          {props.selectedInventory !== null && (
            <div className="absolute right-0 bottom-1">
              <InventoryStatusBadge status={props.selectedInventory.status} />
            </div>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {props.inventories.length > 0 ? (
          props.selectedInventory ? (
            <div className="space-y-2">
              <p>
                <span className="text-muted-foreground">
                  Inventário selecionado:{" "}
                </span>
                Nº {props.selectedInventory?.id}
              </p>
              <p>
                <span className="text-muted-foreground">
                  Funcionário responsável:{" "}
                </span>
                {props.selectedInventory.employeeUsername}
              </p>
            </div>
          ) : (
            <Alert>
              <AlertCircleIcon />
              <AlertTitle>Nenhum inventário selecionado.</AlertTitle>
              <AlertDescription>
                Selecione um inventário na lista ao lado para ver seus detalhes.
              </AlertDescription>
            </Alert>
          )
        ) : (
          <Empty className="p-0 md:p-0">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageSearch />
              </EmptyMedia>
              <EmptyTitle>Sem inventários</EmptyTitle>
              <EmptyDescription>
                Nenhum inventário realizado com a pistola ainda.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        {/* {inventories.length > 0 && (
          <CardFooter className="px-0 mt-4">
            <Link
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
              href={AppRoutes.products}
            >
              <PackageSearch />
              Ver <span className="hidden sm:block">lista de</span>inventários
            </Link>
          </CardFooter>
        )} */}
      </CardContent>
    </Card>
  );
}

const InventoryStatusBadge = ({ status }: { status: InventoryStatus }) => (
  <Badge
    className={cn("capitalize", {
      "bg-green-500": status === "finalizada",
      "bg-red-500": status === "cancelada",
      "bg-blue-400": status === "iniciada",
    })}
  >
    {status.substring(0, status.length - 1)}o
  </Badge>
);
