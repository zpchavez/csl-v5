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

export interface MetadataClientInterface {
  fetchBrowseOptions(): Promise<BrowseOptions>;
}
