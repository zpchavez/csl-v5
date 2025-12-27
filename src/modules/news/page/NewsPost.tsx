import type { NewsEntity } from "src/modules/news/domain/NewsEntity";

type NewsPostProps = {
  post: NewsEntity;
};

export function NewsPost({ post }: NewsPostProps) {
  return (
    <div key={post.post_id} className="mb-8">
      <h3>{post.heading}</h3>
      <h4>{post.date.toISOString().substring(0, 10)}</h4>
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted source */}
      <div className="post" dangerouslySetInnerHTML={{ __html: post.post }} />
    </div>
  );
}
