import React, { useState, useEffect } from 'react';
import { PlayCircle } from 'lucide-react';

const Interviews = () => {
  const [videos, setVideos] = useState([]);
  const API_URL = 'https://shieldfoundation.onrender.com/api';

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${API_URL}/videos`);
        const data = await response.json();
        if(Array.isArray(data)) setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos', error);
      }
    };
    fetchVideos();
  }, []);

  // Helper to extract Youtube Video ID from various URL formats
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div>
      {/* Top YouTube Banner */}
      <section className="section section-bg" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container text-center">
          <div className="youtube-banner">
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>Visit Our YouTube Channel</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              Stay updated with our latest interviews, media coverage, and on-ground activities by subscribing to our official channel.
            </p>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn btn-youtube">
              <PlayCircle size={24} /> Subscribe & Watch on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* Featured Interviews Grid */}
      <section className="section section-white">
        <div className="container">
          <h2 className="text-center" style={{ fontSize: '1.5rem', color: 'var(--primary-color)', marginBottom: '3rem', fontWeight: '700' }}>
            Featured Interviews
          </h2>

          <div className="video-grid">
            {videos.map((vid) => {
              const videoId = getYouTubeId(vid.url);
              if (!videoId) return null;
              
              return (
                <div key={vid._id} className="video-card">
                  <iframe 
                    width="100%" 
                    height="240" 
                    src={`https://www.youtube.com/embed/${videoId}`} 
                    title={vid.title || "YouTube video player"} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                </div>
              );
            })}
          </div>

          {videos.length === 0 && (
            <div className="text-center text-muted mt-8">
              <p>No interviews uploaded yet. Add YouTube links from the Admin panel.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Interviews;
