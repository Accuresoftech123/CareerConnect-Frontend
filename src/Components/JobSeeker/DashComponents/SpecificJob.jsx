import React, { useState, useEffect, useMemo } from "react";
import "../../../Styles/JobSeeker/DashComponents/SpecificJob.css";
import { SvgIcon } from "@mui/material";
import { MapPin, Building, IndianRupee, Briefcase } from "lucide-react";
import bookmark from "../../../Images/bookmark.svg";
import bookmarkBlank from "../../../Images/bookmarkBlank.svg";
import UiUxDesigner from "../../../Images/UiUxDesigner.svg";
import send from "../../../Images/send.svg";
import { useLocation } from 'react-router-dom';

const SpecificJob = () => {
 const location = useLocation();

  // Access the passed state
  const selectedJobId = location.state?.selectedJob;

  useEffect(() => {
    console.log("Selected Job ID:", selectedJobId);
    // You can use this ID to fetch job details from an API, etc.
  }, [selectedJobId]);
 
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
  const selectedJob = JSjobDetails[0];
  //bookmark logic
  const handleBookmarkToggle = (jobId) => {
    const updatedJobs = jobsData.map((job) =>
      job.id === jobId ? { ...job, bookmarked: !job.bookmarked } : job
    );
    setJobsData(updatedJobs);
  };

  return (
    <div>
      {/*  Details Section === */}
      <div className="jsjd-container">
        {/* DETAILS PANEL */}
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
                        selectedJob.bookmarked ? "Bookmarked" : "Not bookmarked"
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
                    <SvgIcon component={IndianRupee} style={{ fill: "none" }} />
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
    </div>
  );
};

export default SpecificJob;
