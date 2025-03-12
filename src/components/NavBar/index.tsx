import * as React from "react";
import { Bookmark, Command, FileText, SidebarIcon, Users } from "lucide-react";
import { useSelector } from "react-redux";
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
import { Button } from "../ui/button";

import { selectCurrent, selectIsAuthenticated } from "@/redux/user/selectors";

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
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const current = useSelector(selectCurrent);

  return (
    <Sidebar
      style={{
        top: "var(--header-height)",
        height: "calc(100svh - var(--header-height))",
      }}
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center">
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {isAuthenticated ? current?.name : "Network Social"}
                  </span>
                </div>
              </a>
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
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
