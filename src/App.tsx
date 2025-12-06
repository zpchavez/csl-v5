import { useEffect, useState } from "react";
import { newsClient } from "src/news/infra/newsClient";
import type { NewsEntity } from "src/news/domain/NewsEntity";
import "./App.css";
import "src/lib/db";

function App() {
  const [news, setNews] = useState<NewsEntity[]>([]);

  useEffect(() => {
    async function loadNews() {
      const fetchedNews = await newsClient.fetchLatestNews();
      setNews(fetchedNews);
    }
    loadNews();
  }, []);

  return (
    <>
      <div>
        <h1>Proof Of Concept: News</h1>
        {news.map((item) => (
          <div key={item.post_id} style={{ marginBottom: "20px" }}>
            <h2>{item.heading}</h2>
            <p>
              <em>{item.date.toDateString()}</em>
            </p>
            <div dangerouslySetInnerHTML={{ __html: item.post }} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
