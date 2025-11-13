"use client";

import { AlertCircleIcon, Loader } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { employeesFixture } from "@/fixtures";
import { useFetchInventories } from "@/hooks/use-fetch-inventories";
import { RequestStatus } from "@/types";
import { cn } from "@/utils";
import { EmployeeForm } from "../employee-registration";
import { EmployeesCard } from "../employees-card";
import { InventoriesCards } from "../inventories-cards/inventories-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const PageTabs = {
  inventories: "Inventários",
  employees: "Funcionários",
};

export function HomePage() {
  const { requestStatus, inventories } = useFetchInventories();

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto max-sm:px-1 flex flex-col sm:flex-row pt-8 gap-8 *:gap-4 pb-2">
      <Tabs defaultValue={PageTabs.inventories} className="items-center w-full">
        <TabsList className="w-full max-w-2xl">
          <TabsTrigger
            value={PageTabs.inventories}
            disabled={requestStatus !== RequestStatus.SUCCESS}
          >
            {PageTabs.inventories}
          </TabsTrigger>
          <TabsTrigger
            value={PageTabs.employees}
            disabled={true || requestStatus !== RequestStatus.SUCCESS}
          >
            {PageTabs.employees}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value={PageTabs.inventories}
          className={cn(
            requestStatus === RequestStatus.SUCCESS && "flex w-full gap-4",
          )}
        >
          {requestStatus === RequestStatus.PENDING && (
            <Alert>
              <Loader className="h-4 w-4 animate-spin" />
              <AlertTitle>Buscando dados no servidor</AlertTitle>
            </Alert>
          )}
          {requestStatus === RequestStatus.ERROR && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>
                Erro ao buscar dados do servidor. Por favor, recarregue a página
                e tente novamente.
              </AlertTitle>
            </Alert>
          )}

          {requestStatus === RequestStatus.SUCCESS && (
            <InventoriesCards inventories={inventories} />
          )}
        </TabsContent>
        <TabsContent value={PageTabs.employees} className="flex w-full gap-4">
          <EmployeesCard
            emplooyees={employeesFixture}
            className="w-full sm:1/2"
          />
          <EmployeeForm className="hidden sm:block sm:w-1/2 h-fit" />
        </TabsContent>
      </Tabs>
    </main>
  );
}
