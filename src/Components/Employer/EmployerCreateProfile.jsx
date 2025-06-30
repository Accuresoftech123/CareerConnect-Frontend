import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import facebook from "../../Images/facebook.svg";
import instagram from "../../Images/instagram.svg";
import linkedin from "../../Images/linkedin.svg";
import x from "../../Images/x.svg";
import user from "../../Images/user.svg";
import UploadCompanyImage from "../../Images/UploadCompanyImage.svg";
import camera from "../../Images/camera.svg";
import profileIcon from "../../Images/profileIcon.svg";
import companyBuilding from "../../Images/companyBuilding.svg";
import plusIcon from "../../Images/plusIcon.svg";
import "../../Styles/Employer/EmployerCreateProfilestyle.css";

const EmployerCreateProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNextStep = (e) => {
    e.preventDefault();
    const companyName = document.getElementById("companyName").value.trim();
    const email = document.getElementById("emailAddress").value.trim();
    if (!companyName || !email) {
      alert("Please complete Company Name and Email Address.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/EmployerDashboard");
  };

  return (
    <div className="ecp-container">
      {/* Header */}
      <header className="ecp-header">
        <div className="ecp-logo">
          <span>Career</span> Connect
        </div>
        <nav className="ecp-nav-links">
          <Link to="/candidates">Candidates</Link>
          <Link to="/companies">Companies</Link>
          <Link to="#" className="ecp-profile-link">
            <img src={profileIcon} alt="Profile" className="ecp-profile-icon" />
            My Profile
          </Link>
        </nav>
      </header>

      {/* Main */}
      <main className="ecp-main">
        {/* Progress Bar */}
        <section className="ecp-top-section">
          <h1>Create your profile</h1>
          <p>
            Start your journey towards the right job. Fill in your details so
            employers can find you easily.
          </p>
          <div className="ecp-progress-container">
            <div className="ecp-progress-line">
              <div
                className="ecp-progress-fill"
                style={{ width: step === 2 ? "100%" : "50%" }}
              ></div>
            </div>
            <div className="ecp-progress-steps">
              <div className={`ecp-step-item ${step >= 1 ? "active" : ""}`}>
                <span>1</span>
                <p>Company Info</p>
              </div>
              <div className={`ecp-step-item ${step === 2 ? "active" : ""}`}>
                <span>2</span>
                <p>Recruiter Info</p>
              </div>
            </div>
          </div>
        </section>

        <form className="ecp-form" onSubmit={handleSubmit}>
          {/* Step 1 - Company Info */}
          {step === 1 && (
            <section className="ecp-card">
              <header className="ecp-card-header">
                <img
                  src={companyBuilding}
                  alt="Company"
                  className="ecp-card-icon"
                />
                <h3>Companies Information</h3>
              </header>
              <div className="ecp-card-body">
                <div className="ecp-logo-upload">
                  <img
                    src={UploadCompanyImage}
                    alt="Upload"
                    className="ecp-upload-image"
                  />
                  <img src={camera} alt="Camera" className="ecp-camera-icon" />
                </div>

                <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-full">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                      type="text"
                      id="companyName"
                      placeholder="Enter company name"
                    />
                  </div>
                </div>

                <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                      type="email"
                      id="emailAddress"
                      placeholder="Enter company Email-ID"
                    />
                  </div>
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="website">Website</label>
                    <input
                      type="url"
                      id="website"
                      placeholder="Enter company website"
                    />
                  </div>
                </div>

                <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="industry">Industry</label>
                    <select id="industry">
                      <option value="">Select industry</option>
                    </select>
                  </div>
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="companySize">Company Size</label>
                    <select id="companySize">
                      <option value="">Select company size</option>
                    </select>
                  </div>
                </div>

                <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-full">
                    <label>Location</label>
                    <div className="ecp-location-group">
                      <input type="text" placeholder="Enter your City" />
                      <select>
                        <option value="">Select your state</option>
                      </select>
                      <select>
                        <option value="">Select your Country</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="ecp-form-row">
                  <button type="button" className="ecp-add-location">
                    <img src={plusIcon} alt="" /> Add another location
                  </button>
                </div>

                <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-full">
                    <label htmlFor="aboutCompany">About company</label>
                    <textarea
                      id="aboutCompany"
                      rows="4"
                      placeholder="Enter brief introduction about company..."
                    ></textarea>
                  </div>
                </div>

                <div className="ecp-form-row ecp-buttons-row">
                  <button type="button" className="ecp-btn-secondary">
                    Save as draft
                  </button>
                  <button
                    type="button"
                    className="ecp-btn-primary"
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Step 2 - Recruiter Info */}
          {step === 2 && (
            <section className="ecp-card">
              <header className="ecp-card-header">
                <img src={user} alt="Recruiter" className="ecp-card-icon" />
                <h3>Recruiter Information</h3>
              </header>
              <div className="ecp-card-body">
                <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-full">
                    <label htmlFor="recruiterName">Name</label>
                    <input
                      type="text"
                      id="recruiterName"
                      placeholder="Enter your full Name"
                    />
                  </div>
                </div>
                <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="recruiterEmail">Email Address</label>
                    <input
                      type="email"
                      id="recruiterEmail"
                      placeholder="Enter your Email Id"
                    />
                  </div>
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      placeholder="Enter Mobile number for candidates communication"
                    />
                  </div>
                </div>
              </div>

              <div className="ecp-form-row ecp-buttons-row">
                <button type="button" className="ecp-btn-secondary">
                  Save as draft
                </button>
                <button
                  type="button"
                  className="ecp-btn-secondary"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button type="submit" className="ecp-btn-primary">
                  Confirm
                </button>
              </div>
            </section>
          )}
        </form>
      </main>

      {/* Footer */}
      <footer className="ecp-footer">
        <div className="ecp-footer-grid">
          <div>
            <h6 className="ecp-logo">
              <span>Career</span> Connect
            </h6>
            <p>Connecting talented professionals with amazing opportunities</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>Dashboard</li>
              <li>Companies</li>
              <li>Candidates</li>
              <li>Search</li>
            </ul>
          </div>
          <div>
            <h4>For Employers</h4>
            <ul>
              <li>Post a job</li>
              <li>Browse candidates</li>
              <li>Subscription plans</li>
              <li>Recruitment solutions</li>
            </ul>
          </div>
          <div>
            <h4>Follow Us on</h4>
            <div className="ecp-social-icons">
              <span>
                <img src={facebook} alt="f" />
              </span>
              <span>
                <img src={instagram} alt="i" />
              </span>
              <span>
                <img src={linkedin} alt="l" />
              </span>
              <span>
                <img src={x} alt="x" />
              </span>
            </div>
          </div>
        </div>
        <p className="ecp-footer-note">
          @2025 AccureSofTech. All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default EmployerCreateProfile;
