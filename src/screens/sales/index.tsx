import ActionButton from "@/components/atoms/buttons/ActionButton";
import StatsCard from "@/components/molecules/cards/StatsCard";
import SalesCharts from "./charts/SalesCharts";
import SalesTable from "./tables/SalesTable";
import { FaDollarSign, FaChartLine, FaShoppingCart, FaUsers } from "react-icons/fa";

const SalesScreen = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Sales</h2>
        <div className="flex gap-2">
          <ActionButton title="Generate Report" />
          <ActionButton title="Export Sales" />
        </div>
      </div>
      <div className="py-3 grid gap-5">
        <div className="flex gap-4">
          <StatsCard
            title="$12,450"
            subTitle="Total Revenue"
            description="This month's revenue"
            icon={<FaDollarSign className="text-green-600" />}
            variant="success"
            trend={{ value: 18.5, period: "last month" }}
          />
          <StatsCard
            title="$1,250"
            subTitle="Average Order"
            description="Average order value"
            icon={<FaChartLine className="text-violet-600" />}
            variant="primary"
            trend={{ value: 5.2, period: "last week" }}
          />
          <StatsCard
            title="156"
            subTitle="Orders Today"
            description="Orders placed today"
            icon={<FaShoppingCart className="text-blue-600" />}
            variant="primary"
            trend={{ value: 12.3, period: "yesterday" }}
          />
          <StatsCard
            title="89"
            subTitle="New Customers"
            description="New customers this week"
            icon={<FaUsers className="text-emerald-600" />}
            variant="success"
            trend={{ value: 22.1, period: "last week" }}
          />
        </div>
        
        {/* Sales Charts */}
        <SalesCharts />
        
        {/* Sales Table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Sales Transactions</h3>
          <SalesTable />
        </div>
      </div>
    </div>
  );
};

export default SalesScreen;
