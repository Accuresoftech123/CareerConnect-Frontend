import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import vector from "../../Images/vector.svg";
import { useNavigate } from "react-router-dom";

import "../../Styles/Employer/EmployerCreateProfilestyle.css";

const EmployerCreateProfile = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    navigate("/EmployerDashboard");
  };

  return (
    <div className="employer_CreateProfile-container">
      {/* Header */}
      <header class="employer_CreateProfile-navbar">
        <div className="employer_CreateProfile-logo">
          <span>Career</span> Connect
        </div>
        <nav class="employer_CreateProfile-nav-links">
          <a href="#">Jobs</a>
          <a href="#">Companies</a>
          <a href="#" class="employer_CreateProfile-profile-link">
            <span>
              <img
                src={profileIcon}
                alt="profileIcon"
                class="employer_CreateProfile-Upload-profileIcon"
              />
              My Profile
            </span>
          </a>
        </nav>
      </header>

      {/* Company Profile */}

      <main class="employer_CreateProfile-middle-container">
        <section class="employer_CreateProfile-profile-header">
          <h1>Create your profile</h1>
          <p>
            Start your journey towards the right job. Fill in your details so
            employers can find you easily.
          </p>
          <div class="employer_CreateProfile-progress-bar">
            <div class="employer_CreateProfile-step active">
              <span class="employer_CreateProfile-step-number">1</span>
              <span class="employer_CreateProfile-step-text">Company Info</span>
            </div>
            <div class="employer_CreateProfile-step">
              <span class="employer_CreateProfile-step-number">2</span>
              <span class="employer_CreateProfile-step-text">
                Recruiter Info
              </span>
            </div>
          </div>
        </section>

        <div class="employer_CreateProfile-card-company-info-section">
          <div class="employer_CreateProfile-card-header">
            <span>
              <img
                src={companyBuilding}
                alt="companyBuilding"
                class="employer_CreateProfile-companyBuilding"
              />
            </span>
            <h3>Companies Information</h3>
          </div>
          <div class="employer_CreateProfile-card-body">
            <div class="employer_CreateProfile-company-logo-upload">
              <span>
                <img
                  src={UploadCompanyImage}
                  alt="UploadCompanyProfile"
                  class="employer_CreateProfile-UploadCompanyProfile-image"
                />
              </span>

              <span>
                <img
                  src={camera}
                  alt="Camera"
                  class="employer_CreateProfile-Upload-Camera-image"
                />
              </span>
            </div>

            <div class="employer_CreateProfile-form-row">
              <div class="employer_CreateProfile-form-group full-width">
                <label for="employer_CreateProfile-companyName">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div class="employer_CreateProfile-form-row">
              <div class="employer_CreateProfile-form-group-half-width">
                <label for="emailAddress">Email Address</label>
                <input
                  type="email"
                  id="emailAddress"
                  placeholder="Enter your Email-ID"
                />
              </div>
              <div class="employer_CreateProfile-form-group-half-width">
                <label for="website">Website</label>
                <input
                  type="url"
                  id="website"
                  placeholder="Enter company's website URL"
                />
              </div>
            </div>

            <div class="employer_CreateProfile-form-row">
              <div class="employer_CreateProfile-form-group-half-width">
                <label for="industry">Industry</label>
                <select id="industry">
                  <option value="">Select industry company works</option>
                </select>
              </div>
              <div class="employer_CreateProfile-form-group-half-width">
                <label for="companySize">Company Size</label>
                <select id="companySize">
                  <option value="">Select company size</option>
                </select>
              </div>
            </div>

            <div class="employer_CreateProfile-form-row">
              <div class="employer_CreateProfile-form-group-full-width">
                <label>Company Location</label>
                <div class="employer_CreateProfile-location-inputs">
                  <input type="text" placeholder="Enter your city" />
                  <select>
                    <option value="">
                      Select your state{" "}
                      <span>
                        <img
                          src={vector}
                          alt="vector"
                          class="employer_CreateProfile-vector"
                        />
                      </span>
                    </option>
                  </select>
                  <select>
                    <option value="">Select your country</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="employer_CreateProfile-form-row">
              <a href="#" class="employer_CreateProfile-add-location">
                <span>
                  <img src={plusIcon} alt="plusIcon" />
                  Add another location
                </span>
              </a>
            </div>

            <div class="employer_CreateProfile-form-row">
              <div class="employer_CreateProfile-form-group-full-width">
                <label for="employer_CreateProfile-aboutCompany">
                  About company
                </label>
                <textarea
                  id="aboutCompany"
                  rows="5"
                  placeholder="Enter brief introduction about company to attract candidates..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Recruiter Information */}

        <section class="employer_CreateProfile-card-recruiter-info-section">
          <div class="employer_CreateProfile-card-header">
            <img
              src={user}
              alt="User"
              class="icon-img"
              style={{ color: "842cc0" }}
            />

            <h3>Recruiter Information</h3>
          </div>
          <div class="employer_CreateProfile-card-body">
            <div class="employer_CreateProfile-form-row">
              <div class="employer_CreateProfile-form-group full-width">
                <label for="recruiterName">Name</label>
                <input
                  type="text"
                  id="recruiterName"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div class="employer_CreateProfile-form-row">
              <div class="employer_CreateProfile-form-group-half-width">
                <label for="recruiterEmail">Email Address</label>
                <input
                  type="email"
                  id="recruiterEmail"
                  placeholder="Enter your Email-ID"
                />
              </div>
              <div class="employer_CreateProfile-form-group-half-width">
                <label for="mobileNumber">Mobile number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  placeholder="Enter mobile number for candidates communication"
                />
              </div>
            </div>
          </div>
        </section>

        <div class="employer_CreateProfile-form-row">
          <div class="employer_CreateProfile-form-group-half-width">
            <button class="employer_CreateProfile-btn-secondary">
              Save as draft
            </button>
          </div>
          <div class="employer_CreateProfile-form-group-half-width">
            <button
              class="employer_CreateProfile-btn-primary"
              onClick={handleSubmit}
              type="submit"
            >
              Confirm
            </button>
          </div>
        </div>
      </main>

      {/* footer */}

      <footer className="employer_CreateProfile-footer">
        <div className="employer_CreateProfile-footer-grid">
          <div>
            <h6 className="employer_CreateProfile-logo">
              <span>Career</span> Connect
            </h6>
            <p>Connecting talented professionals with amazing opportunities</p>
          </div>
          <div>
            <h4>For Job Seekers</h4>
            <ul>
              <li>Browse jobs</li>
              <li>Companies</li>
              <li>Career advice</li>
              <li>Premium</li>
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
            <div className="employer_CreateProfile-social-icons">
              <span>
                <img src={facebook} alt="Facebook" />
              </span>
              <span>
                <img src={instagram} alt="Instagram" />
              </span>
              <span>
                <img src={linkedin} alt="LinkedIn" />
              </span>
              <span>
                <img src={x} alt="Twitter" />
              </span>
            </div>
          </div>
        </div>

        <p className="employer_CreateProfile-footer-note">
          @2025 AccureSofTech. All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default EmployerCreateProfile;
