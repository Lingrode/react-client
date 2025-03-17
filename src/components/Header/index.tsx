import { Link } from "react-router";
import { SidebarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

import { selectIsAuthenticated } from "@/redux/user/selectors";
import { useAppSelector } from "@/redux/hooks";

export const Header = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex sticky w-full z-40 top-0 items-center border-b left-0 bg-background">
      <div className="flex h-[var(--header-height)] w-full items-center gap-2 px-4">
        <div className="justify-start items-center gap-4 flex flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              <Button
                className="h-8 w-8"
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
              >
                <SidebarIcon />
              </Button>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex justify-end w-full gap-4">
          {!isAuthenticated && (
            <>
              <Button variant="outline" asChild>
                <Link to="/auth?tab=login">Sign in</Link>
              </Button>
              <Button>
                <Link to="/auth?tab=sign-up">Sign up</Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
