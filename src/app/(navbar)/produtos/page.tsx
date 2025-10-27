import { getProducts } from "@/api/queries";
import { ProductsPage } from "@/components/pages/products-page";

const Products = async () => {
  const products = await getProducts();

  return <ProductsPage products={products} />;
};

export default Products;
