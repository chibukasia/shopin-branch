import ActionButton from "@/components/atoms/buttons/ActionButton";
import PurchasesTable from "./tables/PurchasesTable";
import StatsCard from "@/components/molecules/cards/StatsCard";
import { FaClock, FaExclamationTriangle } from "react-icons/fa";
import { BiSolidPurchaseTag } from "react-icons/bi";


const PurchasesScreen = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Purchases</h2>
        <ActionButton title="Create Purchase Order" />
      </div>
      <div className="py-3 grid gap-5">
        <div className="flex gap-4">
          <StatsCard
            title="156"
            subTitle="Total Orders"
            description="All purchase orders"
            icon={<BiSolidPurchaseTag className="text-violet-600" />}
            variant="primary"
            trend={{ value: 12.5, period: "last month" }}
          />
          <StatsCard
            title="$89,450"
            subTitle="Total Spent"
            description="This month's spending"
            icon={<BiSolidPurchaseTag className="text-green-600" />}
            variant="success"
            trend={{ value: 18.3, period: "last month" }}
          />
          <StatsCard
            title="23"
            subTitle="Pending"
            description="Orders awaiting delivery"
            icon={<FaClock className="text-amber-600" />}
            variant="warning"
            trend={{ value: -8.2, period: "last week" }}
          />
          <StatsCard
            title="5"
            subTitle="Overdue"
            description="Overdue payments"
            icon={<FaExclamationTriangle className="text-red-600" />}
            variant="danger"
            trend={{ value: -25.0, period: "last week" }}
          />
        </div>
        
        <PurchasesTable />
      </div>
    </div>
  );
};

export default PurchasesScreen;
