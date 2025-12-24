import { useEffect, useState } from "react";
import {
  type ImageSize,
  imageService,
} from "src/modules/comics/infra/imageService";
import type { EpisodeEntity } from "../../domain/EpisodeEntity";

export function useGetDimensions({
  episodes,
  size,
}: {
  episodes: EpisodeEntity[] | undefined;
  size: ImageSize;
}) {
  const [dimensions, setDimensions] = useState<
    Record<number, { width: number; height: number }>
  >({});

  useEffect(() => {
    const getDimensions = async (eps: EpisodeEntity[] | undefined) => {
      if (!eps) {
        setDimensions({});
        return;
      }

      const episodeIds = eps.map((episode) => episode.episode_id);
      const dimensionKeys = Object.keys(dimensions).map((key) => Number(key));
      const hasDimensions = dimensionKeys.length > 0;
      const dimensionsMatchEpisodes = episodeIds.every((id) =>
        dimensionKeys.includes(id),
      );

      if (hasDimensions && !dimensionsMatchEpisodes) {
        setDimensions({});
        return;
      }

      const dimensionPromises = eps.map((episode) => {
        return imageService
          .getImageDimensions(imageService.getImageUrl({ episode, size }))
          .then((dims) => ({ episode_id: episode.episode_id, ...dims }))
          .catch(() => {
            return { episode_id: episode.episode_id, width: 0, height: 0 };
          });
      });

      Promise.all(dimensionPromises).then((dimensionResults) => {
        setDimensions((value) => {
          const newValue = { ...value };
          dimensionResults.forEach((result) => {
            newValue[result.episode_id] = {
              width: result.width,
              height: result.height,
            };
          });
          return newValue;
        });
      });
    };

    getDimensions(episodes);
  }, [episodes, size, dimensions]);

  return {
    dimensions,
    isLoading: !episodes || Object.keys(dimensions).length < episodes.length,
  };
}
