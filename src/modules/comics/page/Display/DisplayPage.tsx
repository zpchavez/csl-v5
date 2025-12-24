import { LoadingIndicator } from "src/components/LoadingIndicator";
import { NotFound } from "src/components/NotFound";
import { imageService } from "src/modules/comics/infra/imageService";
import { metadataService } from "src/modules/comics/infra/metadataService";
import { useGetEpisodeById } from "../hooks/useGetEpisodeById";
import { ImageLink } from "./ImageLink";
import { Metadata } from "./Metadata";
import { NextAndPreviousNavigation } from "./NextAndPreviousNavigation";

type DisplayPageProps = {
  id: string;
};

export function DisplayPage({ id }: DisplayPageProps) {
  const episode = useGetEpisodeById(id);

  // @TODO when next/previous buttons are clicked, the old episode shows briefly
  // We should display a loading indicator instead, using a value returned by the hook

  return (
    <div className="mx-auto">
      {episode === null && <LoadingIndicator />}
      {episode === false && (
        <NotFound message="Requested comic episode not found" />
      )}
      {episode && (
        <>
          <div className="h-12 flex justify-center">
            <ImageLink episode={episode} size="large" />
            <ImageLink episode={episode} size="archival" />
          </div>
          <img
            className="mx-auto"
            src={imageService.getImageUrl({ episode: episode, size: "small" })}
            alt={`Scan of ${episode.title} published on ${metadataService.getDisplayDate(episode.date)}`}
          />
          <NextAndPreviousNavigation episode={episode} />
          <Metadata episode={episode} />
        </>
      )}
    </div>
  );
}
