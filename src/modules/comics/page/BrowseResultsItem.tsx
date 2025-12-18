import type { EpisodeEntity } from "src/modules/comics/domain/EpisodeEntity";
import { imageService } from "src/modules/comics/infra/imageService";
import { metadataService } from "src/modules/comics/infra/metadataService";

type BrowseResultsItemProps = {
  episode: EpisodeEntity;
};

export function BrowseResultsItem({ episode }: BrowseResultsItemProps) {
  return (
    <div className="">
      <div className="text-center">{episode.title}</div>
      <div className="text-center">
        {metadataService.getDisplayDate(episode.date)}
      </div>
      <img
        src={imageService.getImageUrl({ episode, size: "thumbnail" })}
        alt={`Episode ${episode.episode_id}`}
      />
    </div>
  );
}
