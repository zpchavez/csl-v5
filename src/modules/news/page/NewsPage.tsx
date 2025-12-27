import { LatestComicsColumn } from "./LatestComicsColumn";
import { PostsColumn } from "./PostsColumn";

export function NewsPage() {
  return (
    <div className="news-page flex justify-center">
      <div className="flex w-1/2 max-w-4xl">
        <div className="w-3/4 pr-4">
          <PostsColumn />
        </div>
        <div className="w-1/4 pl-4">
          <LatestComicsColumn />
        </div>
      </div>
    </div>
  );
}
