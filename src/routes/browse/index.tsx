import { createFileRoute } from "@tanstack/react-router";
import { BrowsePage } from "src/modules/comics/page/Browse/BrowsePage";

export const Route = createFileRoute("/browse/")({
  component: BrowseRoute,
});

function BrowseRoute() {
  return <BrowsePage />;
}
