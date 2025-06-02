"use client";

import { BellIcon, MoreVerticalIcon, UserCircleIcon } from "lucide-react";

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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { getPsychologDetailService } from "@/services/dashboardPsychologService/profile/getDetailProfile";
import { Psycholog } from "@/types/psycholog";

export const NavUser = () => {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [psycholog, setPsycholog] = useState<Psycholog>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login-psycholog");
    }
  }, [router]);

  useEffect(() => {
    const detailUser = async () => {
      try {
        const result = await getPsychologDetailService();
        if (result.status === true) {
          setPsycholog(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    detailUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login-psycholog");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage
                  src={psycholog?.psy_image}
                  alt={psycholog?.psy_name}
                />
                <AvatarFallback className="rounded-lg">WW</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {psycholog?.psy_name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {psycholog?.psy_email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={psycholog?.psy_image}
                    alt={psycholog?.psy_name}
                  />
                  <AvatarFallback className="rounded-lg">WW</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {psycholog?.psy_name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {psycholog?.psy_email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircleIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button className="flex gap-x-2" onClick={handleLogout}>
                <FiLogOut className="text-lg" />
                Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
