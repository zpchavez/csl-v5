import { LoadingIndicator } from "src/components/LoadingIndicator";
import { NotFound } from "src/components/NotFound";
import { imageService } from "src/modules/comics/infra/imageService";
import { metadataService } from "src/modules/comics/infra/metadataService";
import { useGetEpisodeById } from "./hooks/useGetEpisodeById";

type DisplayPageProps = {
  id: string;
};

export function DisplayPage({ id }: DisplayPageProps) {
  const episode = useGetEpisodeById(id);

  return (
    <div className="mx-auto">
      {episode === null && <LoadingIndicator />}
      {episode === false && (
        <NotFound message="Requested comic episode not found" />
      )}
      {episode && (
        <img
          className="mx-auto"
          src={imageService.getImageUrl({ episode: episode, size: "small" })}
          alt={`Scan of ${episode.title} published on ${metadataService.getDisplayDate(episode.date)}`}
        />
      )}
    </div>
  );
}
