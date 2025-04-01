// app/news/page.tsx

import { FC } from "react";
import News from "../../components/News"; // Assuming you have this component

const NewsPage: FC = () => {
  return (
    <div>
      <h1>News Page</h1>
      <News />  {/* Assuming you want to show the news component here */}
    </div>
  );
};

export default NewsPage;
