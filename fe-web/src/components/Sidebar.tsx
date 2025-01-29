"use client";

import * as React from "react";
import {
  LibraryBig,
  BookOpen,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/projects/NavProjects";
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

const data = {
  navMain: [
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
      title: "Books",
      icon: BookOpen,
      items: [
        {
          title: "Create Book",
          url: PATH.CREATEBOOK,
        },
        {
          title: "Manage Books",
          url: PATH.MANAGEBOOK,
        },
        {
          title: "Publish Book",
          url: PATH.PUBLISHBOOK,
        },
      ],
    },
    {
      title: "Library",
      icon: LibraryBig,
      items: [
        {
          title: "Wishlist",
          url: "#",
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
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const handleDashbaordClick = () => {
    navigate(PATH.DASHBOARD);
  };
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <header className="flex items-center justify-between bg-gray-800 text-white p-4">
          <div className="flex items-center gap-5 space-x-2">
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
              Presento
            </h1>
          </div>
        </header>
        <SidebarContent>
          <ScrollArea className="max-w-[90vh]">
            <NavMain items={data.navMain} />
            <NavProjects projects={data.projects} />
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
