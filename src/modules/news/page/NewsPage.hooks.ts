import { useEffect, useState } from "react";
import type { EpisodeEntity } from "src/modules/comics/domain/EpisodeEntity";
import { metadataClient } from "src/modules/comics/infra/metadataClient";
import type { NewsEntity } from "src/modules/news/domain/NewsEntity";
import { newsClient } from "src/modules/news/infra/newsClient";

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

export function useGetLatestUploadedEpisodes() {
  const [episodes, setEpisodes] = useState<EpisodeEntity[]>([]);

  useEffect(() => {
    async function loadComics() {
      const fetchedEpisodes = await metadataClient.getLatestUploadedEpisodes();
      setEpisodes(fetchedEpisodes);
    }
    loadComics();
  }, []);

  return episodes;
}
