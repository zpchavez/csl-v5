import { useEffect, useState } from "react";
import type { NewsEntity } from "src/news/domain/NewsEntity";
import { newsClient } from "src/news/infra/newsClient";

export function useGetNews() {
  const [news, setNews] = useState<NewsEntity[]>([]);

  useEffect(() => {
    async function loadNews() {
      const fetchedNews = await newsClient.fetchLatestNews();
      setNews(fetchedNews);
    }
    loadNews();
  }, []);

  return news;
}
