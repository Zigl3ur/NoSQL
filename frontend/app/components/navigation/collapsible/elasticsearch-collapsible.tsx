import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { SidebarGroup } from "../../ui/sidebar";
import navelt from "../content-nav.json";

export default function ElasticCollapsible() {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <CollapsibleTrigger className="flex items-center justify-between w-full pb-2">
          ElasticSearch
          <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="border-l-2">
          {navelt.ElasticSearch.links.map((elt) => (
            <Link
              to={elt.url}
              className="flex px-2 py-0.5 hover:bg-accent rounded-md m-3"
            >
              {elt.title}
            </Link>
          ))}
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
