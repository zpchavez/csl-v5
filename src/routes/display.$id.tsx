import { createFileRoute } from "@tanstack/react-router";
import { DisplayPage } from "src/modules/comics/page/DisplayPage";

export const Route = createFileRoute("/display/$id")({
  component: DisplayComponent,
});

function DisplayComponent() {
  const id = Route.useParams().id;

  return <DisplayPage id={id} />;
}
