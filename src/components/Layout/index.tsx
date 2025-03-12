import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useSelector } from "react-redux";

import { Header } from "../Header";
import { NavBar } from "../NavBar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

import { selectIsAuthenticated, selectUser } from "@/redux/user/selectors";

export const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/auth");
  //   }

  // }, []);

  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1 px-4">
          <NavBar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
