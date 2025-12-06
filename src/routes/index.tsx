import { createFileRoute } from "@tanstack/react-router";
import { NewsPage } from "src/news/page/NewsPage";

export const Route = createFileRoute("/")({
  component: HomeRoute,
});

function HomeRoute() {
  return <NewsPage />;
}
