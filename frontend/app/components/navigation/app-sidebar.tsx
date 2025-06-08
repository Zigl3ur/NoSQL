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
      <SidebarHeader className="mx-5 my-2 flex-row items-center">
        <img src="/favicon.ico" alt="NoSQL Logo" className="w-7 h-7" />
        <Link to="/" className="font-bold text-2xl">
          NoSQL
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-5">
        <MongoCollapsible />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
