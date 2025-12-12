import type { NewsEntity } from "src/modules/news/domain/NewsEntity";

export interface NewsClientInterface {
  fetchLatestNews(): Promise<NewsEntity[]>;
}
