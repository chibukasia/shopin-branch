import StatsCard from "@/components/molecules/cards/StatsCard";
import BarchartComponent from "@/components/molecules/charts/BarChart";
import PieChartComponent from "@/components/molecules/charts/PieChart";
import TopSellingsProducts from "./tables/TopSellingProducts";

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between">
        {[1, 2, 3, 4, 5].map((index) => (
          <StatsCard
            title={"Orders"}
            subTitle={index}
            description="Just a card description"
            key={index}
          />
        ))}
      </div>
      <div className="bg-white p-4 flex flex-col gap-4 rounded-xl shadow-md w-full">
        <div className="flex gap-4 justify-between">
          <div className="w-1/2">
            <BarchartComponent />
          </div>
          <div className="w-1/2">
            <PieChartComponent />
          </div>
        </div>
        <div className="flex gap-4 justify-between">
            <div className="w-1/2">
              <p className="text-xl font-semibold pb-3">Top Selling Products</p>
              <TopSellingsProducts />
            </div>
            <div className="w-1/2">
              <p className="text-xl font-semibold pb-3">Recent Added Products</p>
              <TopSellingsProducts />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
