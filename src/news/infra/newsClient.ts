import type { NewsClientInterface } from "src/news/domain/NewsClientInterface";
import type { NewsEntity } from "src/news/domain/NewsEntity";
import { db } from "src/lib/db";

export const newsClient: NewsClientInterface = {
  async fetchLatestNews() {
    const statement = db.prepare("SELECT * FROM news ORDER BY date DESC");
    const results: NewsEntity[] = [];

    while (statement.step()) {
      const row = statement.getAsObject();
      results.push({
        post_id: row.post_id as number,
        heading: row.heading as string,
        date: new Date(row.date as string),
        post: row.post as string,
      });
    }

    statement.free();
    return results;
  },
};
