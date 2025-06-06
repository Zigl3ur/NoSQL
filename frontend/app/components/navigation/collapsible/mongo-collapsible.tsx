import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../../ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { SidebarGroup } from "../../ui/sidebar";
import navelt from "../content-nav.json";

export default function MongoCollapsible() {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          MongoDB
          <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          {navelt.MongoDB.categories.map((elt, index) => (
            <Collapsible key={index} className="group/subcollapsible ml-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                {elt.title}
                <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]/subcollapsible:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                {elt.links.map((links, linkIndex) => (
                  <Link
                    key={linkIndex}
                    to={links.url}
                    className="flex py-2 hover:bg-accent rounded-md p-3"
                  >
                    {links.title}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
