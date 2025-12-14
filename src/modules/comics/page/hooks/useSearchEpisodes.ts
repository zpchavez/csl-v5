import { useEffect, useState } from "react";
import type { PaginatedResultsType } from "src/lib/PaginatedResultsType";
import type { EpisodeEntity } from "src/modules/comics/domain/EpisodeEntity";
import type { SearchQuery } from "src/modules/comics/domain/MetadataClientInterface";
import { metadataClient } from "src/modules/comics/infra/metadataClient";

export function useSearchEpisodes(query: SearchQuery) {
  const [results, setResults] =
    useState<PaginatedResultsType<EpisodeEntity> | null>(null);

  useEffect(() => {
    async function loadEpisodes() {
      const fetchedResults = await metadataClient.searchEpisodes(query);
      setResults(fetchedResults);
    }
    loadEpisodes();
  }, [query]);

  return results;
}
