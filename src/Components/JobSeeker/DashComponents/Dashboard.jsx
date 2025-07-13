import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import send from "../../../Images/send.svg";
import bookmark from "../../../Images/bookmark.svg";
import calendarDays from "../../../Images/calendarDays.svg";
import zap from "../../../Images/zap.svg";
import eye from "../../../Images/eye.svg";
import mail from "../../../Images/mail.svg";
import penLine from "../../../Images/penLine.svg";
import bookmarkBlank from "../../../Images/bookmarkBlank.svg";
import productDesigner from "../../../Images/productDesigner.svg";
import UiUxDesigner from "../../../Images/UiUxDesigner.svg";
import UxDesigner from "../../../Images/UxDesigner.svg";
import { SvgIcon } from "@mui/material";
import { MapPin, Building, IndianRupee } from "lucide-react";
import axios from "axios";
import axiosInstance from "../../../axiosInstance";


import "../../../Styles/JobSeeker/DashComponents/Dashboard.css";

const STORAGE_KEY = "recommendedJobs";
const INTERVIEWS_KEY = "upcomingInterviews";

const Dashboard = () => {
  const url = "http://localhost:9191";
  const navigate = useNavigate();

  const initialJobs = async () => {
    try {
      const response = await axiosInstance.get(`/api/jobposts/recruiter`);
      console.log(response.data);

      return response.data;

    } catch (error) {
      console.error("Error fetching job posts:", error);
      return [];
    }
  };
  //save Job Post
  const saveJob = async (jobId) => {
    const jobSeekerId = localStorage.getItem("jobSeekerId"); // or however you're storing it

    try {
      const response = await axiosInstance.post(
        `/api/jobseekers/saved-jobs/save/${jobSeekerId}/${jobId}`
      );

      alert("Job saved successfully!");

      // Optionally update UI locally (toggle bookmark)
      const updated = recommendedJobs.map((job) =>
        job.id === jobId ? { ...job, bookmarked: true } : job
      );
      setRecommendedJobs(updated);
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Failed to save job");
    }
  };


  const initialInterviews = [
    {
      id: 1,
      company: "Oracle Software Pvt Ltd",
      role: "Product Designer",
      datetime: "2025-05-30T11:30:00",
      round: "Technical round 2",
    },
    {
      id: 2,
      company: "Synergy Digital",
      role: "UI UX Designer",
      datetime: "2025-06-03T13:00:00",
      round: "HR discussion",
    },
    {
      id: 3,
      company: "Growth X Solutions Pvt Ltd",
      role: "UI Designer",
      datetime: "2025-06-03T16:00:00",
      round: "HR introduction",
    },
  ];

  // Storage helpers
  const getJobs = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  const seedJobs = (jobs) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    }
  };

  const toggleBookmark = (jobId) => {
    const jobs = getJobs();
    const updated = jobs.map((job) =>
      job.id === jobId ? { ...job, bookmarked: !job.bookmarked } : job
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  };

  const applyToJob = (jobId) => {
    // const jobs = getJobs();
    // const updated = jobs.map((job) =>
    //   job.id === jobId ? { ...job, applied: true } : job
    // );
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // return updated;
  };

  const getInterviews = () => {
    const data = localStorage.getItem(INTERVIEWS_KEY);
    return data ? JSON.parse(data) : [];
  };

  const seedInterviews = (interviews) => {
    if (!localStorage.getItem(INTERVIEWS_KEY)) {
      localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(interviews));
    }
  };

  // Actions for interviews (currently console logs)
  const handleViewInterview = (id) => {
    console.log("View interview", id);
  };

  const handleMessageInterview = (id) => {
    console.log("Message for interview", id);
  };

  const handleEditInterview = (id) => {
    console.log("Edit interview", id);
  };

  // States
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [interviews, setInterviews] = useState([]);

  // Add profile completion state
  const [profileCompletion, setProfileCompletion] = useState(0);

