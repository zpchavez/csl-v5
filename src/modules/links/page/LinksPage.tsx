import { LoadingIndicator } from "src/components/LoadingIndicator";
import { LinkItem } from "./LinkItem";
import { useGetLinks } from "./LinksPage.hooks";

export function LinksPage() {
  const links = useGetLinks();

  return (
    <div>
      <h2 className="text-center">Books &amp; Links</h2>
      <div className="flex flex-col items-center">
        {links ? (
          links.map((link) => <LinkItem key={link.resource_id} link={link} />)
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </div>
  );
}
