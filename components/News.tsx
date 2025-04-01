"use client";

import { useEffect, useState } from "react";

interface NewsArticle {
  title: string;
  url: string;
  source: string;
}

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN");
        const data = await response.json();

        if (data.Data) {
          const topNews = data.Data.slice(0, 5).map((article: any) => ({
            title: article.title,
            url: article.url,
            source: article.source_info.name,
          }));
          setNews(topNews);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="p-6 pt-20 max-w-5xl mx-auto">
      {loading ? (
        <p className="text-gray-700 dark:text-gray-300 text-center">Loading news...</p>
      ) : (
        <div className="grid gap-4">
          {news.map((article, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 transition hover:shadow-md"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {article.title}
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Source: {article.source}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
