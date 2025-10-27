import type { Product } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface PageProps {
  products: Product[];
}

export function ProductsPage(props: PageProps) {
  return (
    <main className="flex flex-col items-center pt-8">
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle className="text-center">Produtos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {props.products.map((p) => (
              <li key={p.id}>{p.nome}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
