import { createFileRoute } from "@tanstack/react-router";
import { NewsPage } from "src/modules/news/page/NewsPage";

export const Route = createFileRoute("/")({
  component: HomeRoute,
});

function HomeRoute() {
  return <NewsPage />;
}
