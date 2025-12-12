export type Option = {
  label: string;
  value: string;
};

export type BrowseOptions = {
  years: Option[];
  titles: Option[];
  authors: Option[];
  characters: Option[];
  terms: Option[];
};

export interface MetadataClientInterface {
  fetchBrowseOptions(): Promise<BrowseOptions>;
}
