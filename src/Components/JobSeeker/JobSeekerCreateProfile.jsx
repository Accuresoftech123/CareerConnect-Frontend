import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import facebook from "../../Images/facebook.svg";
import instagram from "../../Images/instagram.svg";
import linkedinIcon from "../../Images/linkedin.svg";
import x from "../../Images/x.svg";
import Profile from "../../Images/Profile.svg";
import user from "../../Images/user.svg";
import Camera1 from "../../Images/Camera1.svg";
import ResumeProfile from "../../Images/ResumeProfile.svg";
import DropResume from "../../Images/DropResume.svg";
import CameraAddVideo from "../../Images/CameraAddVideo.svg";
import DropVideo from "../../Images/DropVideo.svg";
import Education from "../../Images/Education.svg";
import Experience from "../../Images/Experience.svg";
import SkillsAndTools from "../../Images/SkillsAndTools.svg";
import SocialMedia from "../../Images/SocialMedia.svg";
import LinkedIn from "../../Images/linkedin.svg";
import github from "../../Images/github.svg";
import portfolioWebsite from "../../Images/portfolioWebsite.svg";
import JobPreferences from "../../Images/JobPreferferences.svg";
import "../../Styles/JobSeeker/JobSeekerCreateProfile.css";
import plusIcon from "../../Images/plusIcon.svg";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const TOTAL_STEPS = 6;

const JobSeekerCreateProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [skillInput, setSkillInput] = React.useState("");
  const [skills, setSkills] = React.useState([]);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const [jobPreference, setJobPreference] = useState("");

  const url = "http://localhost:9191";

  const preferencesOptions = [
    "Full Time",
    "Part Time",
    "Freelance",
    "Remote",
    "Hybrid",
    "In Office",
  ];
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobileNumber, setPhone] = React.useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [personalInfo, setPersonalInfos] = useState({
    city: "",
    state: "",
    country: "",
    resumeUrl: "",
    introVideoUrl: null,
    autoParse: false,
  });

  const [educationList, setEducations] = useState([
    { degree: "", fieldOfStudy: "", institution: "", passingYear: "" },
  ]);
  const [experienceList, setExperiences] = useState([
    {
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      keyResponsibilities: "",
    },
  ]);
  const [socialProfile, setSocialLinks] = React.useState({
    linkedinUrl: "",
    githubUrl: "",
    portfolioWebsite: "",
  });

  const [jobPrefeences, setjobPrefeences] = useState({
    desiredJobTitle: "",
    jobType: "",
    expectedSalary: 0,
    preferredLocation: "",
  });
  // const [desiredJobTitle, setDesiredJobTitle] = React.useState("");
  // const [expectedSalary, setExpectedSalary] = React.useState("");
  // const [preferredLocation, setPreferredLocation] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  // Handler for personal info inputs
  const handlePersonalInfoChange = (e) => {
    const { id, type, value, checked, files } = e.target;

    setPersonalInfos((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  /*Add education functionality */
  const handleEducationChange = (index, field, value) => {
    const updatedEducations = [...educationList];
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
  };

  /*Add experience functionality */
  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = [...experienceList];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };
  // Handlers for social links change
  const handleSocialLinkChange = (e) => {
    const { id, value } = e.target;
    setSocialLinks((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  /*step section handling  */
  const handleNext = () => setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const jobSeekerId = localStorage.getItem("jobSeekerId"); // Get ID stored after registration

    if (!agreeTerms) {
      window.alert(
        "Please agree to the terms and conditions before submitting."
      );
      return;
    }

    const profileData = {
      fullName: fullName,
      email: email,
      mobileNumber: mobileNumber,
      personalInfo: personalInfo,
      educationList: educationList,
      experienceList: experienceList,
      skills: skills,
      scoicalProfile: socialProfile,
      // jobPreferences: {
      //   desiredJobTitle,
      //   jobPreference,
      //   expectedSalary,
      //   preferredLocation,
      // },
      jobPreferences: jobPrefeences,
      agreedToTerms: agreeTerms,
    };

    if (resumeFile) {
      formData.append("resumeFile", resumeFile);
    }
    if (videoFile) {
      formData.append("videoFile", videoFile);
    }
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    console.log("Submitting profile data:", profileData);

    formData.append(
      "dto",
      new Blob([JSON.stringify(profileData)], {
        type: "application/json",
      })
    );

    try {
      const response = await axiosInstance.put(
        `/api/jobseekers/${jobSeekerId}/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("Job Seeker profile updated successfully!");
        navigate("/JobSeekerHome");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data); // e.g., "Job Seeker not found with ID: 2"
      } else if (error.request) {
        alert("No response from server.");
      } else {
        alert("Unexpected error. Please try again.");
      }
    }

    // navigate("/JobSeekerDashboard");
  };

  return (
    <div className="jscp-container">
      {/* Header */}
      <header className="jscp-header">
        <div className="jscp-logo">
          <span>Career</span> Connect
        </div>
        <nav className="jscp-nav-links">
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/myprofile">My Profile</Link>
        </nav>
      </header>

      {/* Main */}
      <main className="jscp-main">
        <section className="jscp-top-section">
          <h1>Create your profile</h1>
          <p>
            Start your journey towards the right job. Fill in details so
            employers can find you easily.
          </p>
          <div className="jscp-progress-container">
            <div className="jscp-progress-line">
              <div
                className="jscp-progress-fill"
                style={{
                  width:
                    step === 1
                      ? "0%"
                      : step === 2
                      ? "20%"
                      : step === 3
                      ? "40%"
                      : step === 4
                      ? "60%"
                      : step === 5
                      ? "80%"
                      : "100%",
                }}
              ></div>
            </div>
            <div className="jscp-progress-steps">
              <div className={`jscp-step-item ${step >= 1 ? "active" : ""}`}>
                <span>1</span>
                <p>Personal Info</p>
              </div>
              <div className={`jscp-step-item ${step >= 2 ? "active" : ""}`}>
                <span>2</span>
                <p>Education</p>
              </div>
              <div className={`jscp-step-item ${step >= 3 ? "active" : ""}`}>
                <span>3</span>
                <p>Experience</p>
              </div>
              <div className={`jscp-step-item ${step >= 4 ? "active" : ""}`}>
                <span>4</span>
                <p>Skills & tools</p>
              </div>
              <div className={`jscp-step-item ${step >= 5 ? "active" : ""}`}>
                <span>5</span>
                <p>Social Media & Portfolio</p>
              </div>
              <div className={`jscp-step-item ${step === 6 ? "active" : ""}`}>
                <span>6</span>
                <p>Job Preferences</p>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <form onSubmit={handleSubmit} className="jscp-form">
          {step === 1 && (
            <div>
              {/* Personal Info */}
              <section className="jscp-card">
                <header className="jscp-card-header">
                  <img src={Profile} alt="Profile" className="jscp-card-icon" />
                  <h3>Personal Information</h3>
                </header>
                <div className="jscp-card-body">
                  <div className="jscp-logo-upload">
                    {/* Preview uploaded image or default */}
                    <img
                      src={user}
                      alt="preview"
                      className="jscp-upload-image"
                    />

                    {/* Camera icon as upload trigger */}
                    <label htmlFor="companyImageInput">
                      <img
                        src={Camera1}
                        alt="Camera"
                        className="jscp-camera-icon"
                      />
                    </label>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      id="companyImageInput"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      style={{ display: "none" }}
                      // onChange={handleImageUpload}
                    />
                  </div>

                  <div className="jscp-form-row">
                    <div className="jscp-input-group jscp-full">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div className="jscp-form-row">
                    <div className="jscp-input-group jscp-half">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="jscp-input-group jscp-half">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="mobileNumber"
                        value={mobileNumber}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="jscp-form-row">
                    <div className="jscp-input-group jscp-full">
                      <label>Location</label>
                      <div className="jscp-location-group">
                        <input
                          type="text"
                          id="city"
                          value={personalInfo.city}
                          onChange={handlePersonalInfoChange}
                          placeholder="Enter your City"
                        />
                        <select
                          id="state"
                          value={personalInfo.state}
                          onChange={handlePersonalInfoChange}
                        >
                          <option value="">Select your state</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                        </select>
                        <select
                          id="country"
                          value={personalInfo.country}
                          onChange={handlePersonalInfoChange}
                        >
                          <option value="">Select your Country</option>
                          <option value="India">India</option>
                          <option value="China">China</option>
                          <option value="Russia">Russia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Resume Upload */}
              <section className="jscp-card">
                <header className="jscp-card-header">
                  <img
                    src={ResumeProfile}
                    alt="Resume"
                    className="jscp-card-icon"
                  />
                  <h3>Resume</h3>
                </header>
                <div className="jscp-card-body">
                  <div className="jscp-file-upload-area">
                    <img
                      src={DropResume}
                      alt="Drop Resume"
                      className="jscp-upload-icon-large"
                    />
                    <p className="jscp-drag-drop-text">
                      Drag or drop your resume here or
                    </p>
                    <input
                      id="resume"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => setResumeFile(e.target.files[0])}
                      required
                    />
                    <label htmlFor="resume" className="jscp-browse-button">
                      Browse files
                    </label>
                    <p className="jscp-supported-formats">
                      Supported: PDF, DOC, DOCX (Max 5 MB)
                    </p>
                    {resumeFile && (
                      <p className="jscp-selected-file">
                        Selected: {resumeFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Video Upload */}
              <section className="jscp-card">
                <header className="jscp-card-header">
                  <img
                    src={ResumeProfile}
                    alt="Video"
                    className="jscp-card-icon"
                  />
                  <h3>Add Introduction video (optional)</h3>
                </header>
                <div className="jscp-card-body">
                  <div className="jscp-file-upload-area">
                    <img
                      src={DropVideo}
                      alt="Drop Video"
                      className="jscp-upload-icon-large"
                    />
                    <p className="jscp-drag-drop-text">
                      Drag or drop your video here or
                    </p>
                    <input
                      type="file"
                      id="video"
                      accept="video/*"
                      onChange={(e) => setVideoFile(e.target.files[0])}
                    />
                    <label htmlFor="video" className="jscp-browse-button">
                      Browse Video files
                    </label>
                    <p className="jscp-supported-formats">
                      Supported: MP4, AVI, MOV (Max 50MB)
                    </p>
                     {videoFile && (
                      <p className="jscp-selected-file">
                        Selected: {videoFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Checkbox */}
              <div className="jscp-auto-parse-checkbox">
                <input
                  type="checkbox"
                  id="autoParse"
                  checked={personalInfo.autoParse}
                  onChange={handlePersonalInfoChange}
                />
                <label htmlFor="autoParse">Auto‑parse resume data</label>
              </div>

              {/* Buttons */}
              <div className="jscp-form-row jscp-buttons-row">
                <button type="button" className="jscp-btn-secondary">
                  Save as draft
                </button>
                <button
                  type="button"
                  className="jscp-btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <section className="jscp-card">
                <header className="jscp-card-header">
                  <img
                    src={Education}
                    alt="Education"
                    className="jscp-card-icon"
                  />
                  <h3>Education</h3>
                </header>
                <div className="jscp-card-body">
                  {educationList.map((edu, index) => (
                    <div className="jscp-education-entry" key={index}>
                      <div className="jscp-form-row">
                        <div className="jscp-input-group jscp-half">
                          <label htmlFor={`degree-${index}`}>Degree</label>
                          <select
                            id={`degree-${index}`}
                            value={edu.degree}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "degree",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select degree</option>
                            <option value="BE/B.tech">BE/B.tech</option>
                            <option value="ME/M.tech">ME/M.tech</option>
                            <option value="B.Sc/BCS/BCA/BCOM">
                              B.Sc/BCS/BCA/BCOM
                            </option>
                            <option value="M.Sc/MCS/MCA/MCOM">
                              M.Sc/MCS/MCA/MCOM
                            </option>
                          </select>
                        </div>
                        <div className="jscp-input-group jscp-half">
                          <label htmlFor={`fieldOfStudy-${index}`}>
                            Field of study
                          </label>
                          <input
                            type="text"
                            id={`fieldOfStudy-${index}`}
                            placeholder="Field of study"
                            value={edu.fieldOfStudy}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "fieldOfStudy",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      <div className="jscp-form-row">
                        <div className="jscp-input-group jscp-half">
                          <label htmlFor={`institution-${index}`}>
                            Institution
                          </label>
                          <input
                            type="text"
                            id={`institution-${index}`}
                            placeholder="Institution name"
                            value={edu.institution}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "institution",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="jscp-input-group jscp-half">
                          <label htmlFor={`passingYear-${index}`}>
                            Passing Year
                          </label>
                          <select
                            id={`passingYear-${index}`}
                            value={edu.passingYear}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "passingYear",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select passing year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="jscp-add-button"
                  onClick={() =>
                    setEducations((prev) => [
                      ...prev,
                      {
                        degree: "",
                        fieldOfStudy: "",
                        institution: "",
                        passingYear: "",
                      },
                    ])
                  }
                >
                  <img src={plusIcon} alt="Add" />
                  Add Education
                </button>
              </section>

              <div className="jscp-form-row jscp-buttons-row">
                <button type="button" className="jscp-btn-secondary">
                  Save as draft
                </button>
                <button
                  type="button"
                  className="jscp-btn-secondary"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="jscp-btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <section className="jscp-card">
                <header className="jscp-card-header">
                  <img
                    src={Experience}
                    alt="Experience"
                    className="jscp-card-icon"
                  />
                  <h3>Work Experience</h3>
                </header>
                <div className="jscp-card-body">
                  {experienceList.map((exp, index) => (
                    <div className="jscp-experience-entry" key={index}>
                      <div className="jscp-form-row">
                        <div className="jscp-input-group jscp-half">
                          <label htmlFor={`jobTitle-${index}`}>Job Title</label>
                          <input
                            type="text"
                            id={`jobTitle-${index}`}
                            value={exp.jobTitle}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "jobTitle",
                                e.target.value
                              )
                            }
                            placeholder="Job Title"
                          />
                        </div>
                        <div className="jscp-input-group jscp-half">
                          <label htmlFor={`companyName-${index}`}>
                            Company Name
                          </label>
                          <input
                            type="text"
                            id={`companyName-${index}`}
                            value={exp.companyName}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "companyName",
                                e.target.value
                              )
                            }
                            placeholder="Company Name"
                          />
                        </div>
                      </div>

                      <div className="jscp-form-row">
                        <div className="jscp-input-group jscp-half">
                          <label htmlFor={`startDate-${index}`}>
                            Start Date
                          </label>
                          <input
                            type="month"
                            id={`startDate-${index}`}
                            //changes
                            value={
                              exp.startDate ? exp.startDate.slice(0, 7) : ""
                            }
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "startDate",
                                e.target.value + "-01"
                              )
                            }
                          />
                        </div>
                        <div className="jscp-input-group jscp-half">
                          <label htmlFor={`endDate-${index}`}>End Date</label>
                          <input
                            type="month"
                            id={`endDate-${index}`}
                            // changes
                            value={exp.endDate ? exp.endDate.slice(0, 7) : ""}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "endDate",
                                e.target.value + "-01"
                              )
                            }
                            disabled={exp.currentlyWorking}
                          />
                        </div>
                      </div>

                      <div className="jscp-form-row jscp-checkbox-row">
                        <input
                          type="checkbox"
                          id={`currentlyWorking-${index}`}
                          checked={exp.currentlyWorking}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "currentlyWorking",
                              e.target.checked
                            )
                          }
                        />
                        <label htmlFor={`currentlyWorking-${index}`}>
                          Currently Working Here
                        </label>
                      </div>

                      <div className="jscp-form-row">
                        <div className="jscp-input-group jscp-full">
                          <label htmlFor={`keyResponsibilities-${index}`}>
                            Key Responsibilities
                          </label>
                          <textarea
                            id={`keyResponsibilities-${index}`}
                            value={exp.keyResponsibilities}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "keyResponsibilities",
                                e.target.value
                              )
                            }
                            placeholder="Describe your key responsibilities"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="jscp-add-button"
                  onClick={() =>
                    setExperiences((prev) => [
                      ...prev,
                      {
                        jobTitle: "",
                        companyName: "",
                        startDate: "",
                        endDate: "",
                        currentlyWorking: false,
                        keyResponsibilities: "",
                      },
                    ])
                  }
                >
                  <img src={plusIcon} alt="Add" />
                  Add Experience
                </button>
              </section>

              <div className="jscp-form-row jscp-buttons-row">
                <button type="button" className="jscp-btn-secondary">
                  Save as draft
                </button>
                <button
                  type="button"
                  className="jscp-btn-secondary"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="jscp-btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <section className="jscp-card">
                <header className="jscp-card-header">
                  <img
                    src={SkillsAndTools}
                    alt="Skills"
                    className="jscp-card-icon"
                  />
                  <h2>Skills & Tools</h2>
                </header>
                <div className="jscp-card-body">
                  <div className="jscp-input-group">
                    <label htmlFor="skillsInput">Type Skills</label>
                    <input
                      type="text"
                      id="skillsInput"
                      placeholder="Type your skill and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const trimmed = skillInput.trim();
                          if (trimmed && !skills.includes(trimmed)) {
                            setSkills([...skills, trimmed]);
                            setSkillInput("");
                          }
                        }
                      }}
                    />
                    <div className="jscp-skills-tags">
                      {skills.map((skill, index) => (
                        <span key={index} className="jscp-skill-tag">
                          {skill}
                          <button
                            type="button"
                            className="jscp-remove-skill"
                            onClick={() => {
                              setSkills(skills.filter((_, i) => i !== index));
                            }}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <div className="jscp-form-row jscp-buttons-row">
                <button type="button" className="jscp-btn-secondary">
                  Save as draft
                </button>
                <button
                  type="button"
                  className="jscp-btn-secondary"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="jscp-btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <section className="jscp-card">
                <header className="jscp-card-header">
                  <img
                    src={SocialMedia}
                    alt="Social Media"
                    className="jscp-card-icon"
                  />
                  <h3>Social media & Portfolio</h3>
                </header>
                <div className="jscp-card-body">
                  {[
                    {
                      id: "linkedinUrl",
                      icon: LinkedIn,
                      label: "LinkedIn Profile",
                      type: "url",
                    },
                    {
                      id: "githubUrl",
                      icon: github,
                      label: "GitHub Profile",
                      type: "url",
                    },
                    {
                      id: "portfolioWebsite",
                      icon: portfolioWebsite,
                      label: "Portfolio Website",
                      type: "url",
                    },
                  ].map((item) => (
                    <div key={item.id} className="jscp-form-row">
                      <div className="jscp-input-group jscp-full">
                        <label htmlFor={item.id}>
                          <img
                            src={item.icon}
                            alt={item.label}
                            className="jscp-card-icon"
                          />{" "}
                          {item.label}
                        </label>
                        <input
                          type={item.type}
                          id={item.id}
                          placeholder={`Enter your ${item.label}`}
                          value={socialProfile[item.id]}
                          onChange={handleSocialLinkChange}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <div className="jscp-form-row jscp-buttons-row">
                <button type="button" className="jscp-btn-secondary">
                  Save as draft
                </button>
                <button
                  type="button"
                  className="jscp-btn-secondary"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="jscp-btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <section className="jscp-card">
                <header className="jscp-card-header">
                  <img
                    src={JobPreferences}
                    alt="Preferences"
                    className="jscp-card-icon"
                  />
                  <h3>Job Preferences</h3>
                </header>
                <div className="jscp-card-body">
                  <div className="jscp-input-group">
                    <label htmlFor="desiredJobTitle">Desired Job Title</label>
                    <input
                      type="text"
                      id="desiredJobTitle"
                      placeholder="Enter your desired job title"
                      value={JobPreferences.desiredJobTitle}
                      onChange={(e) =>
                        setjobPrefeences((prev) => ({
                          ...prev,
                          desiredJobTitle: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="jscp-input-group">
                    <label>Preferred Job Type</label>
                    <div className="jscp-radio-group">
                      {preferencesOptions.map((label) => {
                        const value = label.replace(/\s/g, "").toLowerCase();
                        return (
                          <div key={value} className="jscp-radio-item">
                            <input
                              type="radio"
                              id={value}
                              name="jobPreference"
                              value={label}
                              checked={jobPrefeences.jobType === label}
                              onChange={(e) =>
                                setjobPrefeences((prev) => ({
                                  ...prev,
                                  jobType: e.target.value,
                                }))
                              }
                            />
                            <label htmlFor={value}>{label}</label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="jscp-form-row">
                    <div className="jscp-input-group jscp-half">
                      <label htmlFor="expectedSalary">Expected Salary</label>
                      <input
                        type="text"
                        id="expectedSalary"
                        placeholder="Enter your Expected salary per annum"
                        value={JobPreferences.expectedSalary}
                        onChange={(e) =>
                          setjobPrefeences((prev) => ({
                            ...prev,
                            expectedSalary: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="jscp-input-group jscp-half">
                      <label htmlFor="preferredLocation">
                        Preferred Location
                      </label>
                      <input
                        type="text"
                        id="preferredLocation"
                        placeholder="Enter your Preferred location"
                        value={JobPreferences.preferredLocation}
                        onChange={(e) =>
                          setjobPrefeences((prev) => ({
                            ...prev,
                            preferredLocation: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </section>

              <label className="jscp-terms-label">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />{" "}
                I agree with all <a href="/terms">Terms & Conditions</a>
              </label>

              <div className="jscp-form-row jscp-buttons-row">
                <button type="button" className="jscp-btn-secondary">
                  Save as draft
                </button>
                <button
                  type="button"
                  className="jscp-btn-secondary"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="jscp-btn-primary"
                  disabled={!agreeTerms} // Optionally disable confirm if terms not agreed
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </form>
      </main>
      {/* Footer */}
      <footer className="jscp-footer">
        <div className="jscp-footer-grid">
          <div>
            <h6 className="jscp-logo">
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
            <div className="jscp-social-icons">
              <span>
                <img src={facebook} alt="f" />
              </span>
              <span>
                <img src={instagram} alt="i" />
              </span>
              <span>
                <img src={linkedinIcon} alt="l" />
              </span>
              <span>
                <img src={x} alt="x" />
              </span>
            </div>
          </div>
        </div>
        <p className="jscp-footer-note">
          © 2025 CareerConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default JobSeekerCreateProfile;
