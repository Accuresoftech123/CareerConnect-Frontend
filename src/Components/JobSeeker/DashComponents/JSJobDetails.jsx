import React, { useState } from "react";
import "../../../Styles/JobSeeker/DashComponents/JSJobDetails.css";
import SearchIcon from "@mui/icons-material/Search";
import { SvgIcon } from "@mui/material";
import { MapPin, Building, IndianRupee, Briefcase } from "lucide-react";
import bookmark from "../../../Images/bookmark.svg";
import bookmarkBlank from "../../../Images/bookmarkBlank.svg";
import productDesigner from "../../../Images/productDesigner.svg";
import UiUxDesigner from "../../../Images/UiUxDesigner.svg";
import UxDesigner from "../../../Images/UxDesigner.svg";
import send from "../../../Images/send.svg";

import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const STORAGE_KEY = "recommendedJobs";
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const JSJobDetails = () => {
  const JSjobDetails = [
    {
      id: 1,
      title: "UI UX Designer",
      company: "Techno Solutions Pvt Ltd",
      location: "Hinjewadi, Pune",
      type: "Hybrid / Remote",
      salary: "3.5 Lakhs - 6 Lakhs",
      experience: "0 - 1 year",
      tags: ["Figma", "UI", "UX", "Prototyping"],
      time: "7 hours before",
      image: UiUxDesigner,
      jobSummary: "Design user interfaces and experiences...",

      keyResponsibilities: [
        "Create wireframes",
        "Develop prototypes",
        // more responsibilities
      ],

      qualificationsAndSkills: [
        "Knowledge of Figma",
        "Understanding of UX principles",
        // more skills
      ],

      perksAndBenefits: [
        "Health insurance",
        "Flexible working hours",
        // more perks
      ],

      companyOverview: {
        company: "Techno Solutions Pvt Ltd",
        location: "Hinjewadi, Pune",
        industry: "Software Development",
        website: "https://technosolutions.com",
        aboutUs: "Leading software solutions provider...",
      },

      contactDetails: {
        recruiterName: "John Doe",
        email: "john.doe@technosolutions.com",
      },
    },
    {
      id: 2,
      title: "UI Designer",
      company: "Collabera Digital Pvt Ltd",
      location: "Sector 5, Delhi",
      type: "Remote",
      salary: "5 Lakhs - 7.5 Lakhs",
      experience: "0.6 - 2 years",
      tags: ["UI design", "Figma", "Adobe", "wireframing"],
      time: "12 hours before",
      image: UiUxDesigner,
      jobSummary: "Design user interfaces and experiences...",

      keyResponsibilities: [
        "Create wireframes",
        "Develop prototypes",
        // more responsibilities
      ],

      qualificationsAndSkills: [
        "Knowledge of Figma",
        "Understanding of UX principles",
        // more skills
      ],

      perksAndBenefits: [
        "Health insurance",
        "Flexible working hours",
        // more perks
      ],

      companyOverview: {
        company: "Collabera Digital Pvt Ltd",
        location: "Sector 5, Delhi",
        industry: "Software Development",
        website: "https://technosolutions.com",
        aboutUs: "Leading software solutions provider...",
      },

      contactDetails: {
        recruiterName: "John Doe",
        email: "john.doe@technosolutions.com",
      },
    },
    {
      id: 3,
      title: "Junior UI UX Designer",
      company: "Surya Technologies",
      location: "Rajiv Nagar, Indore",
      type: "In Office",
      salary: "4 Lakhs - 6.5 Lakhs",
      experience: "0 - 2 years",
      tags: ["Figma", "UX research", "UI Design"],
      time: "1 day before",
      image: UiUxDesigner,
      jobSummary: "Design user interfaces and experiences...",

      keyResponsibilities: [
        "Create wireframes",
        "Develop prototypes",
        // more responsibilities
      ],

      qualificationsAndSkills: [
        "Knowledge of Figma",
        "Understanding of UX principles",
        // more skills
      ],

      perksAndBenefits: [
        "Health insurance",
        "Flexible working hours",
        // more perks
      ],

      companyOverview: {
        company: "Surya Technologies",
        location: "Rajiv Nagar, Indore",
        industry: "Software Development",
        website: "https://technosolutions.com",
        aboutUs: "Leading software solutions provider...",
      },

      contactDetails: {
        recruiterName: "John Doe",
        email: "john.doe@technosolutions.com",
      },
    },
    {
      id: 4,
      title: "UX Researcher",
      company: "QuantumQube Technologies",
      location: "Dombivli, Mumbai",
      type: "Remote",
      salary: "6 Lakhs - 10 Lakhs",
      experience: "2 - 4 years",
      tags: ["UX research", "IA", "Wireframing"],
      time: "2 days before",
      image: UiUxDesigner,
      jobSummary: "Design user interfaces and experiences...",

      keyResponsibilities: [
        "Create wireframes",
        "Develop prototypes",
        // more responsibilities
      ],

      qualificationsAndSkills: [
        "Knowledge of Figma",
        "Understanding of UX principles",
        // more skills
      ],

      perksAndBenefits: [
        "Health insurance",
        "Flexible working hours",
        // more perks
      ],

      companyOverview: {
        Company: "QuantumQube Technologies",
        location: "Dombivli, Mumbai",
        industry: "Software Development",
        website: "https://technosolutions.com",
        aboutUs: "Leading software solutions provider...",
      },

      contactDetails: {
        recruiterName: "John Doe",
        email: "john.doe@technosolutions.com",
      },
    },
  ];
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  // Extract unique options for filters
  const experienceOptions = [...new Set(JSjobDetails.map((j) => j.experience))];
  const jobTypeOptions = [...new Set(JSjobDetails.map((j) => j.type))];
  const workModeOptions = ["Remote", "In Office", "Hybrid / Remote"]; // predefined
  const locationOptions = [...new Set(JSjobDetails.map((j) => j.location))];
  const salaryOptions = [...new Set(JSjobDetails.map((j) => j.salary))];
  const datePostedOptions = [...new Set(JSjobDetails.map((j) => j.time))];

  // State for filters
  const [filters, setFilters] = useState({
    experience: [],
    jobType: [],
    workMode: [],
    location: [],
    salary: [],
    datePosted: [],
  });
  const getJobs = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle change on filters (multi select)
  const handleFilterChange = (event, key) => {
    const {
      target: { value },
    } = event;
    setFilters((prev) => ({
      ...prev,
      [key]: typeof value === "string" ? value.split(",") : value,
    }));
    setSelectedIndex(0); // reset selected job on filter change
  };

  // Reset all filters
  const resetAllFilters = () => {
    setFilters({
      experience: [],
      jobType: [],
      workMode: [],
      location: [],
      salary: [],
      datePosted: [],
    });
    setSelectedIndex(0);
  };
  const toggleBookmark = (jobId) => {
    const jobs = getJobs();
    const updated = jobs.map((job) =>
      job.id === jobId ? { ...job, bookmarked: !job.bookmarked } : job
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  };

  // Filter jobs based on filters
  const filteredJobs = JSjobDetails.filter((job) => {
    const expMatch =
      filters.experience.length === 0 ||
      filters.experience.includes(job.experience);
    const jobTypeMatch =
      filters.jobType.length === 0 || filters.jobType.includes(job.type);
    const workModeMatch =
      filters.workMode.length === 0 || filters.workMode.includes(job.type);
    const locationMatch =
      filters.location.length === 0 || filters.location.includes(job.location);
    const salaryMatch =
      filters.salary.length === 0 || filters.salary.includes(job.salary);
    const datePostedMatch =
      filters.datePosted.length === 0 || filters.datePosted.includes(job.time);

    return (
      expMatch &&
      jobTypeMatch &&
      workModeMatch &&
      locationMatch &&
      salaryMatch &&
      datePostedMatch
    );
  });

  const currentJob = filteredJobs[selectedIndex] || JSjobDetails[0];

  const handlePrev = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex < filteredJobs.length - 1)
      setSelectedIndex(selectedIndex + 1);
  };
  const handleBookmarkToggle = (jobId) => {
    const updated = toggleBookmark(jobId);
    setRecommendedJobs(updated);
  };

  return (
    <div>
      {/* === Your Original Search Section === */}
      <section className="jsjd-search">
        <form action="#" method="get">
          <div className="jsjd-searchinput-container">
            <SvgIcon component={SearchIcon} />
            <input
              type="text"
              name="keywords"
              placeholder="Search jobs by title"
            />
          </div>
          <select name="location" placeholder="Location">
            <option>Select Location</option>
          </select>
          <select name="company" placeholder="Experience">
            <option>Select Experince</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </section>

      {/* === New Filters Section with Select Dropdowns with Checkboxes === */}
      <section
        className="jsjd-filters"
        style={{
          marginTop: 20,
          marginBottom: 20,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          background: "transparent",
        }}
      >
        <h4>Filters</h4>
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel>Experience</InputLabel>
          <Select
            multiple
            value={filters.experience}
            onChange={(e) => handleFilterChange(e, "experience")}
            input={<OutlinedInput label="Experience" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {experienceOptions.map((exp) => (
              <MenuItem key={exp} value={exp}>
                <Checkbox checked={filters.experience.indexOf(exp) > -1} />
                <ListItemText primary={exp} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel>Job Type</InputLabel>
          <Select
            multiple
            value={filters.jobType}
            onChange={(e) => handleFilterChange(e, "jobType")}
            input={<OutlinedInput label="Job Type" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {jobTypeOptions.map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={filters.jobType.indexOf(type) > -1} />
                <ListItemText primary={type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel>Work Mode</InputLabel>
          <Select
            multiple
            value={filters.workMode}
            onChange={(e) => handleFilterChange(e, "workMode")}
            input={<OutlinedInput label="Work Mode" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {workModeOptions.map((mode) => (
              <MenuItem key={mode} value={mode}>
                <Checkbox checked={filters.workMode.indexOf(mode) > -1} />
                <ListItemText primary={mode} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel>Location</InputLabel>
          <Select
            multiple
            value={filters.location}
            onChange={(e) => handleFilterChange(e, "location")}
            input={<OutlinedInput label="Location" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {locationOptions.map((loc) => (
              <MenuItem key={loc} value={loc}>
                <Checkbox checked={filters.location.indexOf(loc) > -1} />
                <ListItemText primary={loc} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel>Salary</InputLabel>
          <Select
            multiple
            value={filters.salary}
            onChange={(e) => handleFilterChange(e, "salary")}
            input={<OutlinedInput label="Salary" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {salaryOptions.map((sal) => (
              <MenuItem key={sal} value={sal}>
                <Checkbox checked={filters.salary.indexOf(sal) > -1} />
                <ListItemText primary={sal} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel>Date Posted</InputLabel>
          <Select
            multiple
            value={filters.datePosted}
            onChange={(e) => handleFilterChange(e, "datePosted")}
            input={<OutlinedInput label="Date Posted" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {datePostedOptions.map((date) => (
              <MenuItem key={date} value={date}>
                <Checkbox checked={filters.datePosted.indexOf(date) > -1} />
                <ListItemText primary={date} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          onClick={resetAllFilters}
          sx={{ height: 40, alignSelf: "center", color: "#5c3dac" }}
        >
          Reset All
        </Button>
      </section>

      {/* === Your Original Job List and Details Section === */}
      <div className="jsjd-container">
        {/* LEFT SIDEBAR WITH ALL JOB CARDS */}
        <div className="jsjd-sidebar">
          {filteredJobs.length === 0 && (
            <p style={{ padding: "20px" }}>
              No jobs match your filter criteria.
            </p>
          )}
          {filteredJobs.map((job, index) => (
            <div
              key={job.id}
              className={`jsjd-card ${
                index === selectedIndex ? "jsjd-card-active" : ""
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="jsjd-card-header">
                <div className="jsjd-card-icon">
                  <img src={job.image} alt={`${job.title} icon`} />
                </div>
                <div className="jsjd-card-details">
                  <div className="jsjd-card-title-company">
                    <h3 className="jsjd-card-title">{job.title}</h3>
                    <span className="jsjd-card-company">{job.company}</span>
                  </div>
                  <button
                    className="jsjd-card-bookmark-button"
                    onClick={() => handleBookmarkToggle(job.id)}
                    aria-label={
                      job.bookmarked ? "Remove bookmark" : "Bookmark job"
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className={`bookmark-icon ${
                        job.bookmarked ? "bookmarked" : ""
                      }`}
                      src={job.bookmarked ? bookmark : bookmarkBlank}
                      alt={job.bookmarked ? "Bookmarked" : "Not bookmarked"}
                    />
                  </button>
                </div>
              </div>
              <div className="jsjd-card-info">
                <p>
                  <span className="jsjd-card-info-icon">
                    <SvgIcon component={MapPin} style={{ fill: "none" }} />
                  </span>{" "}
                  {job.location}
                </p>
                <p>
                  <span className="jsjd-card-info-icon">
                    <SvgIcon component={Building} style={{ fill: "none" }} />
                  </span>{" "}
                  {job.type}
                </p>
                <p>
                  <span className="jsjd-card-info-icon">
                    <SvgIcon component={IndianRupee} style={{ fill: "none" }} />
                  </span>{" "}
                  {job.salary}
                </p>
              </div>
              <div className="jsjd-card-tags">
                {job.tags.map((tag, index) => (
                  <span key={index} className="jsjd-card-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="jsjd-card-time">{job.time}</p>
            </div>
          ))}
        </div>

        {/* RIGHT DETAILS PANEL */}

        <div className="jsjd-detail">
          <div className="jsjd-upper-section">
            <div className="jsjd-detail-header">
              <div className="jsjd-detail-title-company">
                <h2 className="jsjd-detail-title">{currentJob.title}</h2>
                 <button
                className="jsjd-card-bookmark-button"
                onClick={() => handleBookmarkToggle(currentJob.id)}
                aria-label={
                  currentJob.bookmarked ? "Remove bookmark" : "Bookmark job"
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  className={`bookmark-icon ${
                    currentJob.bookmarked ? "bookmarked" : ""
                  }`}
                  src={send}
                  alt={currentJob.bookmarked ? "Bookmarked" : "Not bookmarked"}
                />
              </button>
              <button
                className="jsjd-card-bookmark-button"
                onClick={() => handleBookmarkToggle(currentJob.id)}
                aria-label={
                  currentJob.bookmarked ? "Remove bookmark" : "Bookmark job"
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  className={`bookmark-icon ${
                    currentJob.bookmarked ? "bookmarked" : ""
                  }`}
                  src={currentJob.bookmarked ? bookmark : bookmarkBlank}
                  alt={currentJob.bookmarked ? "Bookmarked" : "Not bookmarked"}
                />
              </button>
               
              </div>
              <div className="jsjd-detail-company">
                  {currentJob.company}
                </div>
            </div>
            <hr></hr>
            <div className="jsjd-card-info">
              <div className="jsjd-card-info-grid">
                <p>
                  <span className="jsjd-card-info-icon">
                    <SvgIcon component={MapPin} style={{ fill: "none" }} />
                  </span>{" "}
                  {currentJob.location}
                </p>
                <p>
                  <span className="jsjd-card-info-icon">
                    <SvgIcon component={Building} style={{ fill: "none" }} />
                  </span>{" "}
                  {currentJob.type}
                </p>
                <p>
                  <span className="jsjd-card-info-icon">
                    <SvgIcon component={IndianRupee} style={{ fill: "none" }} />
                  </span>{" "}
                  {currentJob.salary}
                </p>
                <p>
                  <span className="jsjd-card-info-icon">
                    <SvgIcon component={Briefcase} style={{ fill: "none" }} />
                  </span>{" "}
                  {currentJob.experience}
                </p>
                <div className="apply-button-wrapper">
                  <button
                    className="jsjd-apply-button"
                    disabled={currentJob.applied}
                    aria-disabled={currentJob.applied}
                    aria-label={
                      currentJob.applied ? "Already applied" : "Apply to job"
                    }
                    style={{
                      cursor: currentJob.applied ? "not-allowed" : "pointer",
                    }}
                  >
                    {currentJob.applied ? "Applied" : "Apply"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr className="jsjd-divider-section"></hr>
          <div className="jsjd-lower-section">
            <div className="jsjd-card-tags">
              {currentJob.tags.map((tag, index) => (
                <span key={index} className="jsjd-card-tag">
                  {tag}
                </span>
              ))}
            </div>

            <section>
              <h4>Job Summary</h4>
              <p>{currentJob.jobSummary}</p>
            </section>

            {/* Key Responsibilities */}
            <section>
              <h4>Key Responsibilities</h4>
              <ul>
                {currentJob.keyResponsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </section>

            {/* Qualifications & Skills */}
            <section>
              <h4>Qualifications & Skills</h4>
              <ul>
                {currentJob.qualificationsAndSkills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </section>

            {/* Perks & Benefits */}
            <section>
              <h4>Perks & Benefits</h4>
              <ul>
                {currentJob.perksAndBenefits.map((perk, idx) => (
                  <li key={idx}>{perk}</li>
                ))}
              </ul>
            </section>
            <div className="jsjd-apply-note">
              Click on <p className="jsjd-applylink">[Apply Now]</p> to upload
              your resume and portfolio. Shortlisted candidates will be
              contacted within 5 working days.
            </div>

            <hr></hr>
            {/* Company Overview */}
            <section>
              <h4>Company Overview</h4>
              <p>
                <strong>Company Name:</strong>{" "}
                {currentJob.companyOverview.company}
              </p>
              <p>
                <strong>Location:</strong> {currentJob.companyOverview.location}
              </p>
              <p>
                <strong>Industry:</strong> {currentJob.companyOverview.industry}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={currentJob.companyOverview.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {currentJob.companyOverview.website}
                </a>
              </p>
              <p>{currentJob.companyOverview.aboutUs}</p>
            </section>

            {/* Contact Details */}
            <section>
              <h4>Contact Details</h4>
              <p>
                <strong>Recruiter:</strong>{" "}
                {currentJob.contactDetails.recruiterName}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${currentJob.contactDetails.email}`}>
                  {currentJob.contactDetails.email}
                </a>
              </p>
            </section>

            <button className="jsjd-apply-btn">Apply Now</button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="jsjd-pagination">
        <button onClick={handlePrev} disabled={selectedIndex === 0}>
          Prev
        </button>
        <span>
          {filteredJobs.length === 0 ? 0 : selectedIndex + 1} /{" "}
          {filteredJobs.length}
        </span>
        <button
          onClick={handleNext}
          disabled={
            selectedIndex === filteredJobs.length - 1 ||
            filteredJobs.length === 0
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JSJobDetails;
