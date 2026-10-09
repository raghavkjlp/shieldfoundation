import React, { useState, useRef } from 'react';
import { Shield, User, MapPin, FileText, Upload, Calendar, Phone, Mail, CheckSquare } from 'lucide-react';

const Membership = () => {
  const [formData, setFormData] = useState({
    membershipType: '',
    fullName: '',
    fatherName: '',
    dob: '',
    gender: '',
    mobile: '',
    email: '',
    aadhaar: '',
    city: '',
    pincode: '',
    district: '',
    state: '',
    address: '',
    declaration: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const photoRef = useRef(null);
  const aadhaarFrontRef = useRef(null);
  const aadhaarBackRef = useRef(null);
  const panCardRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = new FormData();
      
      // Append text fields
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      // Append files
      if (photoRef.current.files[0]) data.append('photo', photoRef.current.files[0]);
      if (aadhaarFrontRef.current.files[0]) data.append('aadhaarFront', aadhaarFrontRef.current.files[0]);
      if (aadhaarBackRef.current.files[0]) data.append('aadhaarBack', aadhaarBackRef.current.files[0]);
      if (panCardRef.current.files[0]) data.append('panCard', panCardRef.current.files[0]);

      const response = await fetch('https://shieldfoundation.onrender.com/api/memberships', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      alert('Membership form submitted successfully!');
      
      // Reset form
      setFormData({
        membershipType: '',
        fullName: '',
        fatherName: '',
        dob: '',
        gender: '',
        mobile: '',
        email: '',
        aadhaar: '',
        city: '',
        pincode: '',
        district: '',
        state: '',
        address: '',
        declaration: false
      });
      if (photoRef.current) photoRef.current.value = '';
      if (aadhaarFrontRef.current) aadhaarFrontRef.current.value = '';
      if (aadhaarBackRef.current) aadhaarBackRef.current.value = '';
      if (panCardRef.current) panCardRef.current.value = '';

    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting the form. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section section-bg">
      <div className="container">
        <div className="membership-form-wrapper" style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          <div className="membership-header" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', padding: '3rem 2rem', color: 'white', textAlign: 'center' }}>
            <Shield size={48} style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white' }}>Membership Registration Form</h2>
            <p style={{ opacity: 0.9 }}>Shield Saviours Foundation (Regd. Govt. of India & NITI Aayog)</p>
          </div>
          
          {error && (
            <div style={{ padding: '1rem', background: '#fee2e2', color: '#991b1b', textAlign: 'center', margin: '1rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ padding: '3rem 2rem' }}>
            {/* Membership Type */}
            <div className="form-section">
              <h3 className="form-section-title"><User size={20} color="var(--blue-ribbon)" /> Select Membership Type *</h3>
              <div className="form-group">
                <select name="membershipType" value={formData.membershipType} onChange={handleChange} required className="form-control">
                  <option value="">-- Select Membership Plan --</option>
                  <option value="member">Member - ₹1,100</option>
                  <option value="executive">Executive Member - ₹5,100</option>
                  <option value="state_committee">State Committee Member - ₹11,000</option>
                  <option value="core_committee">Core Committee Member - ₹21,000</option>
                </select>
              </div>
            </div>

            {/* Personal Details */}
            <div className="form-section">
              <h3 className="form-section-title"><User size={20} color="var(--accent-color)" /> Personal Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Applicant's Full Name" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Father's / Husband's Name *</label>
                  <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required placeholder="S/o or W/o Name" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                  <label>Gender *</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required className="form-control">
                    <option value="">-- Select Gender --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact & ID Details */}
            <div className="form-section">
              <h3 className="form-section-title"><User size={20} color="var(--accent-light)" /> Contact & ID Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="10-digit Mobile Number" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="example@mail.com" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Aadhaar Card Number *</label>
                  <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} required placeholder="12-digit Aadhaar Number" className="form-control" />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="City Name" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required placeholder="6-digit Pincode" className="form-control" />
                </div>
                <div className="form-group">
                  <label>District *</label>
                  <input type="text" name="district" value={formData.district} onChange={handleChange} required placeholder="District Name" className="form-control" />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="State Name" className="form-control" />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label>Full Address *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="House No, Street, Landmark" className="form-control" />
                </div>
              </div>
            </div>

            {/* Upload Required Documents */}
            <div className="form-section">
              <h3 className="form-section-title"><Upload size={20} color="var(--accent-light)" /> Upload Required Documents</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Passport Size Photo *</label>
                  <input type="file" ref={photoRef} required className="form-control" accept="image/*" />
                  <small style={{ color: 'var(--text-muted)' }}>JPG, PNG or WebP (Max 2MB)</small>
                </div>
                <div className="form-group">
                  <label>Aadhaar Card (Front Side) *</label>
                  <input type="file" ref={aadhaarFrontRef} required className="form-control" accept="image/*,.pdf" />
                  <small style={{ color: 'var(--text-muted)' }}>JPG, PNG or PDF (Max 4MB)</small>
                </div>
                <div className="form-group">
                  <label>Aadhaar Card (Back Side) *</label>
                  <input type="file" ref={aadhaarBackRef} required className="form-control" accept="image/*,.pdf" />
                  <small style={{ color: 'var(--text-muted)' }}>JPG, PNG or PDF (Max 4MB)</small>
                </div>
                <div className="form-group">
                  <label>PAN Card *</label>
                  <input type="file" ref={panCardRef} required className="form-control" accept="image/*,.pdf" />
                  <small style={{ color: 'var(--text-muted)' }}>JPG, PNG or PDF (Max 4MB)</small>
                </div>
              </div>
            </div>

            <div className="form-group declaration">
              <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} required style={{ marginTop: '0.3rem' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  I hereby declare that all provided information is accurate. I agree to abide by the constitution, code of conduct, and oath of Shield Saviours Foundation.
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ width: '100%', fontSize: '1.2rem', padding: '1rem', marginTop: '2rem', opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Membership;
