import type { EpisodeEntity } from "src/modules/comics/domain/EpisodeEntity";
import { metadataService } from "src/modules/comics/infra/metadataService";

type MetadataProps = {
  episode: EpisodeEntity;
};

export function Metadata({ episode }: MetadataProps) {
  return (
    <div className="mx-auto w-1/2 border bg-white pt-4">
      <div className="text-center">
        <h3>Metadata</h3>
      </div>
      <div className="flex p-4">
        <div className="flex-1 border-b border-black text-center font-semibold">
          Title
        </div>
        <div className="flex-2 text-center border-b border-black">
          {episode.title}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex-1 border-b border-black text-center font-semibold">
          Author
        </div>
        <div className="flex-2 text-center border-b border-black">
          {episode.author}
        </div>
      </div>
      <div className="flex p-4">
        <div className="flex-1 border-b border-black text-center font-semibold">
          Date Published
        </div>
        <div className="flex-2 text-center border-b border-black">
          {metadataService.getDisplayDate(episode.date)} -&nbsp;
          {metadataService.getDayOfTheWeek(episode.date)}
        </div>
      </div>
    </div>
  );
}
