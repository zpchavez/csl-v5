import { useEffect, useState } from "react";
import { imageService } from "src/modules/comics/infra/imageService";

type ImageProps = {
  imageUrl: string;
  altText: string;
};

export function Image({ imageUrl, altText }: ImageProps) {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    imageService
      .getImageDimensions(imageUrl)
      .then(setImageDimensions)
      .catch(console.error);
  }, [imageUrl]);

  return (
    <>
      {imageDimensions ? (
        <img
          src={imageUrl}
          width={imageDimensions.width}
          height={imageDimensions.height}
          alt={altText}
        />
      ) : null}
    </>
  );
}
