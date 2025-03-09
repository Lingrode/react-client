import { Outlet } from "react-router";
import { Header } from "../Header";
import { NavBar } from "../NavBar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";

export const Layout = () => {
  return (
    <div className="[--header-height:calc(theme(spacing.14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <NavBar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};
