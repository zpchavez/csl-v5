import type { Filters } from "src/modules/comics/domain/MetadataClientInterface";
import { useSearchEpisodes } from "src/modules/comics/page/hooks/useSearchEpisodes";

export function BrowseResultsPage({ query }: { query: Filters }) {
  const episodes = useSearchEpisodes(query);

  console.log(episodes);

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-center">Browse Results</h2>
    </div>
  );
}
