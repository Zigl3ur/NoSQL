import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import MongoCollapsible from "./collapsible/mongo-collapsible";
import { Link } from "react-router";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="mx-5 my-2">
        <Link to="/" className="font-bold text-2xl flex items-center gap-2">
          <img src="/favicon.ico" alt="NoSQL Logo" className="w-8 h-8" />
          <h1>NoSQL</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-5">
        <MongoCollapsible />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
