import { useEffect, useState } from "react";
import type { TermDetails } from "src/modules/comics/domain/TermEntity";
import { thesaurusClient } from "src/modules/comics/infra/thesaurusClient";

export function useGetTermDetails(termId: number) {
  const [termDetails, setTermDetails] = useState<TermDetails | null | false>(
    null,
  );

  useEffect(() => {
    async function getTermDetails() {
      const termDetails = await thesaurusClient.getTermDetails(termId);
      setTermDetails(termDetails);
    }
    getTermDetails();
  }, [termId]);

  return termDetails;
}
