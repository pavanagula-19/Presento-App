import { UserNav } from "@/components/nav-bar";
import { MainNav } from "@/components/ui/main-nav";
import { Search } from "@/components/ui/search";
import TeamSwitcher from "@/components/ui/team-switcher";
import React from "react";

type PrivateLayoutPropType = {
  children: React.ReactNode;
};

export const PrivateLayout: React.FC<PrivateLayoutPropType> = ({
  children,
}) => {
  return (
    <div className="w-[100vw]">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <UserNav />
          </div>
        </div>
      </div>
      <div className="w-[100%]">{children}</div>
    </div>
  );
};
