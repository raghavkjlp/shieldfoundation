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
    <div>
      <section className="about-hero">
        <div className="container text-center animate-fade-in">
          <span className="hero-badge"><Newspaper size={16}/> LATEST UPDATES</span>
          <h1>Latest News & Updates</h1>
          <p>Stay informed about our recent events, press releases, and media coverage highlighting our continuous efforts on the ground.</p>
        </div>
      </section>

      <div className="section container">

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
    </div>
  );
};

export default News;
