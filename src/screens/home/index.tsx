import StatsCard from "@/components/molecules/cards/StatsCard";
import BarchartComponent from "@/components/molecules/charts/BarChart";
import PieChartComponent from "@/components/molecules/charts/PieChart";
import TopSellingsProducts from "./tables/TopSellingProducts";
import { FaShoppingCart, FaUsers, FaBox, FaDollarSign, FaExclamationTriangle } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between">
        <StatsCard
          title="1,247"
          subTitle="Total Orders"
          description="Orders this month"
          icon={<FaShoppingCart className="text-violet-600" />}
          variant="primary"
          trend={{ value: 18.5, period: "last month" }}
        />
        <StatsCard
          title="892"
          subTitle="Active Users"
          description="Registered customers"
          icon={<FaUsers className="text-green-600" />}
          variant="success"
          trend={{ value: 12.3, period: "last month" }}
        />
        <StatsCard
          title="1,245"
          subTitle="Products"
          description="Total inventory items"
          icon={<FaBox className="text-blue-600" />}
          variant="primary"
          trend={{ value: 5.8, period: "last month" }}
        />
        <StatsCard
          title="$45,230"
          subTitle="Revenue"
          description="This month's earnings"
          icon={<FaDollarSign className="text-emerald-600" />}
          variant="success"
          trend={{ value: 22.1, period: "last month" }}
        />
        <StatsCard
          title="23"
          subTitle="Alerts"
          description="Items needing attention"
          icon={<FaExclamationTriangle className="text-amber-600" />}
          variant="warning"
          trend={{ value: -15.0, period: "last week" }}
        />
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
