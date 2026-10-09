import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Gavel, Scale, ShieldCheck, HeartHandshake, AlertTriangle, LifeBuoy, FileSignature, Users, Check } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container animate-fade-in">
          <h1>Shield Saviours Foundation</h1>
          <p>Working for Anti-Corruption, Legal Literacy & Human Rights. Registered under Govt. of India & NITI Aayog.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/admin" className="btn btn-primary"><Users size={20} /> Join As Authorized Member</Link>
            <a href="#mission" className="btn btn-secondary"><ShieldCheck size={20} /> Explore Our Mission</a>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <div className="stats-ribbon">
        <div className="container stats-grid">
          <div className="stat-item">
            <h3>28+</h3>
            <p>States Outreach</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Legal & RTI Support</p>
          </div>
          <div className="stat-item">
            <h3>23+</h3>
            <p>Core Objectives</p>
          </div>
          <div className="stat-item">
            <h3>ISO</h3>
            <p>9001:2015 Certified</p>
          </div>
        </div>
      </div>

      {/* Dedicated Section */}
      <section id="mission" className="section section-white">
        <div className="container dedicated-grid">
          <div className="dedicated-img-wrapper animate-fade-in">
            <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070" alt="Team hands together" />
            <div className="dedicated-badge">
              <CheckCircle2 size={24} color="#000" /> NITI Aayog Registered
            </div>
          </div>
          <div className="dedicated-content">
            <span className="badge-blue">Who We Are</span>
            <h2>Dedicated to Justice, Transparency & Welfare</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Established as a national-level, non-governmental, non-profit organization operating within constitutional framework to safeguard citizen rights and foster social harmony.
            </p>
            <div className="dedicated-features">
              <div className="feature-item">
                <Gavel size={32} className="feature-icon" />
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>RTI & PIL Activism</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Fighting Maladministration</p>
                </div>
              </div>
              <div className="feature-item">
                <HeartHandshake size={32} className="feature-icon-green" />
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Legal Aid Access</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Pro-Bono Services</p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: '3rem' }}>
              <button className="btn btn-primary"><Users size={20} /> JOIN NOW</button>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="section section-bg">
        <div className="container">
          <span style={{ display: 'block', textAlign: 'center', color: '#dc2626', fontWeight: 700, marginBottom: '0.5rem' }}>Core Pillars</span>
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Key Aims & Objectives</h2>
          <p className="section-subtitle">Our multi-dimensional social impact initiatives across the country</p>

          <div className="obj-grid">
            <div className="obj-card">
              <div className="obj-icon" style={{ background: '#ec4899' }}><ShieldCheck size={32} /></div>
              <h3>Human Rights Protection</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Monitoring, protecting, and promoting rights guaranteed by the Constitution of India and international treaties.</p>
            </div>
            <div className="obj-card">
              <div className="obj-icon" style={{ background: '#7c3aed' }}><Scale size={32} /></div>
              <h3>Anti-Corruption & RTI</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Exposing bribery & corruption through lawful tools including RTI Act 2005, PILs, and PMLA legal reporting.</p>
            </div>
            <div className="obj-card">
              <div className="obj-icon" style={{ background: '#4f46e5' }}><Gavel size={32} /></div>
              <h3>Legal Aid & Justice</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Providing paralegal support, victim assistance, legal literacy, and PIL representation before tribunals & courts.</p>
            </div>
            <div className="obj-card">
              <div className="obj-icon" style={{ background: '#f59e0b' }}><HeartHandshake size={32} /></div>
              <h3>Women & Child Protection</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Combating domestic violence, child labor, and human trafficking while establishing rescue & rehabilitation centers.</p>
            </div>
            <div className="obj-card">
              <div className="obj-icon" style={{ background: '#06b6d4' }}><AlertTriangle size={32} /></div>
              <h3>Whistleblower Framework</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Offering legal advocacy and secure protection frameworks for whistleblowers exposing systemic corruption.</p>
            </div>
            <div className="obj-card">
              <div className="obj-icon" style={{ background: '#ea580c' }}><LifeBuoy size={32} /></div>
              <h3>Disaster Relief</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Rapid crisis response, rehabilitation, and resource distribution during natural calamities & national emergencies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Membership Section */}
      <section className="section section-white">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{ background: 'var(--accent-light)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700 }}>Membership Categories</span>
          </div>
          <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Become an Authorized Representative</h2>
          <p className="section-subtitle">Select your participation level and contribute to our national welfare mission</p>

          <div className="price-grid">
            <div className="price-card">
              <h3 className="price-title">General Member</h3>
              <div className="price-amount">₹1,100</div>
              <p className="price-desc">Entry authorization & official member identity card.</p>
              <ul className="price-features">
                <li><Check size={18} /> Official Authorized ID Card</li>
                <li><Check size={18} /> Foundation Code of Conduct</li>
                <li><Check size={18} /> Legal Support Helpline</li>
              </ul>
              <button className="btn btn-outline" style={{ width: '100%' }}>Select Plan</button>
            </div>

            <div className="price-card">
              <h3 className="price-title">Executive Member</h3>
              <div className="price-amount">₹5,100</div>
              <p className="price-desc">For active leaders directing district-level welfare teams.</p>
              <ul className="price-features">
                <li><Check size={18} /> District Team Coordination</li>
                <li><Check size={18} /> Official Executive Certificate</li>
                <li><Check size={18} /> Event Leadership Authority</li>
              </ul>
              <button className="btn btn-outline" style={{ width: '100%' }}>Select Plan</button>
            </div>

            <div className="price-card popular">
              <div className="popular-badge">Popular</div>
              <h3 className="price-title">State Committee</h3>
              <div className="price-amount">₹11,000</div>
              <p className="price-desc">State level governance & team formation authority.</p>
              <ul className="price-features">
                <li><Check size={18} /> State Vice-President/Officer Role</li>
                <li><Check size={18} /> Authorization Letter & Seal</li>
                <li><Check size={18} /> State Level Team Induction</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%' }}>Join State Team</button>
            </div>

            <div className="price-card">
              <h3 className="price-title">Core Committee</h3>
              <div className="price-amount">₹21,000</div>
              <p className="price-desc">National governing body strategic leadership role.</p>
              <ul className="price-features">
                <li><Check size={18} /> National Policy Decision Rights</li>
                <li><Check size={18} /> Direct CSR Project Oversight</li>
                <li><Check size={18} /> High Level Delegation</li>
              </ul>
              <button className="btn btn-outline" style={{ width: '100%' }}>Select Plan</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Block */}
      <div className="cta-banner">
        <div className="container">
          <h2>Ready to Make a Real Impact?</h2>
          <p>Fill out the official membership form today, submit your oath, and start serving the nation under lawful authority.</p>
          <button className="btn btn-primary"><FileSignature size={20} /> Fill Membership Form</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
