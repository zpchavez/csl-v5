import type { LinkEntity } from "src/news/domain/LinkEntity";

export interface LinksClientInterface {
  fetchLinks(): Promise<LinkEntity[]>;
}
