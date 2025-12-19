import { Link } from "@tanstack/react-router";
import { LoadingIndicator } from "src/components/LoadingIndicator";
import { Pagination } from "src/components/Pagination";
import { Button } from "src/components/ui/button";
import type { Filters } from "src/modules/comics/domain/MetadataClientInterface";
import { useGetThumbnailDimensions } from "src/modules/comics/page/hooks/useGetThumbnailDimensions";
import { useSearchEpisodes } from "src/modules/comics/page/hooks/useSearchEpisodes";
import { BrowseResultsItem } from "./BrowseResultsItem";

export function BrowseResultsPage({ query }: { query: Filters }) {
  const episodes = useSearchEpisodes(query);

  const { thumbnailDimensions, isLoading } = useGetThumbnailDimensions(
    episodes?.results,
  );

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-center">Browse Results</h2>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          {episodes?.totalCount === 0 && (
            <div className="text-center">
              <p className="text-center mb-4">No results found</p>
              <Link to="/browse">
                <Button variant="default">Revise browse criteria</Button>
              </Link>
            </div>
          )}
          <div className="flex flex-wrap gap-4 justify-center mt-12 w-full">
            {episodes?.results.map((episode) => (
              <BrowseResultsItem
                key={episode.episode_id}
                episode={episode}
                thumbnailDimensions={thumbnailDimensions[episode.episode_id]}
              />
            ))}
          </div>
          {episodes && (
            <div className="mt-8">
              <Pagination
                currentPage={episodes.currentPage}
                totalPages={episodes.totalPages}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
