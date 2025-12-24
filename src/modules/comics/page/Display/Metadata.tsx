import { Link } from "@tanstack/react-router";
import type { EpisodeEntityWithRelations } from "src/modules/comics/domain/EpisodeEntity";
import { metadataService } from "src/modules/comics/infra/metadataService";
import { MetadataField } from "./MetadataField";

type MetadataProps = {
  episode: EpisodeEntityWithRelations;
};

export function Metadata({ episode }: MetadataProps) {
  return (
    <div className="mx-auto w-1/2 border bg-white pt-4">
      <div className="text-center">
        <h3>Metadata</h3>
      </div>
      <MetadataField label="Title">
        <Link
          to="/browse/results"
          search={{ title: String(episode.title_id) }}
          className="underline"
        >
          {episode.title}
        </Link>
      </MetadataField>
      <MetadataField label="Author">
        <Link
          to="/browse/results"
          search={{ author: String(episode.author_id) }}
          className="underline"
        >
          {episode.author}
        </Link>
      </MetadataField>
      <MetadataField label="Date Published">
        {metadataService.getDisplayDate(episode.date)} -&nbsp;
        {metadataService.getDayOfTheWeek(episode.date)}
      </MetadataField>
      {episode.episode_title && (
        <MetadataField label="Episode Title">
          {episode.episode_title}
        </MetadataField>
      )}
      {episode.summary && (
        <MetadataField label="Summary">{episode.summary}</MetadataField>
      )}
      {episode.characters.length && (
        <MetadataField label="Characters">
          {episode.characters.map((char) => char.name).join(", ")}
        </MetadataField>
      )}
      <MetadataField label="Contents">
        {episode.terms.length > 0
          ? episode.terms.map((term, index) => (
              <>
                <Link
                  to="/browse/results"
                  search={{ term: String(term.term_id) }}
                  key={term.term_id}
                  className="whitespace-nowrap underline"
                >
                  {term.term}&nbsp;({term.usageCount})
                </Link>
                {index < episode.terms.length - 1 ? ", " : ""}
              </>
            ))
          : "N/A"}
      </MetadataField>
    </div>
  );
}
