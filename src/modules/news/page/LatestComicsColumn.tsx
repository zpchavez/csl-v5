import { Link } from "@tanstack/react-router";
import { imageService } from "src/modules/comics/infra/imageService";
import { metadataService } from "src/modules/comics/infra/metadataService";
import { useGetLatestUploadedEpisodes } from "./NewsPage.hooks";

export function LatestComicsColumn() {
  const episodes = useGetLatestUploadedEpisodes();

  return (
    <div>
      <h2 className="text-center">Latest Comics</h2>
      {episodes?.map((episode) => (
        <div className="mb-8" key={episode.episode_id}>
          <Link to={`/display/$id`} params={{ id: String(episode.episode_id) }}>
            <img
              className="mx-auto"
              src={imageService.getImageUrl({ episode, size: "thumbnail" })}
              alt={`${episode.title} ${metadataService.getDisplayDate(episode.date)}`}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
