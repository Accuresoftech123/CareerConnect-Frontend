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
import axios from "axios";
import "../../Styles/Employer/EmployerCreateProfilestyle.css";
import axiosInstance from "../../axiosInstance";
import { baseURL } from "../../axiosInstance"; // Import your axios instance

//const url = "http://localhost:9191/recruitersProfile";
const EmployerCreateProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    companyName: "",
    companyProfile: {
     hrName: "",
      companyEmail: "",
      companySize: "",
      img: "",
      website: "",
      industryType: "",
      about: "",
      foundingYear: 0,
      hrContactEmail: "",
      hrContactMobileNumber: "",
    },
    companyLocations: [
      {
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      },
    ],
  });

  const handleChange = (e, group, index = 0) => {
    const { name, value } = e.target;

    if (!group) {
      // Top-level field
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (group === "companyProfile") {
      setFormData((prev) => ({
        ...prev,
        companyProfile: {
          ...prev.companyProfile,
          [name]: value,
        },
      }));
    } else if (group === "companyLocations") {
      const updatedLocations = [...formData.companyLocations];
      updatedLocations[index][name] = value;
      setFormData((prev) => ({
        ...prev,
        companyLocations: updatedLocations,
      }));
    }
  };
  const handleNextStep = (e) => {
    e.preventDefault();
   // const companyName = document.getElementById("companyName").value.trim();
    const email = document.getElementById("companyEmail").value.trim();
    // if (!companyName || !email) {
    //   alert("Please complete Company Name and Email Address.");
    //   return;
    // }
    setStep(2);
  };

  // Handle form submission
  // This function will be called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowVerificationPopup(true);
    const recruiterId = localStorage.getItem("recruiterId");

    try {
      const payload = {
        ...formData,
        recruiterId: parseInt(recruiterId),
      };

      const multipartFormData = new FormData();
      multipartFormData.append(
        "profileDto",
        new Blob([JSON.stringify(payload)], {
          type: "application/json",
        })
      );

      if (imageFile) {
        multipartFormData.append("image", imageFile);
      }

      const response = await axiosInstance.post(
        `/api/recruiters/profile/create/${recruiterId}`,
        multipartFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        if (data.success) {
          alert("Recruiter profile created successfully!");
          setIsVerified(true);
          navigate("/EmployerHome/Employer-Dashboard");
        } else {
          alert("Error: " + data.message);
        }
      }
    } catch (error) {
      console.error("Error creating recruiter profile", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Save the raw file
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          companyProfile: {
            ...prev.companyProfile,
            img: reader.result, // For preview only
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveLocation = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      companyLocations: prev.companyLocations.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
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
            job seekers can find you easily.
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
                  {/* Preview uploaded image or default */}
                  <img
                    src={formData.companyProfile.img || UploadCompanyImage}
                    alt="Upload"
                    className="ecp-upload-image"
                  />

                  {/* Camera icon as upload trigger */}
                  <label htmlFor="companyImageInput">
                    <img
                      src={camera}
                      alt="Camera"
                      className="ecp-camera-icon"
                    />
                  </label>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="companyImageInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>

                {/* <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-full">
                    <label htmlFor="companyName">Company Name</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      placeholder="Enter company name"
                      value={formData.companyProfile.companyName}
                      onChange={(e) => handleChange(e, "companyProfile")}
                    />
                  </div>
                </div> */}

                <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                      type="email"
                      id="companyEmail"
                      name="companyEmail"
                      placeholder="Enter company Email-ID"
                      value={formData.companyProfile.companyEmail}
                      onChange={(e) => handleChange(e, "companyProfile")}
                    />
                  </div>
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="website">Website</label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      placeholder="Enter company website"
                      value={formData.companyProfile.website}
                      onChange={(e) => handleChange(e, "companyProfile")}
                    />
                  </div>
                </div>

                <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="industry">Industry</label>
                    <select
                      id="industry"
                      name="industryType"
                      value={formData.companyProfile.industryType}
                      onChange={(e) => handleChange(e, "companyProfile")}
                    >
                      <option value="Select industry">Select industry</option>
                      <option value="IT Services & consulting">
                        IT Services & consulting
                      </option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="BPO">BPO</option>
                      <option value="Insurance">Insurance</option>
                    </select>
                  </div>
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="companySize">Company Size</label>
                    <select
                      id="companySize"
                      name="companySize"
                      value={formData.companyProfile.companySize}
                      onChange={(e) => handleChange(e, "companyProfile")}
                    >
                      <option value="Select company size">
                        Select company size
                      </option>
                      <option value="0-10">0-10</option>
                      <option value="0-50">0-50</option>
                      <option value="0-200">0-200</option>
                      <option value="0-500">0-500</option>
                    </select>
                  </div>
                </div>

                {formData.companyLocations.map((location, index) => (
                  <div className="ecp-form-row" key={index}>
                    <div className="ecp-input-group ecp-full">
                      <label>
                        Location{" "}
                        {formData.companyLocations.length > 1 ? index + 1 : ""}
                      </label>

                      {/* State & Country */}
                      <div className="ecp-location-group">
                        <select
                          name="state"
                          value={location.state}
                          onChange={(e) =>
                            handleChange(e, "companyLocations", index)
                          }
                        >
                          <option value="">Select your state</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi">Delhi</option>
                          <option value="MP">MP</option>
                        </select>

                        <select
                          name="country"
                          value={location.country}
                          onChange={(e) =>
                            handleChange(e, "companyLocations", index)
                          }
                        >
                          <option value="">Select your country</option>
                          <option value="India">India</option>
                          <option value="Russia">Russia</option>
                        </select>
                      </div>

                      {/* City & Postal Code */}
                      <div
                        className="ecp-location-group"
                        style={{ paddingTop: "1rem" }}
                      >
                        <input
                          type="text"
                          name="city"
                          placeholder="Enter city"
                          value={location.city}
                          onChange={(e) =>
                            handleChange(e, "companyLocations", index)
                          }
                        />
                        <input
                          type="text"
                          name="postalCode"
                          placeholder="Enter postal code"
                          value={location.postalCode}
                          onChange={(e) =>
                            handleChange(e, "companyLocations", index)
                          }
                        />
                      </div>

                      {/* Full Address */}
                      <div
                        className="ecp-location-group"
                        style={{ paddingTop: "1rem" }}
                      >
                        <input
                          type="text"
                          name="address"
                          placeholder="Enter full address"
                          value={location.address}
                          onChange={(e) =>
                            handleChange(e, "companyLocations", index)
                          }
                          className="ecp-full-width"
                        />
                      </div>
                      {formData.companyLocations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLocation(index)}
                          className="ecp-remove-location"
                          style={{
                            marginTop: "1rem",
                            color: "#fff",
                            backgroundColor: "#b153e5",
                            border: "none",
                            borderRadius: "4px",
                            padding: "7px",
                          }}
                        >
                          Remove Location
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add Another Location Button */}
                <div className="ecp-form-row">
                  <button
                    type="button"
                    className="ecp-add-location"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        companyLocations: [
                          ...prev.companyLocations,
                          {
                            state: "",
                            country: "",
                            city: "",
                            postalCode: "",
                            address: "",
                          },
                        ],
                      }))
                    }
                  >
                    <img src={plusIcon} alt="" /> Add another location
                  </button>
                </div>

                <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-full">
                    <label htmlFor="aboutCompany">About company</label>
                    <textarea
                      id="aboutCompany"
                      name="about"
                      rows="4"
                      placeholder="Enter brief introduction about company..."
                      value={formData.companyProfile.about}
                      onChange={(e) => handleChange(e, "companyProfile")}
                    ></textarea>
                  </div>
                </div>

                <div className="ecp-form-row ecp-buttons-row">
                  {/* <button type="button" className="ecp-btn-secondary">
                    Save as draft
                  </button> */}
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
                    <label htmlFor="recruiterName">Recruiter Name</label>
                    <input
                      type="text"
                      id="recruiterName"
                      placeholder="Enter your full Name"
                      name="hrName"
                      value={formData.companyProfile.hrName}
                      onChange={(e) => handleChange(e, "companyProfile")}
                    />
                  </div>
                </div>
                <div className="ecp-form-row">
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="recruiterEmail">
                      Recruiter Email Address
                    </label>
                    <input
                      type="email"
                      id="hrContactEmail"
                      name="hrContactEmail"
                      placeholder="Enter company Email-ID"
                      value={formData.companyProfile.hrContactEmail}
                      onChange={(e) => handleChange(e, "companyProfile")}
                    />
                  </div>
                  <div className="ecp-input-group ecp-half">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input
                      type="tel"
                      id="hrContactMobileNumber"
                      name="hrContactMobileNumber"
                      placeholder="Enter Mobile number for candidates communication"
                      value={formData.companyProfile.hrContactMobileNumber}
                      onChange={(e) => handleChange(e, "companyProfile")}
                    />
                  </div>
                </div>
              </div>

              <div className="ecp-form-row ecp-buttons-row">
                {/* <button type="button" className="ecp-btn-secondary">
                  Save as draft
                </button> */}
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
