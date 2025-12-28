import type { PreferredTerm } from "src/modules/comics/domain/TermEntity";
import { BrowseQueryLink } from "./BrowseQueryLink";

type TermLinkProps = {
  term: PreferredTerm;
};

export function TermLink({ term }: TermLinkProps) {
  return (
    <BrowseQueryLink
      query={{ term: term.term_id }}
      label={
        <>
          {term.term} ({term.usageCount})
        </>
      }
    />
  );
}
