import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const API_URL = 'https://shieldfoundation.onrender.com/api';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_URL}/images`);
        const data = await response.json();
        if(Array.isArray(data)) setImages(data);
      } catch (error) {
        console.error('Failed to fetch images', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="section container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Photo & Video Gallery</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)' }}>
          Explore the impactful moments and our continuous efforts towards a better society through our live updated gallery powered by ImageKit & YouTube.
        </p>
      </div>

      <div className="grid grid-cols-3">
        {images.map((img) => (
          <div key={img._id} className="gallery-card">
            <img src={img.url} alt={img.title} loading="lazy" />
            <div className="gallery-card-content">
              <h3>{img.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {new Date(img.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
          <p>No photos have been uploaded yet. Go to the Admin panel to upload some!</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