const [count, setCount] = useState(0);
 
     const fetchSavedJobsCount = async () => {
    try {
      const response = await axiosInstance.get(`/api/jobseekers/saved-jobs/count`);
      setCount(response.data);
      console.log('Saved jobs count:', response.data);
    } catch (error) {
      console.error('Error fetching saved jobs count:', error);
    }
  };
  // Add fetch function for profile completion API
  const fetchProfileCompletion = async () => {
    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch("https://api.example.com/profile/completion");
      if (!response.ok) throw new Error("Failed to fetch profile completion");

      const data = await response.json();
      setProfileCompletion(data.profileCompletion || 0);
    } catch (error) {
      console.error("Error fetching profile completion:", error);
      // fallback value if API fails
      setProfileCompletion(70);
    }
  };

  useEffect(() => {
    fetchSavedJobsCount();
    const fetchJobsAndInterviews = async () => {
      const jobsFromApi = await initialJobs();
      setRecommendedJobs(jobsFromApi);


      seedInterviews(initialInterviews);
      setInterviews(getInterviews());

      // Fetch profile completion from API
      fetchProfileCompletion();
    };
    fetchJobsAndInterviews();
  }, []);

  const handleClick = () => {
    navigate("/JobSeekerHome/Job-details");
  };

  const handleBookmarkToggle = (jobId) => {
    const updated = toggleBookmark(jobId);
    setRecommendedJobs(updated);
  };

  const handleApply = (jobId) => {
    const updated = applyToJob(jobId);
    setRecommendedJobs(updated);
  };

  // Stats calculations
  const applicationsSent = recommendedJobs.filter((job) => job.applied).length;
  const savedJobs = recommendedJobs.filter((job) => job.bookmarked).length;
  const jobMatches = recommendedJobs.length;

  return (
    <>
      <div className="JobSeeker-dashboard-content">
        {/* Complete Profile Section */}
        <section className="JobSeeker-dashboard-complete-profile-section">
          <div className="JobSeeker-dashboard-profile-progress">
            <h3>Complete your profile</h3>
            <p>
              {profileCompletion}% profile is completed -{" "}
              {profileCompletion >= 100
                ? "All done!"
                : profileCompletion >= 80
                  ? "Almost there"
                  : "Keep going"}
            </p>
            <div className="JobSeeker-dashboard-progress-bar-container">
              <div
                className="JobSeeker-dashboard-progress-bar"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
          </div>
          <button
            className="JobSeeker-dashboard-complete-profile-button"
            onClick={() => alert("Complete profile clicked")}
            aria-label="Complete your profile"
            style={{ cursor: "pointer" }}
          >
            Complete profile
          </button>
        </section>

        {/* Stats Section */}
        <section className="JobSeeker-dashboard-stats" aria-label="Dashboard statistics">
          {[
            {
              label: "Application sent",
              icon: send,
              value: applicationsSent,
              change: "↑ 25% from last month",
            },
            {
              label: "Saved jobs",
              icon: bookmark,
              value: count,
              change: "↑ 5 new for this week",
            },
            {
              label: "Interview scheduled",
              icon: calendarDays,
              value: interviews.length,
              change: "↑ 2 more than last week",
            },
            {
              label: "Today's job matches",
              icon: zap,
              value: jobMatches,
              change: null,
              link: "View all matches",
            },
          ].map(({ label, icon, value, change, link }, i) => (
            <div key={i} className="JobSeeker-dashboard-stat-card">
              <div className="JobSeeker-dashboard-stat-info">
                <p className="JobSeeker-dashboard-stat-label">{label}</p>
              </div>
              <div className="JobSeeker-dashboard-stat-icon">
                <img src={icon} alt={label} />
                <p className="JobSeeker-dashboard-stat-value">{value}</p>
              </div>
              {change && <p className="JobSeeker-dashboard-stat-change">{change}</p>}
              {link && (
                <p className="JobSeeker-dashboard-stat-link" style={{ cursor: "pointer" }}>
                  {link}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Recommended Jobs */}
        <section className="JobSeeker-dashboard-JobSeeker-recommended-jobs">
          <h3>Recommended for your</h3>
          <div className="JobSeeker-dashboard-cards-container">
            {recommendedJobs.map((job) => (
              <article
                key={job.id}
                className="JobSeeker-dashboard-card"
                aria-label={`${job.title} at ${job.company}`}
              >
                <div className="JobSeeker-dashboard-header">
                  <div className="JobSeeker-dashboard-icon">
                    <img src={job.image ? job.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/2560px-Wipro_Primary_Logo_Color_RGB.svg.png"} alt={`${job.title} icon`} />
                  </div>
                  <div className="JobSeeker-dashboard-details">
                    <div className="JobSeeker-dashboard-title-company">
                      <span className="JobSeeker-dashboard-title">{job.title}</span>
                      <span className="JobSeeker-dashboard-company">{job.company}</span>

                    </div>
                    <button
                      className="JobSeeker-dashboard-bookmark-button"
                      onClick={() => saveJob(job.id)}
                      aria-label={job.bookmarked ? "Remove bookmark" : "Bookmark job"}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        className={`bookmark-icon ${job.bookmarked ? "bookmarked" : ""}`}
                        src={job.bookmarked ? bookmark : bookmarkBlank}
                        alt={job.bookmarked ? "Bookmarked" : "Not bookmarked"}
                      />
                    </button>
                  </div>
                </div>
                <div className="JobSeeker-dashboard-info">
                  <p>
                    <span className="JobSeeker-dashboard-info-icon">
                      <SvgIcon component={MapPin} />
                    </span>{" "}
                    {job.location}
                  </p>
                  <p>
                    <span className="JobSeeker-dashboard-info-icon">
                      <Building />
                    </span>{" "}
                    {job.employmentType}
                  </p>
                  <p>
                    <span className="JobSeeker-dashboard-info-icon">
                      <IndianRupee />
                    </span>{" "}
                    {job.minSalary} to {job.maxSalary}
                  </p>
                </div>
                <div className="JobSeeker-dashboard-tags">
                  {Array.isArray(job.skills) &&
                    job.skills.map((skills, index) => (
                      <span key={index} className="JobSeeker-dashboard-tag">
                        {skills}
                      </span>
                    ))}
                </div>


                <div className="JobSeeker-dashboard-button-group">
                  <button
                    className="JobSeeker-dashboard-apply-button"
                    disabled={job.applied}
                    // onClick={() => handleApply(job.id)}
                    aria-disabled={job.applied}
                    aria-label={job.applied ? "Already applied" : "Apply to job"}
                    style={{ cursor: job.applied ? "not-allowed" : "pointer" }}
                  >
                    {job.applied ? "Applied" : "Apply"}
                  </button>
                  <button
                    onClick={handleClick}
                    className="JobSeeker-dashboard-details-button"
                    aria-label="View job details"
                    style={{ cursor: "pointer" }}
                  >
                    Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Upcoming Interviews */}
        <section className="JobSeeker-dashboard-upcoming-interviews" aria-label="Upcoming interviews">
          <div className="JobSeeker-dashboard-icon">
            <img src={calendarDays} alt="Calendar icon" />
          </div>
          <h3>Upcoming Interviews</h3>
          <button
            className="JobSeeker-dashboard-view-all-button"
            onClick={() => navigate("/interviews")}
            aria-label="View all interviews"
            style={{ cursor: "pointer" }}
          >
            View all
          </button>
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Job Title</th>
                <th>Date & Time</th>
                <th>Interview Round</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No upcoming interviews
                  </td>
                </tr>
              ) : (
                interviews.map((interview) => (
                  <tr key={interview.id}>
                    <td>{interview.company}</td>
                    <td>{interview.role}</td>
                    <td>
                      {new Date(interview.datetime).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>{interview.round}</td>
                    <td className="JobSeeker-dashboard-interview-actions">
                      <div
                        className="JobSeeker-dashboard-upcoming-interviews-Eye"
                        onClick={() => handleViewInterview(interview.id)}
                        style={{ cursor: "pointer" }}
                        role="button"
                        tabIndex={0}
                        aria-label="View interview details"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleViewInterview(interview.id);
                        }}
                      >
                        <img src={eye} alt="View" />
                      </div>
                      <div
                        className="JobSeeker-dashboard-upcoming-interviews-Mail"
                        onClick={() => handleMessageInterview(interview.id)}
                        style={{ cursor: "pointer" }}
                        role="button"
                        tabIndex={0}
                        aria-label="Message about interview"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleMessageInterview(interview.id);
                        }}
                      >
                        <img src={mail} alt="Message" />
                      </div>
                      <div
                        className="JobSeeker-dashboard-upcoming-interviews-Edit"
                        onClick={() => handleEditInterview(interview.id)}
                        style={{ cursor: "pointer" }}
                        role="button"
                        tabIndex={0}
                        aria-label="Edit interview details"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") handleEditInterview(interview.id);
                        }}
                      >
                        <img src={penLine} alt="Edit" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Dashboard;

