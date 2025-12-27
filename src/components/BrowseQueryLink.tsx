import { Link } from "@tanstack/react-router";
import type { Filters } from "src/modules/comics/domain/MetadataClientInterface";

type BrowseQueryLinkProps = {
  query: Filters;
  label: React.ReactNode;
};

export function BrowseQueryLink({ query, label }: BrowseQueryLinkProps) {
  return (
    <Link
      to="/browse/results"
      search={query}
      className="whitespace-nowrap underline underline-offset-4 decoration-1"
    >
      {label}
    </Link>
  );
}
