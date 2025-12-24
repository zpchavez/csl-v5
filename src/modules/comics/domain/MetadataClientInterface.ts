import type { PaginatedResultsType } from "src/lib/PaginatedResultsType";
import type {
  EpisodeEntity,
  EpisodeEntityWithRelations,
} from "./EpisodeEntity";

export type Option = {
  label: string;
  value: string;
};

export type TermOption = Option & {
  count: number;
};

export type BrowseOptions = {
  years: Option[];
  titles: Option[];
  authors: Option[];
  characters: Option[];
  terms: TermOption[];
};

export type Filters = {
  year?: string;
  title?: string;
  term?: string;
  author?: string;
  character?: string;
};

export type SearchQuery = Filters & {
  search?: string;
  page?: number;
};

export interface MetadataClientInterface {
  fetchBrowseOptions(filters: Filters): Promise<BrowseOptions>;
  searchEpisodes(
    query: SearchQuery,
  ): Promise<PaginatedResultsType<EpisodeEntity>>;
  getEpisodeById(
    id: string,
  ): Promise<EpisodeEntityWithRelations | false | null>;
  getNextAndPreviousEpisodeIds(
    episode: EpisodeEntity,
  ): Promise<{ next: string | null; previous: string | null }>;
}
