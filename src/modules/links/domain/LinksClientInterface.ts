import type { LinkEntity } from "src/modules/links/domain/LinkEntity";

export interface LinksClientInterface {
  fetchLinks(): Promise<LinkEntity[]>;
}
