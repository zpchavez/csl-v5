import { useEffect, useState } from "react";
import { imageService } from "src/modules/comics/infra/imageService";
import type { EpisodeEntity } from "../../domain/EpisodeEntity";

export function useGetThumbnailDimensions(
  episodes: EpisodeEntity[] | undefined,
) {
  const [thumbnailDimensions, setThumbnailDimensions] = useState<
    Record<number, { width: number; height: number }>
  >({});

  useEffect(() => {
    if (!episodes) {
      return;
    }

    const dimensions = episodes.map((episode) => {
      return imageService
        .getImageDimensions(
          imageService.getImageUrl({ episode, size: "thumbnail" }),
        )
        .then((dims) => ({ episode_id: episode.episode_id, ...dims }));
    });

    Promise.all(dimensions).then((dimensionResults) => {
      setThumbnailDimensions((value) => {
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
  }, [episodes]);

  return {
    thumbnailDimensions,
    isLoading:
      !episodes || Object.keys(thumbnailDimensions).length < episodes.length,
  };
}
