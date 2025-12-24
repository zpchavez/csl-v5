import { useEffect, useMemo, useState } from "react";
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
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const episode = useGetEpisodeById(id);
  const imageUrl = useMemo(
    () =>
      episode
        ? imageService.getImageUrl({ episode: episode, size: "small" })
        : null,
    [episode],
  );
  useEffect(() => {
    const getDimensions = async (imageUrl: string) => {
      const dimensions = await imageService.getImageDimensions(imageUrl);
      setDimensions(dimensions);
    };
    if (imageUrl) {
      getDimensions(imageUrl);
    }
  }, [imageUrl]);

  return (
    <div className="mx-auto">
      {(episode === null || !dimensions) && <LoadingIndicator delay={0} />}
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
            width={dimensions?.width}
            height={dimensions?.height}
            alt={`Scan of ${episode.title} published on ${metadataService.getDisplayDate(episode.date)}`}
          />
          <NextAndPreviousNavigation episode={episode} />
          <Metadata episode={episode} />
        </>
      )}
    </div>
  );
}
