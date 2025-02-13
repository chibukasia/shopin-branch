import SideBar from "@/components/molecules/navigations/sidebar";
import Dashboard from "./page";

export default function DashboardLayout() {
    return(
        <div className="flex bg-muted">
            <SideBar />
            <Dashboard />
        </div>
    )
}