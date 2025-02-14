"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/routes";
import { useDispatch } from "react-redux";
import { saveCurrentNoteId } from "@/redux/slices/note-slice";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="bg-white text-black">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible flex flex-col gap-2"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="flex items-center justify-between w-full p-2 rounded-md transition-colors duration-200 bg-white text-black hover:bg-gray-100"
                >
                  {item.icon && <item.icon className="mr-2" />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 text-gray-600 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="flex flex-col gap-2">
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        onClick={() => {
                          subItem?.url === PATH.CREATENOTES &&
                            dispatch(saveCurrentNoteId(undefined));
                          navigate(subItem?.url);
                        }}
                        className="flex items-center w-full p-2 rounded-md transition-colors duration-200 bg-gray-200 text-black hover:bg-gray-300"
                      >
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
