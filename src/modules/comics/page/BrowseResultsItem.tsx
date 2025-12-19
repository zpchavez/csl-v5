import { useEffect, useState } from "react";
import type { EpisodeEntity } from "src/modules/comics/domain/EpisodeEntity";
import { imageService } from "src/modules/comics/infra/imageService";
import { metadataService } from "src/modules/comics/infra/metadataService";

type BrowseResultsItemProps = {
  episode: EpisodeEntity;
};

export function BrowseResultsItem({ episode }: BrowseResultsItemProps) {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // @TODO extract Image component that includes this
  useEffect(() => {
    imageService
      .getImageDimensions(
        imageService.getImageUrl({ episode, size: "thumbnail" }),
      )
      .then(setImageDimensions)
      .catch(console.error);
  }, [episode]);

  return (
    <div className="">
      <div className="text-center">{episode.title}</div>
      <div className="text-center">
        {metadataService.getDisplayDate(episode.date)}
      </div>
      {imageDimensions ? (
        <img
          src={imageService.getImageUrl({ episode, size: "thumbnail" })}
          width={imageDimensions.width}
          height={imageDimensions.height}
          alt={`${episode.title} ${metadataService.getDisplayDate(episode.date)}`}
        />
      ) : null}
    </div>
  );
}
