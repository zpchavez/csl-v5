import { LoadingIndicator } from "src/components/LoadingIndicator";
import { NewsPost } from "src/news/page/NewsPost";
import { useNews } from "src/news/page/NewsPage.hooks";

export function NewsPage() {
  const news = useNews();

  return (
    <div>
      <h2 className="page-title">Site News</h2>
      <div className="news-columns">
        <div className="news-feed">
          {news ? (
            news.map((post) => <NewsPost post={post} />)
          ) : (
            <LoadingIndicator />
          )}
        </div>
      </div>
    </div>
  );
}
