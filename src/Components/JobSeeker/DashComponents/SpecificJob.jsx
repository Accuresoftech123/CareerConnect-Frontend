import React, { useState, useEffect, useMemo } from "react";
import "../../../Styles/JobSeeker/DashComponents/SpecificJob.css";
import { SvgIcon } from "@mui/material";
import { MapPin, Building, IndianRupee, Briefcase } from "lucide-react";
import bookmark from "../../../Images/bookmark.svg";
import bookmarkBlank from "../../../Images/bookmarkBlank.svg";
import UiUxDesigner from "../../../Images/UiUxDesigner.svg";
import send from "../../../Images/send.svg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../../axiosInstance";

const url = "http://localhost:9191";

const SpecificJob = () => {
  const location = useLocation();
  const selectedJobId = location.state?.selectedJob;

  const [jobData, setJobData] = useState(null);
  //const [recommendedJobs, setRecommendedJobs] = useState([]);

  const applyToJob = async (selectedJobId) => {
    const jobSeekerId = localStorage.getItem("jobSeekerId");
    if (!jobSeekerId) {
      alert("Please log in first.");
      return;
    }

    try {
       const response = await axiosInstance.post(
              `/api/applications/applyjob/${jobSeekerId}/job-post/${selectedJobId}`
            );
     
      alert("Applied Successfully!");
      // const updated = recommendedJobs.map((job) =>
      //   job.id === selectedJobId ? { ...job, applied: true } : job
      // );
      // setRecommendedJobs(updated);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.response?.data || error.message;
      console.error("Application failed:", errorMessage);

      if (errorMessage.includes("already applied")) {
        alert("You have already applied for this job.");
      } else {
        alert("Failed to apply for the job.");
      }
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/jobposts/jobposts/${selectedJobId}`
        );
        setJobData(response.data);
        console.log("Fetched job post:", response.data);
      } catch (error) {
        console.error("Error fetching job post:", error);
      }
    };

    if (selectedJobId) {
      fetchJobDetails();
    }
  }, [selectedJobId]);

  const handleBookmarkToggle = () => {
    if (!jobData) return;
    setJobData({ ...jobData, bookmarked: !jobData.bookmarked });
  };

  if (!jobData) {
    return <div>Loading job details...</div>;
  }
  return (
    <div>
      {/*  Details Section === */}
      <div className="jsjd-container">
        {/* DETAILS PANEL */}
        {jobData && (
          <div className="jsjd-detail">
            <div className="jsjd-upper-section">
              <div className="jsjd-detail-header">
                <div className="jsjd-detail-title-company">
                  <h2 className="jsjd-detail-title">{jobData.title}</h2>

                  <div className="jsjd-icon-buttons">
                    <button
                      className="jsjd-card-bookmark-button"
                      onClick={() => handleBookmarkToggle(jobData.id)}
                      aria-label={
                        jobData.bookmarked ? "Remove bookmark" : "Bookmark job"
                      }
                    >
                      <img
                        className={`bookmark-icon ${
                          jobData.bookmarked ? "bookmarked" : ""
                        }`}
                        src={send}
                        alt="Send"
                      />
                    </button>

                    <button
                      className="jsjd-card-bookmark-button"
                      onClick={() => handleBookmarkToggle(jobData.id)}
                      aria-label={
                        jobData.bookmarked ? "Remove bookmark" : "Bookmark job"
                      }
                    >
                      <img
                        className={`bookmark-icon ${
                          jobData.bookmarked ? "bookmarked" : ""
                        }`}
                        src={jobData.bookmarked ? bookmark : bookmarkBlank}
                        alt={
                          jobData.bookmarked ? "Bookmarked" : "Not bookmarked"
                        }
                      />
                    </button>
                  </div>
                </div>

                <div className="jsjd-detail-company">{jobData.companyName}</div>
              </div>
              <hr></hr>
              <div className="jsjd-card-info">
                <div className="jsjd-card-info-grid">
                  <p>
                    <span className="jsjd-card-info-icon">
                      <SvgIcon component={MapPin} style={{ fill: "none" }} />
                    </span>{" "}
                    {jobData.location}
                  </p>
                  <p>
                    <span className="jsjd-card-info-icon">
                      <SvgIcon component={Building} style={{ fill: "none" }} />
                    </span>{" "}
                    {jobData.employmentType}
                  </p>
                  <p>
                    <span className="jsjd-card-info-icon">
                      <SvgIcon
                        component={IndianRupee}
                        style={{ fill: "none" }}
                      />
                    </span>{" "}
                    {`${jobData.minSalary} - ${jobData.maxSalary}`}
                  </p>
                  <p>
                    <span className="jsjd-card-info-icon">
                      <SvgIcon component={Briefcase} style={{ fill: "none" }} />
                    </span>{" "}
                    {`${jobData.minExperience} - ${jobData.maxExperience} Years`}
                  </p>
                  <div className="apply-button-wrapper">
                    <button
                      className="jsjd-apply-button"
                      onClick={() => applyToJob(selectedJobId)}
                      disabled={jobData.applied}
                      aria-disabled={jobData.applied}
                      aria-label={
                        jobData.applied ? "Already applied" : "Apply to job"
                      }
                      style={{
                        cursor: jobData.applied ? "not-allowed" : "pointer",
                      }}
                    >
                      {jobData.applied ? "Applied" : "Apply"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr className="jsjd-divider-section"></hr>
            <div className="jsjd-lower-section">
              <div className="jsjd-card-tags">
                {(jobData.skills || []).map((tag, index) => (
                  <span key={index} className="jsjd-card-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <section>
                <h4>About Us</h4>
                <p>{jobData.
companyAbout}</p>
              </section>

              {/* Key Responsibilities */}
              <section>
                <h4>Key Responsibilities</h4>
                <ul>
                  {jobData.description?.split("\n").map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </section>

              {/* Qualifications & Skills */}
              <section>
                <h4>Qualifications & Skills</h4>
                <ul>
                  {(jobData.skills || []).map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </section>

              {/* Perks & Benefits */}
              <section>
                <h4>Perks & Benefits</h4>
                <ul>
                  {(jobData.benefits || []).map((perk, idx) => (
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
                  <strong>Company Name:</strong> {jobData.companyName}
                </p>
                <p>
                  <strong>Location:</strong> {jobData.location}
                </p>
                <p>
                  <strong>Industry:</strong> {jobData.companyIndustry}
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={jobData.companyWebsite}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {jobData.companyWebsite}
                  </a>
                </p>
                <p>{jobData.description}</p>
              </section>

              {/* Contact Details */}
              <section>
                <h4>Contact Details</h4>
                <p>
                  <strong>Recruiter:</strong> {jobData.
hrName}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${jobData.companyMail}`}>
                    {jobData.companyMail}
                  </a>
                </p>
              </section>

              <button
                className="jsjd-apply-btn"
                onClick={() => applyToJob(selectedJobId)}
              >
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificJob;
