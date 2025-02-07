import SideBar from "@/components/molecules/navigations/sidebar";
import Dashboard from "./page";

export default function DashboardLayout() {
    return(
        <div className="flex">
            <SideBar />
            <Dashboard />
        </div>
    )
}