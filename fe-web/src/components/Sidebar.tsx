"use client";

import * as React from "react";
import {
  LibraryBig,
  Settings2,
  SquareTerminal,
  LayoutGrid,
  MoonIcon,
  Sun,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarImage } from "./ui/avatar";
import { PATH } from "@/routes";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./themed-context";

const data = {
  navMain: [
    {
      title: "Dashboard",
      icon: LayoutGrid,
    },
    {
      title: "Notes",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Notes",
          url: PATH.CREATENOTES,
        },
        {
          title: "View Notes",
          url: PATH.VIEWNOTES,
        },
        {
          title: "Shared with me",
          url: PATH.SHAREDNOTES,
        },
      ],
    },
    {
      title: "Library",
      icon: LibraryBig,
      items: [
        {
          title: "Wishlist",
          url: PATH.BOOKWISHLIST,
        },
        {
          title: "Search Books",
          url: PATH.SEARCHBOOKS,
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleDashbaordClick = () => {
    navigate(PATH.DASHBOARD);
  };

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        {...props}
        className={theme === "dark" ? "bg-gray-900" : "bg-white"}
      >
        <header
          className={`flex items-center justify-between p-4 ${
            theme === "dark"
              ? "bg-gray-800 text-gray-100"
              : "bg-customBlue text-white"
          }`}
        >
          <div className="flex items-center gap-2 space-x-2">
            <div className="h-8 w-8 bg-gray-300 rounded-md flex items-center justify-center">
              <span className="text-sm text-gray-600">
                <Avatar
                  className="rounded-md cursor-pointer"
                  onClick={handleDashbaordClick}
                >
                  <AvatarImage src="https://ik.imagekit.io/pavanagulla19/elephant.jpg?updatedAt=1737743253686" />
                </Avatar>
              </span>
            </div>
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={handleDashbaordClick}
            >
              PRESENTO
            </h1>
            <button
              className={`ml-4 p-2 rounded-full flex items-center justify-center ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun className="text-yellow-400" />
              ) : (
                <MoonIcon className="text-gray-800" />
              )}
            </button>
          </div>
        </header>
        <SidebarContent>
          <ScrollArea
            className={`h-[90vh] max-h-[90vh] ${
              theme === "dark" ? "bg-black" : "bg-white"
            }`}
          >
            <NavMain items={data.navMain} />
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className={theme === "dark" ? "bg-black" : "bg-white"}>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
