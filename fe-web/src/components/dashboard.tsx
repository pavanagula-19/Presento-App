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
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarImage } from "./ui/avatar";

// This is sample data.
const data = {
  user: {
    name: "Pavan",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Notes",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create Notes",
          url: "#",
        },
        {
          title: "Shared with me",
          url: "#",
        },
        {
          title: "View Notes",
          url: "#",
        },
      ],
    },
    {
      title: "Books",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Create Book",
          url: "#",
        },
        {
          title: "Manage Books",
          url: "#",
        },
        {
          title: "Publish Book",
          url: "#",
        },
      ],
    },
    {
      title: "Library",
      url: "#",
      icon: LibraryBig,
      items: [
        {
          title: "Wishlist",
          url: "#",
        },
        {
          title: "Search Books",
          url: "#",
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
      url: "#",
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <header className="flex items-center justify-between bg-gray-800 text-white p-4">
        <div className="flex items-center gap-5 space-x-2">
          <div className="h-8 w-8 bg-gray-300 rounded-md flex items-center justify-center">
            <span className="text-sm text-gray-600">
              <Avatar className="rounded-md">
                <AvatarImage src="https://ik.imagekit.io/pavanagulla19/elephant.jpg?updatedAt=1737743253686" />
              </Avatar>
            </span>
          </div>
          <h1 className="text-2xl font-bold">Presento</h1>
        </div>
      </header>

      <SidebarContent>
        <ScrollArea className="max-w-[90vh]">
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
