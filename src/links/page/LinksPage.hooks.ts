import { useEffect, useState } from "react";
import type { LinkEntity } from "src/links/domain/LinkEntity";
import { linksClient } from "src/links/infra/linksClient";

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
