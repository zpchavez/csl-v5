import { Fragment } from "react";
import { BrowseQueryLink } from "src/components/BrowseQueryLink";
import { TermLink } from "src/components/TermLink";
import type { EpisodeEntityWithRelations } from "src/modules/comics/domain/EpisodeEntity";
import { metadataService } from "src/modules/comics/infra/metadataService";
import { MetadataField } from "./MetadataField";

type MetadataProps = {
  episode: EpisodeEntityWithRelations;
};

export function Metadata({ episode }: MetadataProps) {
  return (
    <div className="mx-auto w-1/2 border-black border bg-white pt-4">
      <div className="text-center border-b border-black">
        <h3>Metadata</h3>
      </div>
      <MetadataField label="Title">
        <BrowseQueryLink
          query={{ title: episode.title_id }}
          label={episode.title}
        />
      </MetadataField>
      <MetadataField label="Author">
        <BrowseQueryLink
          query={{ author: episode.author_id }}
          label={episode.author}
        />
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
      {episode.characters.length ? (
        <MetadataField label="Characters">
          {episode.characters.map((character, index) => (
            <Fragment key={character.character_id}>
              <BrowseQueryLink
                query={{ character: character.character_id }}
                label={character.name}
              />
              {index < episode.characters.length - 1 ? ", " : ""}
            </Fragment>
          ))}
        </MetadataField>
      ) : null}
      {episode.terms.length ? (
        <MetadataField label="Contents">
          {episode.terms.map((term, index) => (
            <Fragment key={term.term_id}>
              <TermLink term={term} />
              {index < episode.terms.length - 1 ? ", " : ""}
            </Fragment>
          ))}
        </MetadataField>
      ) : null}
      {episode.notes && (
        <MetadataField label="Notes">
          <div
            className="metadata-notes"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted source
            dangerouslySetInnerHTML={{ __html: episode.notes }}
          />
        </MetadataField>
      )}
      {episode.transcript && (
        <MetadataField label="Transcript">
          <pre className="whitespace-pre-wrap">{episode.transcript}</pre>
        </MetadataField>
      )}
    </div>
  );
}
