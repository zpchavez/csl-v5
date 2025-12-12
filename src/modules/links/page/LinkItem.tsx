import { resolveCoverImagePath } from "src/lib/image-resolver";
import type { LinkEntity } from "src/modules/links/domain/LinkEntity";

type LinkItemProps = {
  link: LinkEntity;
};

export function LinkItem({ link }: LinkItemProps) {
  const title = link.web_url ? (
    <a
      href={link.web_url}
      target="_blank"
      rel="noopener noreferrer"
      className="link"
    >
      {link.resource_title}
    </a>
  ) : (
    <span>{link.resource_title}</span>
  );

  return (
    <div
      key={link.resource_id}
      className="mb-8 flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-96"
    >
      <h3>{title}</h3>
      {link.cover ? (
        <img
          className="mt-4"
          alt={`${link.resource_title} cover`}
          src={resolveCoverImagePath(link.cover)}
        />
      ) : null}
      <div
        className="mt-4"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted source
        dangerouslySetInnerHTML={{ __html: link.description }}
      />
      <div className="mt-2">
        {link.misc_url && link.misc_text ? (
          <div>
            <a
              href={link.misc_url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              {link.misc_text}
            </a>
          </div>
        ) : null}
        {link.worldcat_url ? (
          <div>
            <a
              href={link.worldcat_url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Find in a library
            </a>
          </div>
        ) : null}
        {link.amazon_url ? (
          <div>
            <a
              href={link.amazon_url}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Buy on Amazon
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
