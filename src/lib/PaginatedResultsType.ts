export type PaginatedResultsType<T> = {
  results: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};
