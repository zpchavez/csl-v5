import "./App.css";
import "src/lib/db";
import { NewsPage } from "src/news/page/NewsPage";

function App() {
  return (
    <>
      <div>
        <NewsPage />
      </div>
    </>
  );
}

export default App;
