import ActionButton from "@/components/atoms/buttons/ActionButton";
import UsersTable from "./tables/UsersTable";
import StatsCard from "@/components/molecules/cards/StatsCard";
import { FaUsers, FaUserCheck, FaUserTie, FaUserSlash } from "react-icons/fa";

const UsersScreen = () => {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">Users</h2>
        <ActionButton title="Add New User" />
      </div>
      <div className="py-3 grid gap-5">
        <div className="flex gap-4">
          <StatsCard
            title="156"
            subTitle="Total Users"
            description="All registered users"
            icon={<FaUsers className="text-violet-600" />}
            variant="primary"
            trend={{ value: 8.7, period: "last month" }}
          />
          <StatsCard
            title="142"
            subTitle="Active"
            description="Active users"
            icon={<FaUserCheck className="text-green-600" />}
            variant="success"
            trend={{ value: 12.3, period: "last week" }}
          />
          <StatsCard
            title="8"
            subTitle="Staff"
            description="Staff members"
            icon={<FaUserTie className="text-blue-600" />}
            variant="primary"
            trend={{ value: 0, period: "last month" }}
          />
          <StatsCard
            title="6"
            subTitle="Inactive"
            description="Inactive users"
            icon={<FaUserSlash className="text-red-600" />}
            variant="danger"
            trend={{ value: -25.0, period: "last week" }}
          />
        </div>
        
        <UsersTable />
      </div>
    </div>
  );
};

export default UsersScreen;
