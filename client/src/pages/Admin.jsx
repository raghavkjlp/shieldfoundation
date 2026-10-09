import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Video, Image as ImageIcon, Lock, Users } from 'lucide-react';

const Admin = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [news, setNews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [youtubeTitle, setYoutubeTitle] = useState('');

  // Use your backend URL, if proxy is not set
  const API_URL = 'https://shieldfoundation.onrender.com/api';

  useEffect(() => {
    if (isAuthenticated) {
      fetchImages();
      fetchVideos();
      fetchNews();
      fetchMemberships();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin1234') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="section section-bg" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-card" style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--primary-color)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Lock size={30} color="white" />
            </div>
            <h2 style={{ color: 'var(--primary-color)' }}>Admin Login</h2>
            <p style={{ color: 'var(--text-muted)' }}>Enter your credentials to access the dashboard</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Enter username" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter password" />
            </div>
            {loginError && <p style={{ color: '#ef476f', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>{loginError}</p>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  const fetchImages = async () => {
    try {
      // using dynamic import for axios in this simplified setup, or rely on global
      const response = await fetch(`${API_URL}/images`);
      const data = await response.json();
      if(Array.isArray(data)) setImages(data);
    } catch (error) {
      console.error('Failed to fetch images', error);
    }
  };

  const fetchMemberships = async () => {
    try {
      const response = await fetch(`${API_URL}/memberships`);
      const data = await response.json();
      if(Array.isArray(data)) setMemberships(data);
    } catch (error) {
      console.error('Failed to fetch memberships', error);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${API_URL}/videos`);
      const data = await response.json();
      if(Array.isArray(data)) setVideos(data);
    } catch (error) {
      console.error('Failed to fetch videos', error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_URL}/news`);
      const data = await response.json();
      if(Array.isArray(data)) setNews(data);
    } catch (error) {
      console.error('Failed to fetch news', error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/images`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Image uploaded successfully!');
        setFile(null);
        setTitle('');
        fetchImages();
      } else {
        alert('Upload failed.');
      }
    } catch (error) {
      console.error(error);
      alert('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const response = await fetch(`${API_URL}/images/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchImages();
      }
    } catch (error) {
      console.error(error);
      alert('Delete failed.');
    }
  };

  const handleDeleteMembership = async (id) => {
    if (!window.confirm('Are you sure you want to delete this membership application?')) return;
    try {
      const response = await fetch(`${API_URL}/memberships/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchMemberships();
      }
    } catch (error) {
      console.error(error);
      alert('Delete failed.');
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!youtubeLink) return alert('Please enter a YouTube link');
    
    try {
      const response = await fetch(`${API_URL}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: youtubeLink, title: youtubeTitle })
      });
      if (response.ok) {
        alert('Video added successfully!');
        setYoutubeLink('');
        setYoutubeTitle('');
        fetchVideos();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add video.');
    }
  };

  const handleDeleteVideo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      const response = await fetch(`${API_URL}/videos/${id}`, { method: 'DELETE' });
      if (response.ok) fetchVideos();
    } catch (error) {
      console.error(error);
      alert('Delete failed.');
    }
  };

  const handleUploadNews = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/news`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('News uploaded successfully!');
        setFile(null);
        setTitle('');
        fetchNews();
      } else {
        alert('Upload failed.');
      }
    } catch (error) {
      console.error(error);
      alert('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) return;
    try {
      const response = await fetch(`${API_URL}/news/${id}`, { method: 'DELETE' });
      if (response.ok) fetchNews();
    } catch (error) {
      console.error(error);
      alert('Delete failed.');
    }
  };

  return (
    <div className="section container">
      <h2 className="section-title">Admin Dashboard</h2>
      
      <div className="grid grid-cols-2">
        {/* Upload Image Form */}
        <div className="admin-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <ImageIcon size={24} color="var(--accent-color)" />
            Upload to Gallery or News
          </h3>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button className="btn btn-outline" onClick={handleUpload} disabled={loading} style={{ flex: 1, padding: '0.5rem' }}>
              Upload to Gallery
            </button>
            <button className="btn btn-outline" onClick={handleUploadNews} disabled={loading} style={{ flex: 1, padding: '0.5rem', borderColor: '#ef476f', color: '#ef476f' }}>
              Upload to News
            </button>
          </div>

          <form>
            <div className="input-group">
              <label>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Donation Camp 2026" required />
            </div>
            <div className="input-group">
              <label>Select Photo</label>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>* Fill these fields then click one of the buttons above.</p>
          </form>
        </div>

        {/* YouTube Video Section */}
        <div className="admin-card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Video size={24} color="var(--accent-color)" />
            Manage YouTube Videos
          </h3>
          <form onSubmit={handleAddVideo}>
            <div className="input-group">
              <label>Video Title (Optional)</label>
              <input type="text" value={youtubeTitle} onChange={(e) => setYoutubeTitle(e.target.value)} placeholder="e.g. Media Coverage 2026" />
            </div>
            <div className="input-group">
              <label>YouTube Link</label>
              <input type="text" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} placeholder="https://youtube.com/watch?v=..." required />
            </div>
            <button type="submit" className="btn btn-secondary"><Video size={18} style={{ marginRight: '0.5rem' }}/> Add Video</button>
          </form>
        </div>
      </div>

      {/* Uploaded Images List */}
      <div className="admin-card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Manage Uploaded Photos</h3>
        {images.length === 0 ? <p>No images uploaded yet.</p> : (
          <div className="grid grid-cols-3">
            {images.map((img) => (
              <div key={img._id} style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <img src={img.url} alt={img.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <button 
                  onClick={() => handleDelete(img._id)}
                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'red', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
                >
                  <Trash2 size={16} />
                </button>
                <div style={{ background: 'rgba(0,0,0,0.7)', color: 'white', padding: '0.5rem', position: 'absolute', bottom: 0, width: '100%', fontSize: '0.875rem' }}>
                  {img.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Uploaded Videos List */}
      <div className="admin-card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Manage YouTube Videos</h3>
        {videos.length === 0 ? <p>No videos added yet.</p> : (
          <div className="grid grid-cols-3">
            {videos.map((vid) => (
              <div key={vid._id} style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000', padding: '1rem' }}>
                <p style={{ color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{vid.title}</p>
                <a href={vid.url} target="_blank" rel="noreferrer" style={{ color: '#3b82f6', fontSize: '0.85rem', wordBreak: 'break-all' }}>{vid.url}</a>
                <button 
                  onClick={() => handleDeleteVideo(vid._id)}
                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'red', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Uploaded News List */}
      <div className="admin-card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Manage News Photos</h3>
        {news.length === 0 ? <p>No news uploaded yet.</p> : (
          <div className="grid grid-cols-3">
            {news.map((item) => (
              <div key={item._id} style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <img src={item.url} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <button 
                  onClick={() => handleDeleteNews(item._id)}
                  style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'red', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
                >
                  <Trash2 size={16} />
                </button>
                <div style={{ background: 'rgba(0,0,0,0.7)', color: 'white', padding: '0.5rem', position: 'absolute', bottom: 0, width: '100%', fontSize: '0.875rem' }}>
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Membership Applications Section */}
      <div className="admin-card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users size={24} color="var(--accent-color)" />
          Membership Applications
        </h3>
        {memberships.length === 0 ? <p>No applications received yet.</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {memberships.map((member) => (
              <div key={member._id} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary-color)' }}>{member.fullName}</h4>
                    <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)' }}>
                      <strong>Plan:</strong> {member.membershipType?.replace('_', ' ').toUpperCase()} | 
                      <strong> Registered:</strong> {new Date(member.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDeleteMembership(member._id)}
                    className="btn btn-outline"
                    style={{ borderColor: 'red', color: 'red', padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
                
                <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                  <div>
                    <p><strong>Father/Husband Name:</strong> {member.fatherName}</p>
                    <p><strong>DOB:</strong> {member.dob}</p>
                    <p><strong>Gender:</strong> {member.gender}</p>
                    <p><strong>Mobile:</strong> {member.mobile}</p>
                    <p><strong>Email:</strong> {member.email}</p>
                  </div>
                  <div>
                    <p><strong>Aadhaar:</strong> {member.aadhaar}</p>
                    <p><strong>Address:</strong> {member.address}, {member.city}, {member.district}, {member.state} - {member.pincode}</p>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <h5 style={{ marginBottom: '1rem' }}>Uploaded Documents</h5>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {member.photoUrl && (
                      <a href={member.photoUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                        View Photo
                      </a>
                    )}
                    {member.aadhaarFrontUrl && (
                      <a href={member.aadhaarFrontUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                        Aadhaar (Front)
                      </a>
                    )}
                    {member.aadhaarBackUrl && (
                      <a href={member.aadhaarBackUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                        Aadhaar (Back)
                      </a>
                    )}
                    {member.panCardUrl && (
                      <a href={member.panCardUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                        PAN Card
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Admin;
