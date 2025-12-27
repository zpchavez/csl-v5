import { useEffect, useState } from "react";
import type {
  BrowseOptions,
  Filters,
} from "src/modules/comics/domain/MetadataClientInterface";
import { metadataClient } from "src/modules/comics/infra/metadataClient";

export function useGetBrowseOptions(filters: Filters) {
  const [browseOptions, setBrowseOptions] = useState<BrowseOptions | null>(
    null,
  );

  useEffect(() => {
    async function loadBrowseOptions() {
      const fetchedBrowseOptions =
        await metadataClient.getBrowseOptions(filters);
      setBrowseOptions(fetchedBrowseOptions);
    }
    loadBrowseOptions();
  }, [filters]);

  return browseOptions;
}
