import { ModeToggle } from "../theme/mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center h-16 border-b-2 mb-5 sticky top-0 z-10 bg-background">
      <SidebarTrigger />
      <div className="flex justify-between w-full items-center">
        <h1 className="font-bold text-2xl ml-2">{title}</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
