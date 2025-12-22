import { Link } from "@tanstack/react-router";
import { Button } from "src/components/ui/button";
import type { EpisodeEntity } from "src/modules/comics/domain/EpisodeEntity";
import { useGetNextAndPreviousEpisodeIds } from "src/modules/comics/page/hooks/useGetNextAndPreviousEpisodeIds";

type NextPreviousNavProps = {
  episode: EpisodeEntity;
};

export function NextAndPreviousNavigation({ episode }: NextPreviousNavProps) {
  const nextAndPreviousEpisodeIds = useGetNextAndPreviousEpisodeIds(episode);

  return (
    <div className="flex my-4 justify-center">
      {nextAndPreviousEpisodeIds.previous && (
        <Button variant="ghost" asChild>
          <Link
            to={`/display/$id`}
            params={{ id: String(nextAndPreviousEpisodeIds.previous) }}
          >
            &larr; Previous
          </Link>
        </Button>
      )}
      {nextAndPreviousEpisodeIds.next && (
        <Button variant="ghost" asChild>
          <Link
            to={`/display/$id`}
            params={{ id: String(nextAndPreviousEpisodeIds.next) }}
          >
            Next &rarr;
          </Link>
        </Button>
      )}
    </div>
  );
}
