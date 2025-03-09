import { useState } from "react";
import { Link } from "react-router";
import { Menu, MoveRight, SidebarIcon, X } from "lucide-react";

import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { ThemeToggle } from "../ThemeToggle";
import { useSidebar } from "../ui/sidebar";

export const Header = () => {
  const navItems = [
    {
      title: "Posts",
      href: "/",
      description: "",
    },
    {
      title: "Followings",
      href: "following",
      description: "",
    },
    {
      title: "Followers",
      href: "followers",
      description: "",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex sticky w-full z-40 top-0 items-center border-b left-0 bg-background">
      {/* <div className="container h-[var(--header-height)] w-full relative mx-auto flex gap-4 flex-row items-center"> */}
      <div className="flex h-[var(--header-height)] w-full items-center gap-2 px-4">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
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
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <Button variant="ghost" asChild>
                        <Link to={item.href}>{item.title}</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end"></div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex lg:justify-center">
          <p className="font-semibold">Network Social</p>
        </div>
        <div className="flex justify-end w-full gap-4">
          <Button variant="outline">Sign in</Button>
          <Button>Get started</Button>
          <ThemeToggle />
        </div>
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
              {navItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
