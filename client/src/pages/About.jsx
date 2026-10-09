import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';

const About = () => {
  const aims = [
    { no: '01', title: 'Human Rights Protection', text: 'Monitor, protect, and promote fundamental human rights guaranteed by the Constitution of India and international treaties.' },
    { no: '02', title: 'Anti-Corruption & Governance', text: 'Counter corruption and maladministration using legal tools like RTI Act 2005, PIL, PMLA reporting, and public campaigns.' },
    { no: '03', title: 'Legal Aid & Access to Justice', text: 'Provide legal literacy, paralegal support, mediation, victim aid, and PIL filing under Legal Services Authorities Act, 1987.' },
    { no: '04', title: 'Social Harmony', text: 'Foster communal harmony, mutual tolerance, peace, and national integration across all religious and regional groups.' },
    { no: '05', title: 'Women & Child Empowerment', text: 'Fight domestic violence, child labor, and human trafficking while driving socio-economic empowerment initiatives.' },
    { no: '06', title: 'Whistleblower Protection', text: 'Offer secure platform frameworks for individuals exposing corruption and maladministration.' },
    { no: '07', title: 'Public Awareness & Media', text: 'Educate public through seminars, digital channels, publications, documentaries, and Nukkad Nataks on civic duties.' },
    { no: '08', title: 'Government Co-operation', text: 'Voluntarily collaborate with government departments, statutory bodies, and law enforcement during times of need.' },
    { no: '09', title: 'Crisis & Disaster Relief', text: 'Ensure swift outreach, rehabilitation, recovery, and rebuilding support during natural or manmade disasters.' },
    { no: '10', title: 'Civic Intervention', text: 'Legally intervene against unlawful or cruel acts, report to competent authorities, and monitor case investigations.' },
    { no: '11', title: 'Weaker Sections Upliftment', text: 'Work extensively for socio-economic development of underprivileged, marginalized, and weaker sections of society.' },
    { no: '12', title: 'Educational Institutions', text: 'Establish and manage educational centers, skill training schools, and vocational institutes for public empowerment.' },
    { no: '13', title: 'Healthcare & Charity', text: 'Operate dispensaries, de-addiction centers, orphanages, old-age homes, and medical facilities for general welfare.' },
    { no: '14', title: 'Cyber Security & Vigilance', text: 'Spread awareness on cybercrime, legal vigilance, public safety, and community security frameworks.' },
    { no: '15', title: 'Environmental Conservation', text: 'Protect trees, water resources, and landscapes, combat global warming and promote public health awareness.' },
    { no: '16', title: 'Animal Rights & Protection', text: 'Serve as a voice for voiceless beings by providing shelter, food, and medical facilities to animals and birds.' },
    { no: '17', title: 'Self-Defense Training', text: 'Teach martial arts and self-defense skills, with special emphasis on empowering women and young children.' },
    { no: '18', title: 'Employment & Bio-Units', text: 'Setup local small-scale manufacturing, biogas plants, and bio-fertilizer production to generate local livelihoods.' },
    { no: '19', title: 'Sports & Youth Fitness', text: 'Promote physical fitness, establish sports academies, and conduct competitions to inspire youth talent.' },
    { no: '20', title: 'Grants, CSR & Donations', text: 'Receive national/international grants & CSR contributions under Schedule VII of Companies Act 2013.' },
    { no: '21', title: 'Sole Utilization of Funds', text: 'Ensure all donations, subscriptions, and aid are utilized solely for promoting foundation objectives.' },
    { no: '22', title: 'Income Tax Compliance', text: 'Maintain charitable character under Sec 2(15) and comply with Sec 11, 12, 12A, 12AB & 80G.' },
    { no: '23', title: 'Non-Profit Character', text: 'Function exclusively for public welfare without commercial profit or distribution of net earnings to members.' },
  ];

  return (
    <div>
      {/* About Hero */}
      <section className="about-hero">
        <div className="container text-center animate-fade-in">
          <span className="hero-badge"><Shield size={16}/> NATIONAL LEVEL NGO</span>
          <h1>About Shield Saviours Foundation</h1>
          <p>Dedicated to upholding human rights, promoting transparency, fighting corruption, and driving socio-economic transformation across India.</p>
        </div>
      </section>

      {/* Who We Are & Compliance */}
      <section className="section section-bg">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="text-orange font-bold uppercase tracking-wide">Who We Are</span>
              <h2 className="section-title text-left mt-2 mb-4">Empowering Society Through Lawful & Democratic Means</h2>
              <p className="mb-4">
                <strong>Shield Saviours Foundation</strong> is established as a national-level, non-governmental, non-profit organization (NGO). The Foundation operates with strict adherence to the Constitution of India, focusing on fundamental rights protection, anti-corruption campaigns, free legal aid, and public welfare.
              </p>
              <p>
                We voluntarily collaborate with government departments, statutory bodies, and law enforcement agencies to assist citizens during emergencies, natural disasters, and administrative distress.
              </p>
            </div>
            
            <div className="compliance-card">
              <h3 className="flex items-center gap-2 mb-6"><Shield size={24} className="text-gold"/> Registrations & Legal Compliance</h3>
              
              <ul className="compliance-list">
                <li><CheckCircle className="icon text-gold" size={20}/> <span><strong>Govt. Registration:</strong> Ministry of Corporate Affairs (Govt. of India) & NITI Aayog</span></li>
                <li><CheckCircle className="icon text-gold" size={20}/> <span><strong>Quality Standard:</strong> ISO 9001:2015 Certified Foundation</span></li>
                <li><CheckCircle className="icon text-gold" size={20}/> <span><strong>Income Tax Status:</strong> Compliant with Sections 11, 12, 12A, 12AB, and 80G of Income Tax Act, 1961</span></li>
                <li><CheckCircle className="icon text-gold" size={20}/> <span><strong>CSR Eligibility:</strong> Schedule VII of Companies Act, 2013 Eligible</span></li>
                <li><CheckCircle className="icon text-gold" size={20}/> <span><strong>Character:</strong> Strictly Non-Profit & Public Welfare NGO</span></li>
              </ul>
              
              <div className="mt-8 text-right">
                <button className="btn btn-primary">JOIN NOW</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 23 Aims & Objectives */}
      <section className="section section-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge-red">Detailed Framework</span>
            <h2 className="section-title mt-4 mb-2">Our 23 Aims & Objectives</h2>
            <p className="text-muted">Complete objective blueprint driving all social, legal, and charitable initiatives of the organization.</p>
          </div>

          <div className="aims-grid">
            {aims.map((aim, index) => (
              <div key={index} className="aim-card animate-fade-in" style={{ animationDelay: `${(index % 6) * 0.1}s` }}>
                <div className="aim-number">{aim.no}</div>
                <h3>{aim.title}</h3>
                <p>{aim.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
