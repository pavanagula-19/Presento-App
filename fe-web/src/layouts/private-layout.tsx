import { AppSidebar } from "@/components/Sidebar";
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

type PrivateLayoutPropType = {
  children: React.ReactNode;
};

export const PrivateLayout: React.FC<PrivateLayoutPropType> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <div className="w-[100vw] flex">
        <div className="w-[22vw]">
          <AppSidebar />
        </div>
        <div className="w-[77vw]">{children}</div>
      </div>
    </SidebarProvider>
  );
};
