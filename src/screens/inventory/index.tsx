import ActionButton from "@/components/atoms/buttons/ActionButton";
import StatsCard from "@/components/molecules/cards/StatsCard";
import { FaBoxes, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import InventoryTable from "@/screens/inventory/tables/InventoryTable";

const InventoryScreen = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Inventory</h2>
        <div className="flex gap-2">
          <ActionButton title="Add Stock" />
          <ActionButton title="Export Inventory" />
        </div>
      </div>
      <div className="py-3 grid gap-5">
        <div className="flex gap-4">
          <StatsCard
            title="1,245"
            subTitle="Total Items"
            description="All inventory items"
            icon={<FaBoxes className="text-violet-600" />}
            variant="primary"
            trend={{ value: 5.8, period: "last month" }}
          />
          <StatsCard
            title="892"
            subTitle="In Stock"
            description="Items available for sale"
            icon={<FaCheckCircle className="text-green-600" />}
            variant="success"
            trend={{ value: 3.2, period: "last week" }}
          />
          <StatsCard
            title="45"
            subTitle="Low Stock"
            description="Items below minimum threshold"
            icon={<FaExclamationTriangle className="text-amber-600" />}
            variant="warning"
            trend={{ value: -18.2, period: "last week" }}
          />
          <StatsCard
            title="308"
            subTitle="Out of Stock"
            description="Items that need restocking"
            icon={<FaTimesCircle className="text-red-600" />}
            variant="danger"
            trend={{ value: -8.5, period: "last week" }}
          />
        </div>
        
        <InventoryTable />
      </div>
    </div>
  );
};

export default InventoryScreen;
