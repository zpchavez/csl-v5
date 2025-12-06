import { useState, useEffect } from "react";
import { newsClient } from "src/news/infra/newsClient";
import type { NewsEntity } from "src/news/domain/NewsEntity";

export function useNews() {
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
