import SideBar from "@/components/molecules/navigations/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReactNode } from "react";

export default function DashboardLayout(props: { children: ReactNode }) {
  return (
    <div className="flex bg-background min-h-screen">
      <div>
      <SideBar />
      </div>
      
      <div className="flex-1 ml-16 transition-all duration-500">
        <div className="flex flex-col w-full gap-6 p-6">
          <div className="flex justify-between items-center bg-card border border-border rounded-xl shadow-soft p-6 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold text-foreground text-gradient">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Good morning!</p>
                <p className="text-xs text-muted-foreground">Ready to manage your store?</p>
              </div>
              <Avatar className="ring-2 ring-primary/20 shadow-medium">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-primary text-primary-foreground">CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="flex-1 animate-slide-up">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}