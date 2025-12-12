import { useEffect, useState } from "react";
import type { BrowseOptions } from "src/modules/comics/domain/MetadataClientInterface";
import { metadataClient } from "src/modules/comics/infra/metadataClient";

export function useGetBrowseOptions() {
  const [browseOptions, setBrowseOptions] = useState<BrowseOptions | null>(
    null,
  );

  useEffect(() => {
    async function loadBrowseOptions() {
      const fetchedBrowseOptions = await metadataClient.fetchBrowseOptions();
      setBrowseOptions(fetchedBrowseOptions);
    }
    loadBrowseOptions();
  }, []);

  return browseOptions;
}
