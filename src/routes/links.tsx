import { createFileRoute } from "@tanstack/react-router";
import { LinksPage } from "src/modules/links/page/LinksPage";

export const Route = createFileRoute("/links")({
  component: LinksRoute,
});

function LinksRoute() {
  return <LinksPage />;
}
