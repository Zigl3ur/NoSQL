import { Outlet } from "react-router";
import Header from "./components/navigation/header";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/navigation/app-sidebar";
import { ThemeProvider } from "./components/theme/theme-provider";

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="mx-5 w-full">
          <Header title="test" />
          <Outlet />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
