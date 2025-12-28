import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { BrowseResultsPage } from "src/modules/comics/page/Browse/BrowseResultsPage";
import { z } from "zod";

const browseSchema = z.object({
  year: z.coerce.number().optional(),
  title: z.coerce.number().optional(),
  character: z.coerce.number().optional(),
  author: z.coerce.number().optional(),
  term: z.coerce.number().optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).optional().catch(1),
});

export const Route = createFileRoute("/browse/results")({
  component: BrowseResultsRoute,
  validateSearch: zodValidator(browseSchema),
});

function BrowseResultsRoute() {
  const search = Route.useSearch();
  return <BrowseResultsPage query={search} />;
}
