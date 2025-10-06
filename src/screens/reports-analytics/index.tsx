import ActionButton from "@/components/atoms/buttons/ActionButton";
import StatsCard from "@/components/molecules/cards/StatsCard";
import ReportsCharts from "./charts/ReportsCharts";
import ReportsTable from "./tables/ReportsTable";
import { FaChartBar, FaFileAlt, FaEye, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const ReportsAnalyticsScreen = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Reports & Analytics</h2>
        <div className="flex gap-2">
          <ActionButton title="Generate Report" />
          <ActionButton title="Export Data" />
        </div>
      </div>
      <div className="py-3 grid gap-5">
        {/* Key Metrics */}
        <div className="flex gap-4">
          <StatsCard
            title="$45,230"
            subTitle="Total Revenue"
            description="This month's performance"
            icon={<FaChartBar className="text-green-600" />}
            variant="success"
            trend={{ value: 18.5, period: "last month" }}
          />
          <StatsCard
            title="1,247"
            subTitle="Total Orders"
            description="Orders processed"
            icon={<FaFileAlt className="text-blue-600" />}
            variant="primary"
            trend={{ value: 12.3, period: "last month" }}
          />
          <StatsCard
            title="89.2%"
            subTitle="Success Rate"
            description="Order fulfillment rate"
            icon={<FaCheckCircle className="text-emerald-600" />}
            variant="success"
            trend={{ value: 2.1, period: "last week" }}
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

        {/* Analytics Charts */}
        <ReportsCharts />

        {/* Performance Insights */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle className="text-green-600" />
                <span className="font-medium text-green-800">High Performance</span>
              </div>
              <p className="text-sm text-green-700">Sales increased by 18.5% this month compared to last month.</p>
            </div>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaExclamationTriangle className="text-amber-600" />
                <span className="font-medium text-amber-800">Inventory Alert</span>
              </div>
              <p className="text-sm text-amber-700">5 products are running low on stock and need restocking.</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaEye className="text-blue-600" />
                <span className="font-medium text-blue-800">Customer Growth</span>
              </div>
              <p className="text-sm text-blue-700">New customer acquisition rate is 22% higher than target.</p>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Generated Reports</h3>
          <ReportsTable />
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalyticsScreen;
