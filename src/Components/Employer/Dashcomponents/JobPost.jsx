import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Styles/Employer/Dashcomponents/JobPost.css";
import axiosInstance from "../../../../src/axiosInstance";
import { baseURL } from "../../../axiosInstance"; // Import your axios instance

const JobPost = () => {
  const navigate = useNavigate();
  const [prefillEnabled, setPrefillEnabled] = useState(false);
  const [previousJobs, setPreviousJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isLoadingPreviousJobs, setIsLoadingPreviousJobs] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [skillInput, setSkillInput] = React.useState("");
  const [skills, setSkills] = React.useState([]);
  const [errors, setErrors] = useState({});
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
  // const url = "http://localhost:9191/jobposts";
  const recruiterId = localStorage.getItem("recruiterId");
  // handle validation function
  const validateForm = () => {
    const newErrors = {};

    if (!jobPost.title.trim()) {
      newErrors.title = "Job title is required.";
    }

    if (!jobPost.employmentType) {
      newErrors.employmentType = "Employment type is required.";
    }

    if (!jobPost.description.trim()) {
      newErrors.description = "Job description is required.";
    }

    if (skills.length === 0) {
      newErrors.skills = "Please add at least one skill.";
    }

    if (jobPost.minExperience === "" || jobPost.maxExperience === "") {
      newErrors.experience = "Experience range is required.";
    } else if (
      parseInt(jobPost.minExperience) > parseInt(jobPost.maxExperience)
    ) {
      newErrors.experience =
        "Minimum experience cannot be greater than maximum experience.";
    }

    if (!jobPost.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!jobPost.lastDateToApply) {
      newErrors.lastDateToApply = "Application deadline is required.";
    }

    if (!jobPost.numberOfOpenings || parseInt(jobPost.numberOfOpenings) <= 0) {
      newErrors.numberOfOpenings = "Enter a valid number of openings.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    // Clear error for the specific field
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
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
      } else {
        alert("You have not posted any jobs yet.");
      }
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
    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }
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
      navigate("/EmployerHome");
    } catch (error) {
      console.error("Error posting job", error);
      alert("Failed to post job");
    }
  };
  return (
    <div className="EJobPost-Container">
      {/* Job Post Form */}
      <div className="EJobPost-MiddlePage">
        <div className="EJobPost-job-post-container">
          <h1 className="EJobPost-main-heading">Post a job</h1>
          <p className="EJobPost-sub-heading">
            Ready to find your next great hire? Select a
          </p>

          <div className="EJobPost-form-type-selection">
            <label className="EJobPost-radio-option">
              <input
                type="radio"
                name="formPrefill"
                checked={prefillEnabled}
                onChange={handlePrefillSelection}
                value="prefill"
              />{" "}
              Prefill details from a job you've posted earlier
            </label>
            <label className="EJobPost-radio-option">
              <input
                type="radio"
                name="formPrefill"
                checked={!prefillEnabled}
                onChange={handleBlankFormSelection}
              />{" "}
              Begin with a blank job post form
            </label>
          </div>

          <p className="EJobPost-form-instruction">
            Fill out the details below and get your job live in minutes.
          </p>
        </div>

        <form className="EJobPost-form" onSubmit={handleSubmit}>
          {/* Basic Details */}
          <section className="EJobPost-form-section">
            <h2 className="EJobPost-section-title">Basic details</h2>
            <div className="EJobPost-form-group">
              <label htmlFor="jobTitle" className="EJobPost-label-required">
                Job title
              </label>
              <input
                type="text"
                id="jobTitle"
                className="EJobPost-text-input"
                name="title"
                value={jobPost.title}
                onChange={handleChange}
                placeholder="E.g Software developer"
              />
              {errors.title && <div className="error-msg">{errors.title}</div>}
            </div>
            <div className="EJobPost-form-group">
              <label
                htmlFor="employmentType"
                className="EJobPost-label-required"
              >
                Employment type
              </label>
              <select
                id="employmentType"
                name="employmentType"
                value={jobPost.employmentType}
                onChange={handleChange}
                className="EJobPost-select-input"
              >
                <option value="">Select employment type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
                <option value="internship">Internship</option>
              </select>
              {errors.employmentType && (
                <div className="error-msg">{errors.employmentType}</div>
              )}
            </div>
          </section>

          {/* Job Details */}
          <section className="EJobPost-form-section">
            <h2 className="EJobPost-section-title">Job details</h2>
            <div className="EJobPost-form-group">
              <label
                htmlFor="jobDescription"
                className="EJobPost-label-required"
              >
                Job description
              </label>
              <textarea
                id="jobDescription"
                className="EJobPost-textarea-input"
                placeholder="Describe the role and responsibilities..."
                rows="6"
                name="description"
                value={jobPost.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <div className="error-msg">{errors.description}</div>
              )}
            </div>
          </section>

          {/* Skills */}
          <section className="EJobPost-form-section">
            <h2 className="EJobPost-section-title">Required skills</h2>
            <div className="EJobPost-skills-input-group">
              <input
                type="text"
                className="EJobPost-text-input"
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

                      if (errors.skills) {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          skills: null,
                        }));
                      }
                    }
                  }
                }}
              />
              {errors.skills && (
                <div className="error-msg">{errors.skills}</div>
              )}
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
          <div className="EJobPost-form-group">
            <label htmlFor="minExperience" className="EJobPost-label-required">
              Experience required
            </label>
            <div className="EJobPost-experience-range-group-abc">
              <select
                id="minExperience"
                name="minExperience"
                value={jobPost.minExperience}
                onChange={handleChange}
                className="EJobPost-text-input-half"
              >
                <option value="">Minimum experience</option>
                {[...Array(11).keys()].map((year) => (
                  <option key={year} value={year}>
                    {year} years
                  </option>
                ))}
              </select>
              {errors.minExperience && (
                <div className="error-msg">{errors.minExperience}</div>
              )}
              <span
                className="experience-separator"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              >
                to
              </span>
              <select
                id="maxExperience"
                name="maxExperience"
                value={jobPost.maxExperience}
                onChange={handleChange}
                className="EJobPost-text-input-half"
              >
                <option value="">Maximum experience</option>
                {[...Array(11).keys()].map((year) => (
                  <option key={year} value={year}>
                    {year} years
                  </option>
                ))}
              </select>
              {errors.maxExperience && (
                <div className="error-msg">{errors.maxExperience}</div>
              )}
            </div>
          </div>

          {/* Location & Salary */}
          <section className="EJobPost-form-section">
            <h2 className="EJobPost-section-title">Location & Compensation</h2>
            <div className="EJobPost-form-group">
              <label htmlFor="location" className="EJobPost-label-required">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={jobPost.location}
                onChange={handleChange}
                className="EJobPost-text-input"
                placeholder="E.g Pune, Mumbai, Bangalore..."
              />
            </div>
            {errors.location && (
              <div className="error-msg">{errors.location}</div>
            )}
            <div className="EJobPost-form-group">
              <label htmlFor="salaryRange" className="EJobPost-input-label">
                Salary range (LPA)
                <span className="EJobPost-label-optional">[optional]</span>
              </label>
              <div className="EJobPost-salary-range-group">
                <input
                  type="number"
                  name="minSalary"
                  value={jobPost.minSalary}
                  onChange={handleChange}
                  className="EJobPost-text-input-half"
                  placeholder="Minimum"
                />
                <span
                  className="salary-separator"
                  style={{ paddingRight: "10px", paddingLeft: "10px" }}
                >
                  to
                </span>
                <input
                  type="number"
                  name="maxSalary"
                  value={jobPost.maxSalary}
                  onChange={handleChange}
                  className="EJobPost-text-input-half"
                  placeholder="Maximum"
                />
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="EJobPost-form-section">
            <h2 className="EJobPost-section-title">Benefits</h2>
            <div className="EJobPost-benefits-grid">
              <label className="EJobPost-checkbox-option">
                <input
                  type="checkbox"
                  value="Health insurance"
                  checked={jobPost.benefits.includes("Health insurance")}
                  onChange={handleBenefitChange}
                />
                Health insurance
              </label>
              <label className="EJobPost-checkbox-option">
                <input
                  type="checkbox"
                  value="Annual bonus"
                  checked={jobPost.benefits.includes("Annual bonus")}
                  onChange={handleBenefitChange}
                />
                Annual bonus
              </label>
              <label className="EJobPost-checkbox-option">
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
              <label className="EJobPost-checkbox-option">
                <input
                  type="checkbox"
                  value="Travel allowance"
                  checked={jobPost.benefits.includes("Travel allowance")}
                  onChange={handleBenefitChange}
                />
                Travel allowance
              </label>
              <label className="EJobPost-checkbox-option">
                <input
                  type="checkbox"
                  value="ESOP's"
                  checked={jobPost.benefits.includes("ESOP's")}
                  onChange={handleBenefitChange}
                />
                ESOP's
              </label>
              <label className="EJobPost-checkbox-option">
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
          <section className="EJobPost-form-section">
            <h2 className="EJobPost-section-title">Additional details</h2>
            <div className="EJobPost-form-group">
              <label
                htmlFor="applicationDeadline"
                className="EJobPost-label-required"
              >
                Application deadline
              </label>
              <input
                type="date"
                id="applicationDeadline"
                name="lastDateToApply"
                value={jobPost.lastDateToApply}
                onChange={handleChange}
                className="EJobPost-text-input"
              />
              {errors.lastDateToApply && (
                <div className="error-msg">{errors.lastDateToApply}</div>
              )}
            </div>
            <div className="EJobPost-form-group">
              <label
                htmlFor="numberOfOpening"
                className="EJobPost-label-required"
              >
                Number of openings
              </label>
              <input
                type="number"
                id="numberOfOpening"
                value={jobPost.numberOfOpenings}
                name="numberOfOpenings"
                onChange={handleChange}
                className="EJobPost-text-input"
              />
              {errors.numberOfOpenings && (
                <div className="error-msg">{errors.numberOfOpenings}</div>
              )}
            </div>
          </section>

          {isLoadingPreviousJobs && (
            <div className="EJobPost-loading">
              {/* //  <Spinner /> Loading your last job details... */}
            </div>
          )}
          {/* {fetchError && (
            <div className="EJobPost-error">
              {fetchError}
              <button onClick={fetchPreviousJobs}>Retry</button>
            </div>
          )} */}
          <button type="submit" className="EJobPost-applypost-job-button">
            Post a job
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPost;
