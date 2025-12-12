import { createFileRoute } from "@tanstack/react-router";
import { BrowsePage } from "src/modules/news/comics/page/BrowsePage";

export const Route = createFileRoute("/browse")({
  component: BrowseRoute,
});

function BrowseRoute() {
  return <BrowsePage />;
}
