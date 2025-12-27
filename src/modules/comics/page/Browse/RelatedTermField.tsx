import { TermLink } from "src/components/TermLink";
import {
  isPreferredTerm,
  type Term,
} from "src/modules/comics/domain/TermEntity";

export function RelatedTermField({
  label,
  terms,
}: {
  label: string;
  terms: Term[];
}) {
  const termsWithUsageCountGreaterThanZeroAndAlsoNonPreferredTerms =
    terms.filter((t) => !t.is_preferred || t.usageCount > 0);

  if (termsWithUsageCountGreaterThanZeroAndAlsoNonPreferredTerms.length === 0) {
    return null;
  }

  return (
    <div className="flex p-4 border-b border-black">
      <div className="w-1/4 text-center font-semibold">{label}</div>
      <div className="flex-1">
        {termsWithUsageCountGreaterThanZeroAndAlsoNonPreferredTerms.map(
          (term, index) => (
            <span key={term.term_id}>
              {isPreferredTerm(term) ? <TermLink term={term} /> : term.term}
              {index < terms.length - 1 && <span>, </span>}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
