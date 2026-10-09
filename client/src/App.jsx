import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Sun, Phone, MapPin, FileText, Building, Menu, X } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Interviews from './pages/Interviews';
import News from './pages/News';
import Admin from './pages/Admin';
import Membership from './pages/Membership';

const TopBar = () => (
  <div className="top-bar">
    <div className="container">
      <div className="top-bar-left">
        <div className="top-bar-item">
          <Shield size={16} />
          <span>Regd. Govt. of India & NITI Aayog</span>
        </div>
        <div className="top-bar-item">
          <Sun size={16} />
          <span>ISO 9001:2015 Certified</span>
        </div>
      </div>
      <div className="top-bar-right">
        <div className="top-bar-item">
          <Phone size={16} />
          <span>+91 82644 65684</span>
        </div>
        <div className="top-bar-item">
          <MapPin size={16} />
          <span>Patiala, Punjab</span>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path) => location.pathname === path ? { color: 'var(--accent-color)' } : {};

  return (
    <nav className="navbar">
      <div className="container" style={{ position: 'relative' }}>
        <Link to="/" className="navbar-brand">
          <Shield size={32} color="var(--accent-color)" />
          <span>SHIELD SAVIOURS</span>
        </Link>
        <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none', cursor: 'pointer', color: 'var(--primary-color)' }}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link style={isActive('/')} to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link style={isActive('/about')} to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link style={isActive('/news')} to="/news" onClick={() => setIsOpen(false)}>News</Link>
          <Link style={isActive('/gallery')} to="/gallery" onClick={() => setIsOpen(false)}>Photo Gallery</Link>
          <Link style={isActive('/interviews')} to="/interviews" onClick={() => setIsOpen(false)}>Interviews</Link>
          <Link style={{ ...isActive('/membership'), color: 'var(--accent-color)', fontWeight: 'bold' }} to="/membership" onClick={() => setIsOpen(false)}>Membership Form</Link>
        </div>
      </div>
    </nav>
  );
};

const NavbarWrapper = () => <Navbar />;

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <Shield size={32} color="var(--accent-color)" />
            <span>SHIELD SAVIOURS</span>
          </div>
          <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
            Shield Saviours Foundation is registered under Ministry of Corporate Affairs (Govt. of India) & NITI Aayog. ISO 9001:2015 Certified Organization working for Anti-Corruption, Legal Literacy & Human Rights.
          </p>
        </div>
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/news">News & Updates</Link>
            <Link to="/gallery">Photo Gallery</Link>
            <Link to="/interviews">Our Documents</Link>
            <Link to="/membership">Apply Online</Link>
            <Link to="/admin">Admin Login</Link>
          </div>
        </div>
        <div>
          <h3 className="footer-title">Tax Exemption & CSR</h3>
          <div className="footer-links" style={{ gap: '1rem' }}>
            <div className="footer-contact-item" style={{ marginBottom: 0 }}>
              <FileText size={18} />
              <span>Sec 12A & 80G Compliant</span>
            </div>
            <div className="footer-contact-item" style={{ marginBottom: 0 }}>
              <FileText size={18} color="#16a34a" />
              <span>Sec 2(15) Income Tax Act 1961</span>
            </div>
            <div className="footer-contact-item" style={{ marginBottom: 0 }}>
              <Building size={18} color="#0088b9" />
              <span>Schedule VII CSR Eligible</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="footer-title">Head Office</h3>
          <div className="footer-contact-item">
            <MapPin size={20} />
            <span>H. No. 20, St. No 3, Gurunanak Nagar, Jhill Road, Tripuri, Patiala-147001 (Punjab)</span>
          </div>
          <div className="footer-contact-item">
            <Phone size={20} />
            <span>+91 82644 65684</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopBar />
        <NavbarWrapper />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/membership" element={<Membership />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
