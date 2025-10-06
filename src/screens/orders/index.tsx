import ActionButton from "@/components/atoms/buttons/ActionButton";
import OrdersTable from "./tables/OrdersTable";
import StatsCard from "@/components/molecules/cards/StatsCard";
import { FaShoppingCart, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const OrdersScreen = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Orders</h2>
        <ActionButton title="Export Orders" />
      </div>
      <div className="py-3 grid gap-5">
        <div className="flex gap-4">
          <StatsCard
            title="24"
            subTitle="Total Orders"
            description="All time orders"
            icon={<FaShoppingCart className="text-violet-600" />}
            variant="primary"
            trend={{ value: 12.5, period: "last month" }}
          />
          <StatsCard
            title="8"
            subTitle="Pending"
            description="Orders awaiting processing"
            icon={<FaClock className="text-amber-600" />}
            variant="warning"
            trend={{ value: -5.2, period: "last week" }}
          />
          <StatsCard
            title="15"
            subTitle="Completed"
            description="Successfully delivered orders"
            icon={<FaCheckCircle className="text-green-600" />}
            variant="success"
            trend={{ value: 8.3, period: "last week" }}
          />
          <StatsCard
            title="1"
            subTitle="Cancelled"
            description="Cancelled orders"
            icon={<FaTimesCircle className="text-red-600" />}
            variant="danger"
            trend={{ value: -25.0, period: "last week" }}
          />
        </div>
        
        <OrdersTable />
      </div>
    </div>
  );
};

export default OrdersScreen;
