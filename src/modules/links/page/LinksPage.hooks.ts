import { useEffect, useState } from "react";
import type { LinkEntity } from "src/modules/links/domain/LinkEntity";
import { linksClient } from "src/modules/links/infra/linksClient";

export function useGetLinks() {
  const [links, setLinks] = useState<LinkEntity[]>([]);

  useEffect(() => {
    async function loadNews() {
      const fetchedLinks = await linksClient.fetchLinks();
      setLinks(fetchedLinks);
    }
    loadNews();
  }, []);

  return links;
}
