import React, { useState, useEffect, useMemo } from "react";
import "../../../Styles/JobSeeker/DashComponents/JSJobDetails.css";
import SearchIcon from "@mui/icons-material/Search";
import { SvgIcon } from "@mui/material";
import { MapPin, Building, IndianRupee, Briefcase } from "lucide-react";
import bookmark from "../../../Images/bookmark.svg";
import bookmarkBlank from "../../../Images/bookmarkBlank.svg";
import UiUxDesigner from "../../../Images/UiUxDesigner.svg";
import UxDesigner from "../../../Images/UxDesigner.svg";
import send from "../../../Images/send.svg";
import { useLocation } from "react-router-dom";

import axios from "axios";
import axiosInstance from "../../../axiosInstance";

import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Box,
} from "@mui/material";

//const url = "http://localhost:9191"; // Update with your actual API URL

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const JSJobDetails = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;
  const [selectedJob, setSelectedJob] = useState(null);
  // Calculate indexes
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  //search bar
  const [searchValues, setSearchValues] = useState({
    keywords: "",
    location: "",
    experience: "", // or experience if that's what it really is
  });

  const [jobsData, setJobsData] = useState([]);

  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [savingJobId, setSavingJobId] = useState(null);

  const initialJobs = async () => {
    const jobSeekerId = localStorage.getItem("jobSeekerId");
    try {
      // const response = await axios.get(`${url}/jobposts/recruiters/jobposts`);
      const response = await axiosInstance.get(
        `/api/jobposts/all-jobs/${jobSeekerId}`
      );
      //       const response = await axiosInstance.get(
      //   `/api/jobposts/jobseeker/${jobSeekerId}/recommended`
      // );
      console.log(response);
      setJobsData(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching job posts:", error);
      setJobsData([]);
      return [];
    }
  };

  //save Job Post
  const saveJob = async (jobId) => {
    const jobSeekerId = localStorage.getItem("jobSeekerId");

    handleBookmarkToggle(jobId);

    try {
      const response = await axiosInstance.post(
        `/api/jobseekers/saved-jobs/save/${jobSeekerId}/${jobId}`
      );
      // fetchSavedJobsCount();
      alert("Job saved successfully!");

      setJobsData((prevJobs) => {
        const updatedJobs = prevJobs.map((job) =>
          job.id === jobId ? { ...job, bookmarked: true } : job
        );

        // ✅ Also update selectedJob if it matches
        const updatedSelected = updatedJobs.find(
          (job) => job.id === selectedJob?.id
        );
        if (updatedSelected) {
          setSelectedJob(updatedSelected);
        }

        return updatedJobs;
      });
    } catch (error) {
      // If 409 Conflict (already saved), do nothing — we still want to show it as bookmarked
      if (error.response?.status === 409) {
        setRecommendedJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === jobId ? { ...job, bookmarked: true } : job
          )
        );
        console.warn("Job is already saved. Keeping bookmark icon active.");
        alert("Job is already saved!");
      } else {
        // For other errors, rollback the UI
        alert("Something went wrong while saving the job.");
      }
    } finally {
      setSavingJobId(null);
    }
  };

  // unsaved job
  const unsaveJob = async (jobId) => {
    const jobSeekerId = localStorage.getItem("jobSeekerId");
    setSavingJobId(jobId);

    try {
      await axiosInstance.delete(
        `/api/jobseekers/saved-jobs/remove/${jobSeekerId}/${jobId}`
      );
      //console.log("Job removed from saved list");
      alert("unsaved successfully!");

      setJobsData((prevJobs) => {
        const updatedJobs = prevJobs.map((job) =>
          job.id === jobId ? { ...job, bookmarked: false } : job
        );

        // ✅ Also update selectedJob if it matches
        const updatedSelected = updatedJobs.find(
          (job) => job.id === selectedJob?.id
        );
        if (updatedSelected) {
          setSelectedJob(updatedSelected);
        }

        return updatedJobs;
      });
    } catch (error) {
      console.error("Unsave Job Error:", error);
      alert("Something went wrong while removing the job.");
    } finally {
      setSavingJobId(null);
    }
  };

  const handleBookmarkClick = (jobId, isBookmarked) => {
    if (isBookmarked) {
      unsaveJob(jobId);
    } else {
      saveJob(jobId);
    }
  };

  useEffect(() => {
    initialJobs();
  }, []);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Extract unique options for filters
  const experienceOptions = [
    ...new Set(
      (jobsData || [])
        .map((j) => `${j.minExperience} - ${j.maxExperience} yrs`)
        .filter(Boolean)
    ),
  ];

  const jobTypeOptions = [
    ...new Set((jobsData || []).map((j) => j.employmentType).filter(Boolean)),
  ];

  const workModeOptions = ["Remote", "In Office", "Hybrid / Remote"]; // static

  const locationOptions = [
    ...new Set((jobsData || []).map((j) => j.location).filter(Boolean)),
  ];

  const salaryOptions = [
    ...new Set(
      (jobsData || [])
        .map((j) => `${j.minSalary} - ${j.maxSalary}`)
        .filter(Boolean)
    ),
  ];

  const datePostedOptions = [
    ...new Set((jobsData || []).map((j) => j.postedDate).filter(Boolean)),
  ];

  // State for filters
  const [filters, setFilters] = useState({
    experience: [],
    jobType: [],
    workMode: [],
    location: [],
    salary: [],
    datePosted: [],
    title: "",
    skills: [], // NEW
  });

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
      title: "", // clear search input filter
    });
    setSearchValues({
      keywords: "",
      location: "",
      experience: "",
    });
    setSelectedIndex(0);
  };

  // Filter jobs based on filters
  const filteredJobs = jobsData.filter((job) => {
    if (filters.experience) {
      const exp = parseInt(filters.experience);
      if (
        parseInt(job.minExperience) > exp ||
        parseInt(job.maxExperience) < exp
      )
        return false;
    }

    const jobTypeMatch =
      filters.jobType.length === 0 || filters.jobType.includes(job.type);
    const workModeMatch =
      filters.workMode.length === 0 || filters.workMode.includes(job.workMode);
    const locationMatch =
      filters.location.length === 0 || filters.location.includes(job.location);
    const salaryMatch =
      filters.salary.length === 0 || filters.salary.includes(job.salary);
    const datePostedMatch =
      filters.datePosted.length === 0 || filters.datePosted.includes(job.time);
    const titleMatch =
      filters.title === "" || job.title.toLowerCase().includes(filters.title);
    if (filters.skills && filters.skills.length > 0) {
      if (
        !filters.skills.every((skill) =>
          job.skills.includes(skill.toLowerCase())
        )
      )
        return false;
    }

    return (
      experienceOptions &&
      jobTypeMatch &&
      workModeMatch &&
      locationMatch &&
      salaryMatch &&
      datePostedMatch &&
      titleMatch
    );
  });

  useEffect(() => {
    setSearchValues({
      ...searchValues,
      location: filters.location[0] || "",
      experience: filters.experience[0] || "",
      keywords: filters.title || "",
    });
  }, [filters]);

  //bookmark logic
  const handleBookmarkToggle = (jobId) => {
    const updatedJobs = jobsData.map((job) =>
      job.id === jobId ? { ...job, bookmarked: !job.bookmarked } : job
    );
    setJobsData(updatedJobs);
  };
  const currentJobs = useMemo(() => {
    return filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  }, [filteredJobs, currentPage]);

  useEffect(() => {
    if (
      currentJobs.length > 0 &&
      !currentJobs.some((job) => job.id === selectedJob?.id)
    ) {
      setSelectedJob(currentJobs[0]);
    } else if (currentJobs.length === 0) {
      setSelectedJob(null); // ✅ Clear when no jobs available
    }
  }, [currentJobs]);

  // Total pages
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handleNumberPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //search function
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setFilters((prev) => ({
      ...prev,
      location: searchValues.location ? [searchValues.location] : [],
      experience: searchValues.experience ? [searchValues.experience] : [],
      title: searchValues.keywords ? searchValues.keywords.toLowerCase() : "",
    }));

    setCurrentPage(1); // Reset to first page
  };

  const applyToJob = async (jobId) => {
    const jobSeekerId = localStorage.getItem("jobSeekerId");
    if (!jobSeekerId) {
      alert("Please log in first.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/api/applications/applyjob/${jobSeekerId}/job-post/${jobId}`
      );
      //  fetchApplicationCount();
      alert("Applied Successfully!");
    } catch (error) {
      console.error("Full error object:", error);
      let errorMessage =
        error.response?.data?.message ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message;

      console.error("Application failed:", errorMessage);

      // ✅ Null-safe and case-insensitive
      const normalizedMessage = errorMessage?.toLowerCase() || "";

      if (normalizedMessage.includes("already applied")) {
        alert("You have already applied for this job.");
      } else {
        alert("Failed to apply for the job.");
      }
    }
  };

  return (
    <div>
      {/* === Your Original Search Section === */}
      <section className="jsjd-search">
        <form onSubmit={handleSearchSubmit}>
          <div className="jsjd-searchinput-container">
            <SvgIcon component={SearchIcon} />
            <input
            className="searchbyjob"
              type="text"
              name="keywords"
              value={searchValues.keywords}
              onChange={(e) =>
                setSearchValues({ ...searchValues, keywords: e.target.value })
              }
              placeholder="Search jobs by title"
            />
          </div>
          <input
          className="searchby"
            type="text"
            list="location-options"
            name="location"
            value={searchValues.location}
            onChange={(e) =>
              setSearchValues({ ...searchValues, location: e.target.value })
            }
            placeholder="Select or type location"
          />
          <datalist id="location-options">
            {locationOptions.map((loc) => (
              <option key={loc} value={loc} />
            ))}
          </datalist>

          <input
          className="searchby"
            type="text"
            list="experience-options"
            name="experience"
            value={searchValues.experience}
            onChange={(e) =>
              setSearchValues({ ...searchValues, experience: e.target.value })
            }
            placeholder="Select or type experience"
          />
          <datalist id="experience-options">
            {experienceOptions.map((exp) => (
              <option key={exp} value={exp} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </section>

      {/* === New Filters Section with Select Dropdowns with Checkboxes === */}
      <section
        className="jsjd-filters"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <h4>Filters</h4>

        {/* Experience */}
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel sx={{ fontSize: "12px" }}>Experience</InputLabel>
          <Select
            multiple
            value={filters.experience}
            onChange={(e) => handleFilterChange(e, "experience")}
            input={
              <OutlinedInput
                label="Experience"
                startAdornment={
                  filters.experience.length > 0 ? (
                    <Box
                      sx={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "12px",
                        px: 1,
                        fontSize: "12px",
                        mr: 1,
                      }}
                    >
                      {filters.experience.length}
                    </Box>
                  ) : null
                }
              />
            }
            renderValue={() => ""}
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

        {/* Job Type */}
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel sx={{ fontSize: "12px" }}>Job Type</InputLabel>
          <Select
            multiple
            value={filters.jobType}
            onChange={(e) => handleFilterChange(e, "jobType")}
            input={
              <OutlinedInput
                label="Job Type"
                startAdornment={
                  filters.jobType.length > 0 ? (
                    <Box
                      sx={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "12px",
                        px: 1,
                        fontSize: "12px",
                        mr: 1,
                      }}
                    >
                      {filters.jobType.length}
                    </Box>
                  ) : null
                }
              />
            }
            renderValue={() => ""}
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

        {/* Work Mode */}
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel sx={{ fontSize: "12px" }}>Work Mode</InputLabel>
          <Select
            multiple
            value={filters.workMode}
            onChange={(e) => handleFilterChange(e, "workMode")}
            input={
              <OutlinedInput
                label="Work Mode"
                startAdornment={
                  filters.workMode.length > 0 ? (
                    <Box
                      sx={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "12px",
                        px: 1,
                        fontSize: "12px",
                        mr: 1,
                      }}
                    >
                      {filters.workMode.length}
                    </Box>
                  ) : null
                }
              />
            }
            renderValue={() => ""}
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

        {/* Location */}
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel sx={{ fontSize: "12px" }}>Location</InputLabel>
          <Select
            multiple
            value={filters.location}
            onChange={(e) => handleFilterChange(e, "location")}
            input={
              <OutlinedInput
                label="Location"
                startAdornment={
                  filters.location.length > 0 ? (
                    <Box
                      sx={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "12px",
                        px: 1,
                        fontSize: "12px",
                        mr: 1,
                      }}
                    >
                      {filters.location.length}
                    </Box>
                  ) : null
                }
              />
            }
            renderValue={() => ""}
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

        {/* Salary */}
        <FormControl sx={{ minWidth: 100 }} size="small">
          <InputLabel sx={{ fontSize: "12px" }}>Salary</InputLabel>
          <Select
            multiple
            value={filters.salary}
            onChange={(e) => handleFilterChange(e, "salary")}
            input={
              <OutlinedInput
                label="Salary"
                startAdornment={
                  filters.salary.length > 0 ? (
                    <Box
                      sx={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "12px",
                        px: 1,
                        fontSize: "12px",
                        mr: 1,
                      }}
                    >
                      {filters.salary.length}
                    </Box>
                  ) : null
                }
              />
            }
            renderValue={() => ""}
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

        {/* Date Posted */}
        <FormControl sx={{ minWidth: 110 }} size="small">
          <InputLabel sx={{ fontSize: "12px" }}>Date Posted</InputLabel>
          <Select
            multiple
            value={filters.datePosted}
            onChange={(e) => handleFilterChange(e, "datePosted")}
            input={
              <OutlinedInput
                label="Date Posted"
                startAdornment={
                  filters.datePosted.length > 0 ? (
                    <Box
                      sx={{
                        backgroundColor: "#e0e0e0",
                        borderRadius: "12px",
                        px: 1,
                        fontSize: "12px",
                        mr: 1,
                      }}
                    >
                      {filters.datePosted.length}
                    </Box>
                  ) : null
                }
              />
            }
            renderValue={() => ""}
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

        {/* Reset Button */}
        <Button
          onClick={resetAllFilters}
          sx={{ height: 40, alignSelf: "center", color: "#5c3dac" }}
        >
          Reset All
        </Button>
      </section>
      {/* <section>
        <h1>Showing {totalPages} results for searchTerm in searchLocation</h1>

      </section> */}
      {/* === Your Original Job List and Details Section === */}
      <div className="jsjd-container">
        {/* LEFT SIDEBAR WITH ALL JOB CARDS */}
        <div className="jsjd-sidebar">
          {currentJobs.length === 0 && (
            <p style={{ padding: "20px" }}>
              No jobs match your filter criteria.
            </p>
          )}
          {currentJobs.map((job, index) => (
            <div
              key={job.id}
              className={`jsjd-card ${
                selectedJob?.id === job.id ? "jsjd-card-active" : ""
              }`}
              onClick={() => setSelectedJob(job)}
            >
              <div className="jsjd-card-header">
                <div className="jsjd-card-icon">
                 {job.companyImageUrl ? (
  <img src={job.companyImageUrl} alt={`${job.title} icon`} />
) : (
  <div className="company-placeholder">
    {job.companyName.charAt(0).toUpperCase()}
  </div>
)}

                </div>
                <div className="jsjd-card-details">
                  <div className="jsjd-card-title-company">
                    <h3 className="jsjd-card-title">{job.title}</h3>
                    <span className="jsjd-card-company">{job.companyName}</span>
                  </div>
                  <button
                    className="JobSeeker-dashboard-bookmark-button"
                    onClick={() => handleBookmarkClick(job.id, job.bookmarked)}
                    aria-label={
                      job.bookmarked ? "Remove bookmark" : "Bookmark job"
                    }
                    disabled={savingJobId === job.id}
                    style={{
                      cursor: "pointer",
                      border: "none",
                      background: "transparent",
                    }}
                  >
                    <img
                      className={`bookmark-icon ${
                        job.bookmarked ? "bookmarked" : ""
                      }`}
                      src={job.bookmarked ? bookmark : bookmarkBlank}
                      alt={job.bookmarked ? "Bookmarked" : "Not bookmarked"}
                      style={{ width: "24px", height: "24px" }}
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
                  {job.employmentType}
                </p>
                <p>
                  <span className="jsjd-card-info-icon">
                    <SvgIcon component={IndianRupee} style={{ fill: "none" }} />
                  </span>{" "}
                  {`${job.minSalary} - ${job.maxSalary}`}
                </p>
              </div>
              <div className="jsjd-card-tags">
                {job.skills &&
                  job.skills.map((skill, index) => (
                    <span key={index} className="jsjd-card-tag">
                      {skill}
                    </span>
                  ))}
              </div>
              <p className="jsjd-card-time">{job.postedDate}</p>
            </div>
          ))}
        </div>

        {/* RIGHT DETAILS PANEL */}
        {selectedJob && (
          <div className="jsjd-detail">
            <div className="jsjd-upper-section">
              <div className="jsjd-detail-header">
                <div className="jsjd-detail-title-company">
                  <h2 className="jsjd-detail-title">{selectedJob.title}</h2>

                  <div className="jsjd-icon-buttons">
                    <button
                      className="jsjd-card-bookmark-button"
                      onClick={() => handleBookmarkToggle(selectedJob.id)}
                      aria-label={
                        selectedJob.bookmarked
                          ? "Remove bookmark"
                          : "Bookmark job"
                      }
                    >
                      <img
                        className={`bookmark-icon ${
                          selectedJob.bookmarked ? "bookmarked" : ""
                        }`}
                        src={send}
                        alt="Send"
                      />
                    </button>

                    <button
                      className="JobSeeker-dashboard-bookmark-button"
                      onClick={() =>
                        handleBookmarkClick(
                          selectedJob.id,
                          selectedJob.bookmarked
                        )
                      }
                      aria-label={
                        selectedJob.bookmarked
                          ? "Remove bookmark"
                          : "Bookmark job"
                      }
                      disabled={savingJobId === selectedJob.id}
                      style={{
                        cursor: "pointer",
                        border: "none",
                        background: "transparent",
                      }}
                    >
                      <img
                        className={`bookmark-icon ${
                          selectedJob.bookmarked ? "bookmarked" : ""
                        }`}
                        src={selectedJob.bookmarked ? bookmark : bookmarkBlank}
                        alt={
                          selectedJob.bookmarked
                            ? "Bookmarked"
                            : "Not bookmarked"
                        }
                        style={{ width: "24px", height: "24px" }}
                      />
                    </button>
                  </div>
                </div>

                <div className="jsjd-detail-company">
                  {selectedJob.companyName}
                </div>
              </div>
              <hr></hr>
              <div className="jsjd-card-info">
                <div className="jsjd-card-info-grid">
                  <p>
                    <span className="jsjd-card-info-icon">
                      <SvgIcon component={MapPin} style={{ fill: "none" }} />
                    </span>{" "}
                    {selectedJob.location}
                  </p>
                  <p>
                    <span className="jsjd-card-info-icon">
                      <SvgIcon component={Building} style={{ fill: "none" }} />
                    </span>{" "}
                    {selectedJob.employmentType}
                  </p>
                  <p>
                    <span className="jsjd-card-info-icon">
                      <SvgIcon
                        component={IndianRupee}
                        style={{ fill: "none" }}
                      />
                    </span>{" "}
                    {`${selectedJob.minSalary} - ${selectedJob.maxSalary}`}
                  </p>
                  <p>
                    <span className="jsjd-card-info-icon">
                      <SvgIcon component={Briefcase} style={{ fill: "none" }} />
                    </span>{" "}
                    {`${selectedJob.minExperience} - ${selectedJob.maxExperience} Years`}
                  </p>
                  <div className="apply-button-wrapper">
                    <button
                      className="jsjd-apply-button"
                      onClick={() => applyToJob(selectedJob.id)}
                      disabled={selectedJob.applied}
                      aria-disabled={selectedJob.applied}
                      aria-label={
                        selectedJob.applied ? "Already applied" : "Apply to job"
                      }
                      style={{
                        cursor: selectedJob.applied ? "not-allowed" : "pointer",
                      }}
                    >
                      {selectedJob.applied ? "Applied" : "Apply"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr className="jsjd-divider-section"></hr>
            <div className="jsjd-lower-section">
              <div className="jsjd-card-tags">
                {selectedJob.skills?.map((tag, index) => (
                  <span key={index} className="jsjd-card-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <section>
                <h4>About Us</h4>
                <p>{selectedJob.companyAbout}</p>
              </section>

              {/* Key Responsibilities */}
              <section>
                <h4>Key Responsibilities</h4>
                <ul>
                  {selectedJob.description?.split("\n").map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </section>

              {/* Qualifications & Skills */}
              {/* <section>
                <h4>Qualifications & Skills</h4>
                <ul>
                  {selectedJob.skills?.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </section> */}

              {/* Perks & Benefits */}
              <section>
                <h4>Perks & Benefits</h4>
                <ul>
                  {selectedJob.benefits?.map((perk, idx) => (
                    <li key={idx}>{perk}</li>
                  ))}
                </ul>
              </section>
              {/* <div className="jsjd-apply-note">
                Click on <p className="jsjd-applylink">[Apply Now]</p> to upload
                your resume and portfolio. Shortlisted candidates will be
                contacted within 5 working days.
              </div> */}

              <hr></hr>
              {/* Company Overview */}
              <section>
                <h4>Company Overview</h4>
                <p>
                  <strong>Company Name:</strong> {selectedJob.companyName}
                </p>
                <p>
                  <strong>Location:</strong> {selectedJob?.location}
                </p>
                <p>
                  <strong>Industry:</strong> {selectedJob?.companyIndustry}
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={selectedJob.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {selectedJob.companyWebsite}
                  </a>
                </p>
                <p>{selectedJob.aboutUs}</p>
              </section>

              {/* Contact Details */}
              <section>
                <h4>Contact Details</h4>
                <p>
                  <strong>Recruiter:</strong> {selectedJob.hrName}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${selectedJob.companyMail}`}>
                    {selectedJob.companyMail}
                  </a>
                </p>
              </section>

              <button
                className="jsjd-apply-btn"
                onClick={() => applyToJob(selectedJob.id)}
              >
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="jsjd-pagination-controls">
        <button
          onClick={() => handlePreviousPage()}
          disabled={currentPage === 1}
          className="jsjd-pagination-button"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleNumberPage(i + 1)}
            className={
              currentPage === i + 1
                ? "jsjd-pagination-active-page"
                : "jsjd-pagination-numbers"
            }
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handleNextPage()}
          className="jsjd-pagination-button"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JSJobDetails;
