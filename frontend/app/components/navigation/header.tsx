import { ModeToggle } from "../theme/mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center h-14 sm:h-16 border-b-2 mb-3 sm:mb-5 sticky top-0 z-10 bg-background px-2 sm:px-4">
      <SidebarTrigger className="flex-shrink-0" />
      <div className="flex justify-between w-full items-center min-w-0">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl ml-2 sm:ml-3 truncate pr-2">
          {title}
        </h1>
        <ModeToggle />
      </div>
    </header>
  );
}
