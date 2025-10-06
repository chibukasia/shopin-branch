import ActionButton from "@/components/atoms/buttons/ActionButton";
import SuppliersTable from "./tables/SuppliersTable";
import StatsCard from "@/components/molecules/cards/StatsCard";
import { FaTruck, FaUserCheck, FaStar, FaDollarSign } from "react-icons/fa";

const SuppliersScreen = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Suppliers</h2>
        <ActionButton title="Add New Supplier" />
      </div>
      <div className="py-3 grid gap-5">
        <div className="flex gap-4">
          <StatsCard
            title="24"
            subTitle="Total Suppliers"
            description="All registered suppliers"
            icon={<FaTruck className="text-violet-600" />}
            variant="primary"
            trend={{ value: 8.3, period: "last month" }}
          />
          <StatsCard
            title="18"
            subTitle="Active"
            description="Active suppliers"
            icon={<FaUserCheck className="text-green-600" />}
            variant="success"
            trend={{ value: 12.5, period: "last month" }}
          />
          <StatsCard
            title="4.2"
            subTitle="Avg Rating"
            description="Average supplier rating"
            icon={<FaStar className="text-amber-600" />}
            variant="warning"
            trend={{ value: 2.4, period: "last quarter" }}
          />
          <StatsCard
            title="$125K"
            subTitle="Total Spent"
            description="This month's spending"
            icon={<FaDollarSign className="text-blue-600" />}
            variant="primary"
            trend={{ value: 15.8, period: "last month" }}
          />
        </div>
        
        <SuppliersTable />
      </div>
    </div>
  );
};

export default SuppliersScreen;
