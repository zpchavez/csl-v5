import type { NewsEntity } from "src/news/domain/NewsEntity";

type NewsPostProps = {
  post: NewsEntity;
};

export function NewsPost({ post }: NewsPostProps) {
  return (
    <div key={post.post_id} className="mb-8">
      <h2>{post.heading}</h2>
      <h3>{post.date.toISOString().substring(0, 10)}</h3>
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted source */}
      <div className="post" dangerouslySetInnerHTML={{ __html: post.post }} />
    </div>
  );
}
