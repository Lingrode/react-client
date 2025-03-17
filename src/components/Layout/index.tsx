import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { selectIsAuthenticated } from "@/redux/user/selectors";
import { useAppSelector } from "@/redux/hooks";

export const Layout = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1 px-4 justify-center">
          <NavBar />
          <SidebarInset className="my-10 max-w-5xl">
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
