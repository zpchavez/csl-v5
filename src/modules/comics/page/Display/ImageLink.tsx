import { useEffect, useState } from "react";
import { Button } from "src/components/ui/button";
import type { EpisodeEntity } from "src/modules/comics/domain/EpisodeEntity";
import { imageService } from "src/modules/comics/infra/imageService";

type ImageLinkProps = {
  episode: EpisodeEntity;
  size: "large" | "archival";
};

export function ImageLink({ episode, size }: ImageLinkProps) {
  const [imageExists, setImageExists] = useState<boolean | null>(null);

  const imageUrl = imageService.getImageUrl({ episode, size });

  useEffect(() => {
    const doesImageExist = async () => {
      const exists = await imageService.imageExists(imageUrl);
      setImageExists(exists);
    };
    doesImageExist();
  }, [imageUrl]);

  if (!imageExists) {
    return null;
  }

  const linkText =
    size === "large" ? "View High Quality Image" : "View Best Quality Image";

  return (
    <div className="text-center font-medium mb-4">
      <a href={imageUrl}>
        <Button variant="ghost">{linkText}</Button>
      </a>
    </div>
  );
}
