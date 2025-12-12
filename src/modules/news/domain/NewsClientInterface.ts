import type { NewsEntity } from "src/news/domain/NewsEntity";

export interface NewsClientInterface {
  fetchLatestNews(): Promise<NewsEntity[]>;
}
