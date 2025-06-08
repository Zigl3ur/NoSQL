import Header from "~/components/navigation/header";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Home" }];
}

export default function IndexRoute() {
  return (
    <>
      <Header title="Home" />
    </>
  );
}
