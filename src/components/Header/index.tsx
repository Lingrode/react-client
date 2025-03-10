import { SidebarIcon } from "lucide-react";

import { Button } from "../ui/button";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { useSidebar } from "../ui/sidebar";
import { ThemeToggle } from "../ThemeToggle";

export const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex sticky w-full z-40 top-0 items-center border-b left-0 bg-background">
      {/* <div className="container h-[var(--header-height)] w-full relative mx-auto flex gap-4 flex-row items-center"> */}
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
          <Button variant="outline">Sign in</Button>
          <Button>Sign up</Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
