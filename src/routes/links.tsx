import { createFileRoute } from "@tanstack/react-router";
import { LinksPage } from "src/links/page/LinksPage";

export const Route = createFileRoute("/links")({
  component: LinksRoute,
});

function LinksRoute() {
  return <LinksPage />;
}
