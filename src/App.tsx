import { useState } from "react";
import "./App.css";
import Categories from "./components/Categories";
import { categories, videos } from "./data/home";
import "./index.css";
import PageHeader from "./layouts/PageHeader";
import VideoGridItem from "./components/VideoGridItem";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-col-[auto,1fr] flex-grow-1 overflow-auto">
        <div>Sidebar</div>
        {/* Categories */}
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <Categories
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {videos.map((video) => (
              <VideoGridItem key={video.id} {...video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
