import { AlertCircleIcon, UserCircle } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Employee, InventorySummary } from "@/types";
import { type ClassNameProp, cn } from "@/utils";
import { EmployeeForm } from "../employee-registration";
import { InventoriesCards } from "../inventories-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Typography } from "../ui/typography";

interface PageProps {
  inventories: InventorySummary[];
  employees: Employee[];
}

const PageTabs = {
  inventories: "Inventários",
  employees: "Funcionários",
};

export function HomePage(props: PageProps) {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto max-sm:px-1 flex flex-col sm:flex-row pt-8 gap-8 *:gap-4 pb-2">
      <Tabs defaultValue={PageTabs.inventories} className="items-center w-full">
        <TabsList className="w-full max-w-2xl">
          <TabsTrigger value={PageTabs.inventories}>
            {PageTabs.inventories}
          </TabsTrigger>
          <TabsTrigger value={PageTabs.employees} disabled>
            {PageTabs.employees}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={PageTabs.inventories} className="flex w-full gap-4">
          <InventoriesCards inventories={props.inventories} />
        </TabsContent>
        <TabsContent value={PageTabs.employees} className="flex w-full gap-4">
          <EmployeesCard
            emplooyees={props.employees}
            className="w-full sm:1/2"
          />
          <EmployeeForm className="hidden sm:block sm:w-1/2 h-fit" />
        </TabsContent>
      </Tabs>
    </main>
  );
}

function EmployeesCard({
  emplooyees,
  className,
}: { emplooyees: Employee[] } & ClassNameProp) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className={cn("text-center", Typography.h3)}>
          Funcionários operadores
        </CardTitle>
      </CardHeader>
      <CardContent>
        {emplooyees.length > 0 ? (
          <ul className="space-y-3">
            {emplooyees.map((e) => (
              <li
                key={e.username}
                className="flex items-center justify-between p-3 bg-gray-100 border rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <UserCircle />
                  <p className="flex flex-col">
                    <span className="text-sm font-semibold">Funcionário</span>
                    <span>{e.username}</span>
                  </p>
                </div>
                <Button disabled variant="destructive">
                  Remover Acesso
                </Button>
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

      {/* <CardFooter>
        <EmployeeFormModal>
          <Button className="w-full">Adicionar funcionário</Button>
        </EmployeeFormModal>
      </CardFooter> */}
    </Card>
  );
}
