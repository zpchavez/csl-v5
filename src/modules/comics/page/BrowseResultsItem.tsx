import type { EpisodeEntity } from "src/modules/comics/domain/EpisodeEntity";
import { imageService } from "src/modules/comics/infra/imageService";
import { metadataService } from "src/modules/comics/infra/metadataService";

type BrowseResultsItemProps = {
  episode: EpisodeEntity;
  thumbnailDimensions?: { width: number; height: number };
};

export function BrowseResultsItem({
  episode,
  thumbnailDimensions,
}: BrowseResultsItemProps) {
  return (
    <div>
      <div className="text-center">{episode.title}</div>
      <div className="text-center">
        {metadataService.getDisplayDate(episode.date)}
      </div>
      <img
        className="mx-auto"
        src={imageService.getImageUrl({ episode, size: "thumbnail" })}
        width={thumbnailDimensions?.width}
        height={thumbnailDimensions?.height}
        alt={`${episode.title} ${metadataService.getDisplayDate(episode.date)}`}
      />
    </div>
  );
}
