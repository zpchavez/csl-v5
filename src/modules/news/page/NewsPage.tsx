import { LoadingIndicator } from "src/components/LoadingIndicator";
import { useGetNews } from "src/modules/news/page/NewsPage.hooks";
import { NewsPost } from "src/modules/news/page/NewsPost";

export function NewsPage() {
  const news = useGetNews();

  // @TODO Add the 2014/06/07 news item that is live on the php site

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
