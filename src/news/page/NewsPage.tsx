import { LoadingIndicator } from "src/components/LoadingIndicator";
import { useGetNews } from "src/news/page/NewsPage.hooks";
import { NewsPost } from "src/news/page/NewsPost";

export function NewsPage() {
  const news = useGetNews();

  return (
    <div>
      <h2 className="text-center">Site News</h2>
      <div className="ml-16 mr-16 w-1/2">
        {news ? (
          news.map((post) => <NewsPost key={post.post_id} post={post} />)
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </div>
  );
}
