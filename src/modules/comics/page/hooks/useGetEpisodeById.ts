import { useEffect, useState } from "react";
import type { EpisodeEntityWithRelations } from "src/modules/comics/domain/EpisodeEntity";
import { metadataClient } from "src/modules/comics/infra/metadataClient";

export function useGetEpisodeById(id: string) {
  const [episode, setEpisode] = useState<
    EpisodeEntityWithRelations | null | false
  >(null);

  useEffect(() => {
    async function getEpisode() {
      const fetchedEpisode = await metadataClient.getEpisodeById(id);
      setEpisode(fetchedEpisode);
    }
    getEpisode();
  }, [id]);

  if (episode && episode.episode_id !== Number(id)) {
    return null;
  }

  return episode;
}
