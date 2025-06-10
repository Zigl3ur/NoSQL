import { Outlet } from "react-router";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/navigation/app-sidebar";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "sonner";

export default function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <main className="mx-5 w-full">
          <Outlet />
        </main>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
}
