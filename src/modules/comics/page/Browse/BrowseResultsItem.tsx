import { Link } from "@tanstack/react-router";
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
      <div className="text-center font-mono mb-1">
        {metadataService.getDisplayDate(episode.date)}
      </div>
      <Link to={`/display/$id`} params={{ id: String(episode.episode_id) }}>
        <img
          className="mx-auto"
          src={imageService.getImageUrl({ episode, size: "thumbnail" })}
          width={thumbnailDimensions?.width}
          height={thumbnailDimensions?.height}
          alt={`${episode.title} ${metadataService.getDisplayDate(episode.date)}`}
        />
      </Link>
    </div>
  );
}
