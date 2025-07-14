import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Employer/EmployerDashboard.css";
import search from "../../Images/search.svg";
import Notification from "../../Images/Notification.svg";
import userHeader from "../../Images/userHeader.svg";
import axios from "axios";
import Dashboard from "../../Images/Dashboard.svg";
import MyJobsPost from "../../Images/MyJobsPost.svg";
import Applicants from "../../Images/Applicants.svg";
import Recommendation from "../../Images/Recommendation.svg";
import Messages from "../../Images/Messages.svg";
import Analysis from "../../Images/Analysis.svg";
import settings from "../../Images/settings.svg";
import axiosInstance from "../../axiosInstance";


const EmployerDashboard = () => {
  const [prefillEnabled, setPrefillEnabled] = useState(false);
  const [previousJobs, setPreviousJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isLoadingPreviousJobs, setIsLoadingPreviousJobs] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [skillInput, setSkillInput] = React.useState("");
  const [skills, setSkills] = React.useState([]);
  const [jobPost, setJobPost] = useState({
    title: "",
    employmentType: "",
    description: "",
    skills: [],
    minExperience: 0,
    maxExperience: 0,
    location: "",
    minSalary: 0.0,
    maxSalary: 0.0,
    benefits: [],
    lastDateToApply: "",
    numberOfOpenings: 0,
  });
  const url = "http://localhost:9191/jobposts";
  const recruiterId = localStorage.getItem("recruiterId");

  const handleBenefitChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setJobPost({ ...jobPost, benefits: [...jobPost.benefits, value] });
    } else {
      setJobPost({
        ...jobPost,
        benefits: jobPost.benefits.filter((b) => b !== value),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobPost({ ...jobPost, [name]: value });
  };

  const fetchPreviousJobs = async () => {
    try {
      setIsLoadingPreviousJobs(true);
      const response = await axiosInstance.get(
        `/api/jobposts/recruiter/${recruiterId}/last`
      );
      

      if (response.data) {
        const mostRecentJob = response.data; // last posted job
        console.log("Most recent job:", mostRecentJob);

        setJobPost({
          title: mostRecentJob.title || "",
          employmentType: mostRecentJob.employmentType || "",
          description: mostRecentJob.description || "",
          skills: mostRecentJob.skills || [],
          minExperience: mostRecentJob.minExperience || 0,
          maxExperience: mostRecentJob.maxExperience || 0,
          location: mostRecentJob.location || "",
          minSalary: mostRecentJob.minSalary || 0.0,
          maxSalary: mostRecentJob.maxSalary || 0.0,
          benefits: mostRecentJob.benefits || [],
          lastDateToApply: mostRecentJob.lastDateToApply || "",
          numberOfOpenings: mostRecentJob.numberOfOpenings || 0,
        });
      }
       else {
      alert("You have not posted any jobs yet.");}
    } catch (error) {
      setFetchError("Failed to load previous jobs");
      console.error("Error fetching previous jobs:", error);
    } finally {
      setIsLoadingPreviousJobs(false);
    }
  };


  const handlePrefillSelection = async () => {
    setPrefillEnabled(true);
    setFetchError(null);
    await fetchPreviousJobs();
    // setJobPost(previousJobs);
  };

  const handleBlankFormSelection = () => {
    setPrefillEnabled(false);
    resetForm();
  };

  const resetForm = () => {
    setJobPost({
      title: "",
      employmentType: "",
      description: "",
      skills: [],
      minExperience: 0,
      maxExperience: 0,
      location: "",
      minSalary: 0.0,
      maxSalary: 0.0,
      benefits: [],
      lastDateToApply: "",
      numberOfOpenings: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     const JobProfileData = {
      title: jobPost.title,
      employmentType: jobPost.employmentType,
      description: jobPost.description,
      skills: skills,
      minExperience: jobPost.minExperience,
      maxExperience: jobPost.maxExperience,
      location: jobPost.location,
      minSalary: jobPost.minSalary,
      maxSalary: jobPost.maxSalary,
      benefits: jobPost.benefits,
      lastDateToApply: jobPost.lastDateToApply,
      numberOfOpenings: jobPost.numberOfOpenings,
  };

    try {
      console.log("Recruiter ID:", recruiterId);

      const response = await axiosInstance.post(
        `/api/jobposts/recruiter/${recruiterId}`,
        JobProfileData
      );
      console.log("Job posted successfully", response.data);

      alert("Job posted!");
    } catch (error) {
      console.error("Error posting job", error);
      alert("Failed to post job");
    }
  };
  return (
    <div className="Employer_Dashboard-Container">
      {/* Header */}
      <header className="Employer_Dashboard-header">
        <div className="Employer_Dashboard-logo">
          <span>Career</span> Connect
        </div>
        <nav className="Employer_Dashboard-nav-links">
          <Link to="#" className="Employer_Dashboard-header-link">
            <img
              src={search}
              alt="search"
              className="Employer_Dashboard-profile-icon"
            />
          </Link>

          <Link to="#" className="Employer_Dashboard-header-link">
            <img
              src={Notification}
              alt="Notification"
              className="Employer_Dashboard-profile-icon"
            />
          </Link>
          <Link to="#" className="Employer_Dashboard-header-link">
            <img
              src={userHeader}
              alt="userHeader"
              className="Employer_Dashboard-profile-icon"
            />
          </Link>
          <Link to="#">
            <button className="Employer_Dashboard-btn-primary">
              Post a Job
            </button>
          </Link>
        </nav>
      </header>

      {/* Sidebar */}
      <div className="Employer_Dashboard-sidebar">
        <ul className="Employer_Dashboard-sidebar-menu">
          <li className="Employer_Dashboard-menu-item">
            <a href="#">
              <img
                src={Dashboard}
                alt="Dashboard"
                className="Employer_Dashboard-sidebar-profile-icon"
              />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="Employer_Dashboard-menu-item">
            <a href="#">
              <img
                src={MyJobsPost}
                alt="MyJobsPost"
                className="Employer_Dashboard-sidebar-profile-icon"
              />
              <span>My Job Posts</span>
            </a>
          </li>
          <li className="Employer_Dashboard-menu-item">
            <a href="#">
              <img
                src={Applicants}
                alt="Applicants"
                className="Employer_Dashboard-sidebar-profile-icon"
              />
              <span>Applicants</span>
            </a>
          </li>
          <li className="Employer_Dashboard-menu-item">
            <a href="#">
              <img
                src={Recommendation}
                alt="Recommendation"
                className="Employer_Dashboard-sidebar-profile-icon"
              />
              <span>Recommendation</span>
            </a>
          </li>
          <li className="Employer_Dashboard-menu-item">
            <a href="#">
              <img
                src={Messages}
                alt="Messages"
                className="Employer_Dashboard-sidebar-profile-icon"
              />
              <span>Messages</span>
            </a>
          </li>
          <li className="Employer_Dashboard-menu-item">
            <a href="#">
              <img
                src={Analysis}
                alt="Analysis"
                className="Employer_Dashboard-sidebar-profile-icon"
              />
              <span>Analysis</span>
            </a>
          </li>
          <li className="Employer_Dashboard-menu-item">
            <a href="#">
              <img
                src={settings}
                alt="settings"
                className="Employer_Dashboard-sidebar-profile-icon"
              />
              <span>Settings</span>
            </a>
          </li>
        </ul>

        <button type="submit" className="Employer_Dashboard-Sidebar-PostButton">
          Post a job
        </button>

        <div className="Employer_Dashboard-sidebar-footer">
          <div className="Employer_Dashboard-user-profile">
            <img
              src="Employer_Dashboard-user-profile-pic.jpg"
              alt="User Profile"
              className="profile-pic"
            />
            <div className="user-info">
              <span className="Employer_Dashboard-user-name">
                Shruti Punewar
              </span>
              <span className="Employer_Dashboard-user-role">HR Executive</span>
            </div>
            <i className="icon-arrow-right"></i>
          </div>
        </div>
      </div>

      {/* Middle Page - Job Post Form */}
      <div className="Employer_Dashboard-MiddlePage">
        <div className="Employer_Dashboard-job-post-container">
          <h1 className="Employer_Dashboard-main-heading">Post a job</h1>
          <p className="Employer_Dashboard-sub-heading">
            Ready to find your next great hire? Select a
          </p>

          <div className="Employer_Dashboard-form-type-selection">
            <label className="Employer_Dashboard-radio-option">
              <input
                type="radio"
                name="formPrefill"
                checked={prefillEnabled}
                onChange={handlePrefillSelection}
                value="prefill"
              />{" "}
              Prefill details from a job you've posted earlier
            </label>
            <label className="Employer_Dashboard-radio-option">
              <input
                type="radio"
                name="formPrefill"
                checked={!prefillEnabled}
                onChange={handleBlankFormSelection}
              />{" "}
              Begin with a blank job post form
            </label>
          </div>

          <p className="Employer_Dashboard-form-instruction">
            Fill out the details below and get your job live in minutes.
          </p>
        </div>

        <form className="Employer_Dashboard-form" onSubmit={handleSubmit}>
          {/* Basic Details */}
          <section className="Employer_Dashboard-form-section">
            <h2 className="Employer_Dashboard-section-title">Basic details</h2>
            <div className="Employer_Dashboard-form-group">
              <label
                htmlFor="jobTitle"
                className="Employer_Dashboard-label-required"
              >
                Job title
              </label>
              <input
                type="text"
                id="jobTitle"
                className="Employer_Dashboard-text-input"
                name="title"
                value={jobPost.title}
                onChange={handleChange}
                placeholder="E.g Software developer"
                required
              />
            </div>
            <div className="Employer_Dashboard-form-group">
              <label
                htmlFor="employmentType"
                className="Employer_Dashboard-label-required"
              >
                Employment type
              </label>
              <select
                id="employmentType"
                name="employmentType"
                value={jobPost.employmentType}
                onChange={handleChange}
                className="Employer_Dashboard-select-input"
                required
              >
                <option value="">Select employment type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </section>

          {/* Job Details */}
          <section className="Employer_Dashboard-form-section">
            <h2 className="Employer_Dashboard-section-title">Job details</h2>
            <div className="Employer_Dashboard-form-group">
              <label
                htmlFor="jobDescription"
                className="Employer_Dashboard-label-required"
              >
                Job description
              </label>
              <textarea
                id="jobDescription"
                className="Employer_Dashboard-textarea-input"
                placeholder="Describe the role and responsibilities..."
                rows="6"
                name="description"
                value={jobPost.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </section>

          {/* Skills */}
          <section className="Employer_Dashboard-form-section">
            <h2 className="Employer_Dashboard-section-title">
              Required skills
            </h2>
            <div className="Employer_Dashboard-skills-input-group">
              <input
                type="text"
                className="Employer_Dashboard-text-input"
                placeholder="+ Add skills"
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
            </div>
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
          </section>

          {/* Experience */}
          <div className="Employer_Dashboard-form-group">
            <label
              htmlFor="minExperience"
              className="Employer_Dashboard-label-required"
            >
              Experience required
            </label>
            <div className="Employer_Dashboard-experience-range-group-abc">
              <select
                id="minExperience"
                name="minExperience"
                value={jobPost.minExperience}
                onChange={handleChange}
                className="Employer_Dashboard-text-input-half"
              >
                <option value="">Minimum experience</option>
                {[...Array(11).keys()].map((year) => (
                  <option key={year} value={year}>
                    {year} years
                  </option>
                ))}
              </select>
              <span className="experience-separator">to</span>
              <select
                id="maxExperience"
                name="maxExperience"
                value={jobPost.maxExperience}
                onChange={handleChange}
                className="Employer_Dashboard-text-input-half"
              >
                <option value="">Maximum experience</option>
                {[...Array(11).keys()].map((year) => (
                  <option key={year} value={year}>
                    {year} years
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location & Salary */}
          <section className="Employer_Dashboard-form-section">
            <h2 className="Employer_Dashboard-section-title">
              Location & Compensation
            </h2>
            <div className="Employer_Dashboard-form-group">
              <label
                htmlFor="location"
                className="Employer_Dashboard-label-required"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={jobPost.location}
                onChange={handleChange}
                className="Employer_Dashboard-text-input"
                placeholder="E.g Pune, Mumbai, Bangalore..."
              />
            </div>
            <div className="Employer_Dashboard-form-group">
              <label
                htmlFor="salaryRange"
                className="Employer_Dashboard-input-label"
              >
                Salary range{" "}
                <span className="Employer_Dashboard-label-optional">
                  (optional)
                </span>
              </label>
              <div className="Employer_Dashboard-salary-range-group">
                <input
                  type="number"
                  name="minSalary"
                  value={jobPost.minSalary}
                  onChange={handleChange}
                  className="Employer_Dashboard-text-input-half"
                  placeholder="Minimum"
                />
                <span className="salary-separator">to</span>
                <input
                  type="number"
                  name="maxSalary"
                  value={jobPost.maxSalary}
                  onChange={handleChange}
                  className="Employer_Dashboard-text-input-half"
                  placeholder="Maximum"
                />
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="Employer_Dashboard-form-section">
            <h2 className="Employer_Dashboard-section-title">Benefits</h2>
            <div className="Employer_Dashboard-benefits-grid">
              <label className="Employer_Dashboard-checkbox-option">
                <input
                  type="checkbox"
                  value="Health insurance"
                  checked={jobPost.benefits.includes("Health insurance")}
                  onChange={handleBenefitChange}
                />
                Health insurance
              </label>
              <label className="Employer_Dashboard-checkbox-option">
                <input
                  type="checkbox"
                  value="Annual bonus"
                  checked={jobPost.benefits.includes("Annual bonus")}
                  onChange={handleBenefitChange}
                />
                Annual bonus
              </label>
              <label className="Employer_Dashboard-checkbox-option">
                <input
                  type="checkbox"
                  value="Remote/hybrid flexibility"
                  checked={jobPost.benefits.includes(
                    "Remote/hybrid flexibility"
                  )}
                  onChange={handleBenefitChange}
                />
                Remote/hybrid flexibility
              </label>
              <label className="Employer_Dashboard-checkbox-option">
                <input
                  type="checkbox"
                  value="Travel allowance"
                  checked={jobPost.benefits.includes("Travel allowance")}
                  onChange={handleBenefitChange}
                />
                Travel allowance
              </label>
              <label className="Employer_Dashboard-checkbox-option">
                <input
                  type="checkbox"
                  value="ESOP's"
                  checked={jobPost.benefits.includes("ESOP's")}
                  onChange={handleBenefitChange}
                />
                ESOP's
              </label>
              <label className="Employer_Dashboard-checkbox-option">
                <input
                  type="checkbox"
                  value="Learning programs"
                  checked={jobPost.benefits.includes("Learning programs")}
                  onChange={handleBenefitChange}
                />
                Learning programs
              </label>
            </div>
          </section>

          {/* Application Deadline */}
          <section className="Employer_Dashboard-form-section">
            <h2 className="Employer_Dashboard-section-title">
              Additional details
            </h2>
            <div className="Employer_Dashboard-form-group">
              <label
                htmlFor="applicationDeadline"
                className="Employer_Dashboard-label-required"
              >
                Application deadline
              </label>
              <input
                type="date"
                id="applicationDeadline"
                name="lastDateToApply"
                value={jobPost.lastDateToApply}
                onChange={handleChange}
                className="Employer_Dashboard-text-input"
                required
              />
            </div>
            <div className="Employer_Dashboard-form-group">
              <label
                htmlFor="numberOfOpening"
                className="Employer_Dashboard-label-required"
              >
                Number of openings
              </label>
              <input
                type="number"
                id="numberOfOpening"
                value={jobPost.numberOfOpenings}
                name="numberOfOpenings"
                onChange={handleChange}
                className="Employer_Dashboard-text-input"
                required
              />
            </div>
          </section>

          {isLoadingPreviousJobs && (
            <div className="Employer_Dashboard-loading">
              {/* //  <Spinner /> Loading your last job details... */}
            </div>
          )}

          {fetchError && (
            <div className="Employer_Dashboard-error">
              {fetchError}
              <button onClick={fetchPreviousJobs}>Retry</button>
            </div>
          )}
          <button type="submit" className="Employer_Dashboard-btn-primary">
            Submit Job Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployerDashboard;
