import SideBar from "@/components/molecules/navigations/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReactNode } from "react";

export default function DashboardLayout(props: { children: ReactNode }) {
  return (
    <div className="flex bg-muted max-h-screen">
      <div>
        <SideBar />
      </div>
      <div className="flex flex-col w-full gap-4 p-4 overflow-scroll">
        <div className="flex justify-between">
          <div>
            <p className="text-md font-bold">Shopin Logo</p>
            <p className="text-sm">Experience fast and convenient shopping</p>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        {props.children}
      </div>
    </div>
  );
}