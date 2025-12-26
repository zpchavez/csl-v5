import { useGetTermDetails } from "../hooks/useGetTermDetails";
import { RelatedTermField } from "./RelatedTermField";

type RelatedTermsProps = {
  termId: number;
};

export function RelatedTerms({ termId }: RelatedTermsProps) {
  const termDetails = useGetTermDetails(termId);

  if (!termDetails) {
    return null;
  }

  return (
    <div className="mx-auto w-3/4 border-black border bg-white pt-4">
      <div className="text-center border-b border-black">
        <h3>{termDetails.term.term}</h3>
      </div>
      {"use_terms" in termDetails ? (
        <RelatedTermField label="Use" terms={termDetails.use_terms} />
      ) : null}
      {"used_for_terms" in termDetails ? (
        <RelatedTermField label="Used For" terms={termDetails.used_for_terms} />
      ) : null}
      {"broader_terms" in termDetails ? (
        <RelatedTermField
          label="Broader Terms"
          terms={termDetails.broader_terms}
        />
      ) : null}
      {"narrower_terms" in termDetails ? (
        <RelatedTermField
          label="Narrower Terms"
          terms={termDetails.narrower_terms}
        />
      ) : null}
      {"related_terms" in termDetails ? (
        <RelatedTermField
          label="Related Terms"
          terms={termDetails.related_terms}
        />
      ) : null}
    </div>
  );
}
