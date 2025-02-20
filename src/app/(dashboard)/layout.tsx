import SideBar from "@/components/molecules/navigations/sidebar";
import Dashboard from "./page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardLayout() {
  return (
    <div className="flex bg-muted">
      <div>
        <SideBar />
      </div>
      <div className="flex flex-col w-full gap-4 p-4 h-screen overflow-scroll">
        <div className="flex justify-between">
          <div>
            <p className="text-md font-bold">Shopin Logo</p>
            <p className="text-sm">Expirience fast and convinient shopping</p>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <Dashboard />
      </div>
    </div>
  );
}
