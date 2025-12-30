import { db } from "src/lib/db";
import type { LinkEntity } from "src/modules/links/domain/LinkEntity";
import type { LinksClientInterface } from "src/modules/links/domain/LinksClientInterface";

export const linksClient: LinksClientInterface = {
  async fetchLinks() {
    const statement = db.prepare(
      "SELECT * FROM resources ORDER BY resource_title",
    );
    const results: LinkEntity[] = [];

    while (statement.step()) {
      const row = statement.getAsObject();
      results.push({
        resource_id: row.resource_id as number,
        title_id: row.title_id as number,
        resource_title: row.resource_title as string,
        cover: row.cover as string,
        relation: row.relation as LinkEntity["relation"],
        web_url: row.web_url as string,
        worldcat_url: row.worldcat_url as string,
        amazon_url: row.amazon_url as string,
        misc_url: row.misc_url as string,
        misc_text: row.misc_text as string,
        description: row.description as string,
      });
    }

    statement.free();
    return results;
  },
};
