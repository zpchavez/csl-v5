import {
  isPreferredTerm,
  type Term,
} from "src/modules/comics/domain/TermEntity";
import { TermLink } from "./TermLink";

export function RelatedTermField({
  label,
  terms,
}: {
  label: string;
  terms: Term[];
}) {
  if (terms.length === 0) {
    return null;
  }

  return (
    <div className="flex p-4 border-b border-black">
      <div className="w-1/4 text-center font-semibold">{label}</div>
      {terms.map((term, index) =>
        isPreferredTerm(term) ? (
          <>
            <TermLink term={term} />
            {index < terms.length - 1 ? <>,&nbsp;</> : ""}
          </>
        ) : (
          <>
            {term.term}
            {index < terms.length - 1 ? ", " : ""}
          </>
        ),
      )}
    </div>
  );
}
