type BrowseQuery = {
  year?: string;
  title?: string;
  character?: string;
  author?: string;
  term?: string;
};

export function BrowseResultsPage({ query }: { query: BrowseQuery }) {
  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-center">Browse Results</h2>
    </div>
  );
}
