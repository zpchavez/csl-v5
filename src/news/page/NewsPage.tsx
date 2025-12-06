import { LoadingIndicator } from "src/components/LoadingIndicator";
import { useNews } from "src/news/page/NewsPage.hooks";
import { NewsPost } from "src/news/page/NewsPost";

export function NewsPage() {
  const news = useNews();

  return (
    <div>
      <h2 className="page-title">Site News</h2>
      <div className="news-columns">
        <div className="news-feed">
          {news ? (
            news.map((post) => <NewsPost key={post.post_id} post={post} />)
          ) : (
            <LoadingIndicator />
          )}
        </div>
      </div>
    </div>
  );
}
