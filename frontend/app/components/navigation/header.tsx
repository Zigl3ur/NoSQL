import { SidebarTrigger } from "../ui/sidebar";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center h-15 border-b-2 mb-5">
      <SidebarTrigger />
      <h1 className="font-bold text-2xl ml-2">{title}</h1>
    </header>
  );
}
