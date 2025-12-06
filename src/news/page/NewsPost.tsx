import type { NewsEntity } from "src/news/domain/NewsEntity";

type NewsPostProps = {
  post: NewsEntity;
};

export function NewsPost({ post }: NewsPostProps) {
  return (
    <div key={post.post_id} className="news-post">
      <h1>{post.heading}</h1>
      <h2>{post.date.toISOString().substring(0, 10)}</h2>
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted source */}
      <div className="post" dangerouslySetInnerHTML={{ __html: post.post }} />
    </div>
  );
}
