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
  getImageUrl({ episode, size }: { episode: EpisodeEntity; size: ImageSize }) {
    const date = episode.date;
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const baseUrl = config.s3BucketUrl;
    const title = titlePrefixMap[episode.title_id];
    const url =
      `${baseUrl}/comics/${title}/${title}-` +
      `${year}${month}${day}-${sizeMap[size]}.${titleExtensionMap[episode.title_id]}`;

    return url;
  },
};
