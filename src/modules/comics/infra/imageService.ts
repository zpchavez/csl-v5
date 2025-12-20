import { config } from "src/config";
import type { EpisodeEntity } from "../domain/EpisodeEntity";

type ImageSize = "thumbnail" | "small" | "large" | "archival";

const titlePrefixMap: Record<number, string> = {
  1: "krazy-kat",
  2: "little-nemo",
  3: "dream-of-the-rarebit-fiend",
};

const titleExtensionMap: Record<number, string> = {
  1: "png",
  2: "jpeg",
  3: "png",
};

const sizeMap: Record<ImageSize, string> = {
  thumbnail: "tn",
  small: "s",
  large: "l",
  archival: "a",
};

export const imageService = {
  getImageDimensions(
    imageUrl: string,
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = imageUrl;
    });
  },

  getImageUrl({ episode, size }: { episode: EpisodeEntity; size: ImageSize }) {
    const date = episode.date;
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const baseUrl = config.s3BucketUrl;
    const title = titlePrefixMap[episode.title_id];

    let extension = titleExtensionMap[episode.title_id];
    // Hardcoded exception
    if (episode.episode_id === 941) {
      extension = "jpeg";
    }

    const suffix = episode.suffix ? `-${episode.suffix}` : "";

    const url =
      `${baseUrl}/comics/${title}/${title}-` +
      `${year}${month}${day}${suffix}-${sizeMap[size]}.${extension}`;

    return url;
  },
};
