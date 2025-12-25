import { useGetTermDetails } from "../hooks/useGetTermDetails";

type RelatedTermsProps = {
  termId: number;
};

export function RelatedTerms({ termId }: RelatedTermsProps) {
  const termDetails = useGetTermDetails(termId);

  if (!termDetails) {
    return null;
  }

  return (
    <div>
      <h1>{termDetails.term.term}</h1>
    </div>
  );
}
