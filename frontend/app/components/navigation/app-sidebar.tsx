import ResetButton from "../reset-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import ElasticCollapsible from "./collapsible/elasticsearch-collapsible";
import MongoCollapsible from "./collapsible/mongo-collapsible";
import { Link } from "react-router";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="font-bold text-2xl flex items-center gap-2">
          <img src="/favicon.ico" alt="NoSQL Logo" className="w-8 h-8" />
          <h1>NoSQL</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-5">
        <MongoCollapsible />
        <ElasticCollapsible />
      </SidebarContent>
      <SidebarFooter>
        <ResetButton type="MongoDB" endpoint="/api/mongo/init" />
        <ResetButton type="ElasticSearch" endpoint="/api/elastic/init" />
      </SidebarFooter>
    </Sidebar>
  );
}
