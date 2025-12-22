import { useEffect, useState } from "react";
import type { EpisodeEntity } from "src/modules/comics/domain/EpisodeEntity";
import { metadataClient } from "src/modules/comics/infra/metadataClient";

export function useGetNextAndPreviousEpisodeIds(episode: EpisodeEntity) {
  const [nextAndPreviousEpisodeIds, setNextAndPreviousEpisodeIds] = useState<{
    next: string | null;
    previous: string | null;
  } | null>(null);

  useEffect(() => {
    const fetchNextAndPrevious = async () => {
      const { next, previous } =
        await metadataClient.getNextAndPreviousEpisodeIds(episode);
      setNextAndPreviousEpisodeIds({ next, previous });
    };

    fetchNextAndPrevious();
  }, [episode]);

  return {
    next: nextAndPreviousEpisodeIds?.next || null,
    previous: nextAndPreviousEpisodeIds?.previous || null,
  };
}
