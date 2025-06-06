import { Outlet } from "react-router";
import Header from "./components/navigation/header";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/navigation/app-sidebar";

export default function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="mx-5 w-full">
        <Header title="test" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
