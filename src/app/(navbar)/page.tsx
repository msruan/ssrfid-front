import { getInventories, getProducts } from "@/api/queries";
import { HomePage } from "@/components/pages/home-page";
import { employeesFixture } from "@/fixtures";

const Home = async () => {
  const [products, inventories] = await Promise.all([
    getProducts(),
    getInventories(),
  ]);
  return (
    <HomePage products={products} inventories={inventories} employees={employeesFixture} />
  );
};

export default Home;
