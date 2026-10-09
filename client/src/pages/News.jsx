import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';

const News = () => {
  const [news, setNews] = useState([]);
  const API_URL = 'https://shieldfoundation.onrender.com/api';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_URL}/news`);
        const data = await response.json();
        if (Array.isArray(data)) setNews(data);
      } catch (error) {
        console.error('Failed to fetch news', error);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <Newspaper size={36} color="var(--primary-color)" /> Latest News & Updates
        </h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)' }}>
          Stay informed about our recent events, press releases, and media coverage highlighting our continuous efforts on the ground.
        </p>
      </div>

      <div className="grid grid-cols-3">
        {news.map((item) => (
          <div key={item._id} className="gallery-card">
            <img src={item.url} alt={item.title} loading="lazy" />
            <div className="gallery-card-content">
              <h3>{item.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {news.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
          <p>No news updates have been posted yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default News;
