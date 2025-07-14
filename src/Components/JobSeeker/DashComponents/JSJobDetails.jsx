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
      title: "UI ",
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
      title: "Junior Designer",
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
      title: "Researcher",
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
    {
      id: 5,
      title: "aaa",
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
      id: 6,
      title: "dddr",
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
      id: 7,
      title: "ffffgner",
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
      id: 8,
      title: "vvvv",
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
    {
      id: 9,
      title: "rrrr",
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
      id: 10,
      title: "nnnnnn",
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
      id: 11,
      title: "ttttt",
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
      id: 12,
      title: "hhhhh",
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
  const [jobsData, setJobsData] = useState(JSjobDetails);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // useEffect(() => {
  //   console.log(jobFromDashboard.id)
  //   if (location.state?.jobFromDashboard) {
  //     const jobFromDashboard = location.state.jobFromDashboard;

  //     // Remove it if it already exists to avoid duplication
  //     const filteredJobs = JSjobDetails.filter(j => j.id !== jobFromDashboard.id);

  //     // Add jobFromDashboard at the start
  //     const updatedJobs = [jobFromDashboard, ...filteredJobs];

  //     // Update state
  //     setJobsData(updatedJobs);
  //   } else {
  //     // No job passed from dashboard, set normal list
  //     setJobsData(JSjobDetails);
  //   }
  // }, [location.state]);

  // Extract unique options for filters
  const experienceOptions = [...new Set(jobsData.map((j) => j.experience))];
  const jobTypeOptions = [...new Set(jobsData.map((j) => j.type))];
  const workModeOptions = ["Remote", "In Office", "Hybrid / Remote"]; // predefined
  const locationOptions = [...new Set(jobsData.map((j) => j.location))];
  const salaryOptions = [...new Set(jobsData.map((j) => j.salary))];
  const datePostedOptions = [...new Set(jobsData.map((j) => j.time))];

  // State for filters
const [filters, setFilters] = useState({
  experience: [],
  jobType: [],
  workMode: [],
  location: [],
  salary: [],
  datePosted: [],
  title: "", 
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
  const expMatch =
    filters.experience.length === 0 || filters.experience.includes(job.experience);
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

  return (
    expMatch &&
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
    // If current selected job is not visible in the currentJobs list
    if (
      currentJobs.length > 0 &&
      !currentJobs.some((job) => job.id === selectedJob?.id)
    ) {
      setSelectedJob(currentJobs[0]);
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


  return (
    <div>
      {/* === Your Original Search Section === */}
      <section className="jsjd-search">
        <form onSubmit={handleSearchSubmit}>
          <div className="jsjd-searchinput-container">
            <SvgIcon component={SearchIcon} />
            <input
              type="text"
              name="keywords"
              value={searchValues.keywords}
              onChange={(e) =>
                setSearchValues({ ...searchValues, keywords: e.target.value })
              }
              placeholder="Search jobs by title"
            />
          </div>
          <select
            name="location"
            value={searchValues.location}
            onChange={(e) =>
              setSearchValues({ ...searchValues, location: e.target.value })
            }
          >
            <option disabled value="">
              Select Location
            </option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <select
            name="experience"
            value={searchValues.experience}
            onChange={(e) =>
              setSearchValues({ ...searchValues, experience: e.target.value })
            }
          >
            <option disabled value="">
              Select Experience
            </option>
            {experienceOptions.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
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
                        src={selectedJob.bookmarked ? bookmark : bookmarkBlank}
                        alt={
                          selectedJob.bookmarked
                            ? "Bookmarked"
                            : "Not bookmarked"
                        }
                      />
                    </button>
                  </div>
                </div>

                <div className="jsjd-detail-company">{selectedJob.company}</div>
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
                    {selectedJob.type}
                  </p>
                  <p>
                    <span className="jsjd-card-info-icon">
                      <SvgIcon
                        component={IndianRupee}
                        style={{ fill: "none" }}
                      />
                    </span>{" "}
                    {selectedJob.salary}
                  </p>
                  <p>
                    <span className="jsjd-card-info-icon">
                      <SvgIcon component={Briefcase} style={{ fill: "none" }} />
                    </span>{" "}
                    {selectedJob.experience}
                  </p>
                  <div className="apply-button-wrapper">
                    <button
                      className="jsjd-apply-button"
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
                {selectedJob.tags.map((tag, index) => (
                  <span key={index} className="jsjd-card-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <section>
                <h4>Job Summary</h4>
                <p>{selectedJob.jobSummary}</p>
              </section>

              {/* Key Responsibilities */}
              <section>
                <h4>Key Responsibilities</h4>
                <ul>
                  {selectedJob.keyResponsibilities.map((resp, idx) => (
                    <li key={idx}>{resp}</li>
                  ))}
                </ul>
              </section>

              {/* Qualifications & Skills */}
              <section>
                <h4>Qualifications & Skills</h4>
                <ul>
                  {selectedJob.qualificationsAndSkills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </section>

              {/* Perks & Benefits */}
              <section>
                <h4>Perks & Benefits</h4>
                <ul>
                  {selectedJob.perksAndBenefits.map((perk, idx) => (
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
                  {selectedJob.companyOverview.company}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {selectedJob.companyOverview.location}
                </p>
                <p>
                  <strong>Industry:</strong>{" "}
                  {selectedJob.companyOverview.industry}
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={selectedJob.companyOverview.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {selectedJob.companyOverview.website}
                  </a>
                </p>
                <p>{selectedJob.companyOverview.aboutUs}</p>
              </section>

              {/* Contact Details */}
              <section>
                <h4>Contact Details</h4>
                <p>
                  <strong>Recruiter:</strong>{" "}
                  {selectedJob.contactDetails.recruiterName}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${selectedJob.contactDetails.email}`}>
                    {selectedJob.contactDetails.email}
                  </a>
                </p>
              </section>

              <button className="jsjd-apply-btn">Apply Now</button>
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
