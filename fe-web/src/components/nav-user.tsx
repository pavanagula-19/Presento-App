"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { selectUserInfo } from "../redux/selectors/user-selector";
import { logout } from "../redux/slices/user-slice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./themed-context";

export function NavUser() {
  const dispatch = useDispatch();
  const { isMobile } = useSidebar();
  const user = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const { theme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className={`flex items-center gap-2 p-2 rounded-md transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-black text-gray-300 hover:bg-gray-700"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user?.avatar || "/default-avatar.png"}
                  alt={user?.name || "User"}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.first_name || "Guest"}
                </span>
                <span className="truncate text-xs">
                  {user?.email || "guest@example.com"}
                </span>
              </div>
              <ChevronsUpDown
                className={`ml-auto size-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={`w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg ${
              theme === "dark"
                ? "bg-gray-900 text-gray-300"
                : "bg-white text-black"
            }`}
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.avatar || "/default-avatar.png"}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.first_name || "Guest"}
                  </span>
                  <span className="truncate text-xs">
                    {user?.email || "guest@example.com"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex items-center gap-2">
                <Sparkles
                  className={
                    theme === "dark" ? "text-yellow-400" : "text-black"
                  }
                />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex items-center gap-2">
                <BadgeCheck
                  className={theme === "dark" ? "text-green-400" : "text-black"}
                />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <CreditCard
                  className={theme === "dark" ? "text-blue-400" : "text-black"}
                />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Bell
                  className={theme === "dark" ? "text-red-400" : "text-black"}
                />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut
                className={theme === "dark" ? "text-red-400" : "text-black"}
              />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
