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

export interface MetadataClientInterface {
  fetchBrowseOptions(filters: Filters): Promise<BrowseOptions>;
}
