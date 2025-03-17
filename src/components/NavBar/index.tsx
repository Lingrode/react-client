import * as React from "react";
import { Bookmark, Command, FileText, SidebarIcon, Users } from "lucide-react";
import { Link } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { NavProfile } from "@/components/NavProfile";

import { selectCurrent, selectIsAuthenticated } from "@/redux/user/selectors";
import { useAppSelector } from "@/redux/hooks";

const data = [
  {
    title: "Posts",
    href: "/",
    icon: FileText,
  },
  {
    title: "Followings",
    href: "following",
    icon: Bookmark,
  },
  {
    title: "Followers",
    href: "followers",
    icon: Users,
  },
];

export function NavBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar } = useSidebar();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const current = useAppSelector(selectCurrent);

  return (
    <Sidebar
      style={{
        top: "var(--header-height)",
        height: "calc(100svh - var(--header-height))",
      }}
      {...props}
    >
      {isAuthenticated && current ? null : (
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center">
              <SidebarMenuButton size="lg">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Network Social</span>
                </div>
              </SidebarMenuButton>
              <Button
                className="h-8 w-8 md:hidden"
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
              >
                <SidebarIcon />
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      )}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link to={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
