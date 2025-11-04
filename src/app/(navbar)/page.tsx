import { getInventories } from "@/api/queries";
import { HomePage } from "@/components/pages/home-page";
import { employeesFixture } from "@/fixtures";

const Home = async () => {
  const inventories = await getInventories();
  return <HomePage inventories={inventories} employees={employeesFixture} />;
};

export default Home;
