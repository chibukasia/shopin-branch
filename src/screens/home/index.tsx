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
      <div className="bg-card border border-border p-6 flex flex-col gap-6 rounded-xl shadow-soft w-full animate-fade-in">
        <div className="flex gap-6 justify-between">
          <div className="w-1/2">
            <div className="bg-background border border-border rounded-lg p-4 shadow-soft">
              <BarchartComponent />
            </div>
          </div>
          <div className="w-1/2">
            <div className="bg-background border border-border rounded-lg p-4 shadow-soft">
              <PieChartComponent />
            </div>
          </div>
        </div>
        <div className="flex gap-6 justify-between">
            <div className="w-1/2">
              <div className="bg-background border border-border rounded-lg p-4 shadow-soft">
                <p className="text-xl font-semibold pb-4 text-foreground">Top Selling Products</p>
                <TopSellingsProducts />
              </div>
            </div>
            <div className="w-1/2">
              <div className="bg-background border border-border rounded-lg p-4 shadow-soft">
                <p className="text-xl font-semibold pb-4 text-foreground">Recent Added Products</p>
                <TopSellingsProducts />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
