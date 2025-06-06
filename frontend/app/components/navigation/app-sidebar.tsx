import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "../ui/sidebar";
import MongoCollapsible from "./collapsible/mongo-collapsible";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b-2 mx-5 my-2">
        <h1 className="font-bold text-2xl">NoSQL</h1>
      </SidebarHeader>
      <SidebarContent className="px-5">
        <MongoCollapsible />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
