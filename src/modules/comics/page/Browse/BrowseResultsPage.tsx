import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LoadingIndicator } from "src/components/LoadingIndicator";
import { Pagination } from "src/components/Pagination";
import { Button } from "src/components/ui/button";
import type { Filters } from "src/modules/comics/domain/MetadataClientInterface";
import { useGetThumbnailDimensions } from "src/modules/comics/page/hooks/useGetThumbnailDimensions";
import { useSearchEpisodes } from "src/modules/comics/page/hooks/useSearchEpisodes";
import { BrowseResultsItem } from "./BrowseResultsItem";

type BrowseResultsPageProps = {
  query: Filters & { page?: number };
};

export function BrowseResultsPage({ query }: BrowseResultsPageProps) {
  const episodes = useSearchEpisodes(query);
  const navigate = useNavigate({ from: "/browse/results" });

  useEffect(() => {
    if (episodes && Number(query.page) > episodes?.totalPages) {
      navigate({
        to: "/browse/results",
        search: { ...query, page: String(episodes.totalPages) },
        replace: true,
      });
    }
  }, [episodes, query, navigate]);

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
              <Button variant="default" asChild>
                <Link to="/browse">Revise browse criteria</Link>
              </Button>
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
