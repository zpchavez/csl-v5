import { Link } from "@tanstack/react-router";
import type { PreferredTerm } from "src/modules/comics/domain/TermEntity";

type TermLinkProps = {
  term: PreferredTerm;
};

export function TermLink({ term }: TermLinkProps) {
  return (
    <Link
      to="/browse/results"
      search={{ term: String(term.term_id) }}
      key={term.term_id}
      className="whitespace-nowrap underline underline-offset-4 decoration-1"
    >
      {term.term}&nbsp;({term.usageCount})
    </Link>
  );
}
