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
  // States
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [interviews, setInterviews] = useState([]);

  // Add profile completion state
  const [profileCompletion, setProfileCompletion] = useState(0);

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
  const jobSeekerId = localStorage.getItem("jobSeekerId");

  handleBookmarkToggle(jobId);

    try {
      const response = await axiosInstance.post(
        `/api/jobseekers/saved-jobs/save/${jobSeekerId}/${jobId}`
      );
      fetchSavedJobsCount();
    alert("Job saved successfully!");

      // Optionally update UI locally (toggle bookmark)
      const updated = recommendedJobs.map((job) =>
      job.id === jobId ? { ...job, bookmarked: true } : job
    );
    setRecommendedJobs(updated);
  } catch (error) {
  if (error.response?.status === 409) {
    alert("Job is already saved!");
  } 
  else if (error.response?.status === 404) {
    alert("Job or job seeker not found.{jobSeekerId}");
  } else {
    alert("Failed to save job.");
  }
}

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
       fetchApplicationCount();
      alert("Applied Successfully!");
      const updated = recommendedJobs.map((job) =>
        job.id === jobId ? { ...job, applied: true } : job
      );
      setRecommendedJobs(updated);
    } catch (error) {

      console.error("Full error object:", error);
     let errorMessage = error.response?.data?.message 
      || (typeof error.response?.data === 'string' ? error.response.data : null)
      || error.message;

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

  const [count, setCount] = useState(0);

  const fetchSavedJobsCount = async () => {
     const jobSeekerId = localStorage.getItem("jobSeekerId");
    try {
       const response = await axiosInstance.get(`/api/jobseekers/saved-jobs/count/${jobSeekerId}`);
     
      setCount(response.data);
      console.log("Saved jobs count:", response.data);
    } catch (error) {
      console.error("Error fetching saved jobs count:", error);
    }
  };
  // Add fetch function for profile completion API
  // const fetchProfileCompletion = async () => {
  //    const jobSeekerId = localStorage.getItem("jobSeekerId");
  //   try {
  //     // Replace this URL with your actual API endpoint
  //     const response = axiosInstance.get(
  //       `/api/jobseekers/${jobSeekerId}/profile-completion`
  //     );
  //       console.log(response.data);
  //     if (!response.ok) throw new Error("Failed to fetch profile completion");

  //     const data =  response.json();
  //     setProfileCompletion(data.profileCompletion || 0);
  //   } catch (error) {
  //     console.error("Error fetching profile completion:", error);
  //     // fallback value if API fails
  //     setProfileCompletion(70);
  //   }
  // };

  const fetchProfileCompletion = async () => {
  const jobSeekerId = localStorage.getItem("jobSeekerId");
  try {
    const response = await axiosInstance.get(
      `/api/jobseekers/${jobSeekerId}/profile-completion`
    );

    console.log("Profile completion response:", response.data);

    // Set the value, fallback to 0 if not found
    setProfileCompletion(response.data.profileCompletion || 0);
  } catch (error) {
    console.error("Error fetching profile completion:", error);
    // fallback value if API fails
    setProfileCompletion(70);
  }
};


  const fetchJobsAndInterviews = async () => {
    const jobsFromApi = await initialJobs();
    setRecommendedJobs(jobsFromApi);

    seedInterviews(initialInterviews);
    setInterviews(getInterviews());

    // Fetch profile completion from API
    fetchProfileCompletion();
  };

  // useEffect(() => {
  //   fetchSavedJobsCount();

  //   fetchJobsAndInterviews();
  // }, []);

  const handleClick = (jobId) => {
    navigate("/JobSeekerHome/SpecificJob", { state: { selectedJob: jobId } });
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
 
  //    const fetchSavedJobsCount = async () => {
  //   try {
  //     const response = await axios.get(`${url}/jobseekers/saved-jobs/count`);
  //     setCount(response.data);
  //     console.log('Saved jobs count:', response.data);
  //   } catch (error) {
  //     console.error('Error fetching saved jobs count:', error);
  //   }
  // };
  // Add fetch function for profile completion API
  // const fetchProfileCompletion = async () => {
  //   try {
  //     // Replace this URL with your actual API endpoint
  //     const response = await fetch("https://api.example.com/profile/completion");
  //     if (!response.ok) throw new Error("Failed to fetch profile completion");

  //     const data = await response.json();
  //     setProfileCompletion(data.profileCompletion || 0);
  //   } catch (error) {
  //     console.error("Error fetching profile completion:", error);
  //     // fallback value if API fails
  //     setProfileCompletion(70);
  //   }
  // };

//Application send
const [applicationCount, setApplicationCount] = useState(0);
const fetchApplicationCount = async () => {
  const jobSeekerId = localStorage.getItem("jobSeekerId");
  try {
    const response = await axiosInstance.get(`/api/applications/jobseeker/${jobSeekerId}/applied-jobs/count`);
    setApplicationCount(response.data);
    
  } catch (error) {
    console.error("Error fetching application count:", error);
  }
};

// Todays matche JobPosts
const [jobMatchCount, setJobMatchCount]= useState(0);
const fetchMatchJobCount = async () => {
  const jobSeekerId = localStorage.getItem("jobSeekerId");
  try {
    const response = await axiosInstance.get(`/api/jobposts/today-matches-count/${jobSeekerId}`);
    setJobMatchCount(response.data);
    
  } catch (error) {
    console.error("Error fetching application count:", error);
  }
};

useEffect(() => {
  const fetchAllDashboardData = async () => {
    fetchSavedJobsCount();      // fetch count of saved jobs
    fetchApplicationCount();    // fetch count of applied jobs
     fetchMatchJobCount();
    const jobsFromApi = await initialJobs(); // fetch recommended jobs
    setRecommendedJobs(jobsFromApi);

    seedInterviews(initialInterviews);      // seed interview list
    setInterviews(getInterviews());         // get interviews from storage

    fetchProfileCompletion();               // fetch profile completion
  };

  fetchAllDashboardData(); // run all API/data fetching in one go
}, []);



  // useEffect(() => {
  //   fetchSavedJobsCount();
  //   fetchApplicationCount();
  //   const fetchJobsAndInterviews = async () => {
  //     const jobsFromApi = await initialJobs();
  //     setRecommendedJobs(jobsFromApi);


  //     seedInterviews(initialInterviews);
  //     setInterviews(getInterviews());

  //     // Fetch profile completion from API
  //     fetchProfileCompletion();
  //   };
  //   fetchJobsAndInterviews();
  // }, []);

  // const handleClick = () => {
  //   navigate("/JobSeekerHome/Job-details");
  // };

  // const handleBookmarkToggle = (jobId) => {
  //   const updated = toggleBookmark(jobId);
  //   setRecommendedJobs(updated);
  // };

  // const handleApply = (jobId) => {
  //   const updated = applyToJob(jobId);
  //   setRecommendedJobs(updated);
  // };

  // Stats calculations
  // const applicationsSent = recommendedJobs.filter((job) => job.applied).length;
  // const savedJobs = recommendedJobs.filter((job) => job.bookmarked).length;
  // const jobMatches = recommendedJobs.length;

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
            onClick={() =>  navigate("/JobSeeker-Create-Profile")}
            aria-label="Complete your profile"
            style={{ cursor: "pointer" }}
          >
            Complete profile
          </button>
        </section>

        {/* Stats Section */}
        <section
          className="JobSeeker-dashboard-stats"
          aria-label="Dashboard statistics"
        >
          {[
            {
              label: "Application sent",
              icon: send,
              value: applicationCount,
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
              value: jobMatchCount,
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
              {change && (
                <p className="JobSeeker-dashboard-stat-change">{change}</p>
              )}
              {link && (
                <p
                  className="JobSeeker-dashboard-stat-link"
                  style={{ cursor: "pointer" }}
                >
                  {link}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Recommended Jobs */}
        <section className="JobSeeker-dashboard-JobSeeker-recommended-jobs">
          <div className="JobSeeker-dashboard-header">
            <h3>Recommended for your</h3>
            <button
              className="JobSeeker-dashboard-view-all-button"
              style={{
                backgroundColor: "transparent",
                paddingRight: "5px",
                paddingBottom: "0px",
              }}
              onClick={() => navigate("/JobSeekerHome/Job-details")}
            >
              See More ...
            </button>
          </div>
          <div className="JobSeeker-dashboard-cards-container">
            {recommendedJobs.slice(0,3).map((job) => (
              <article
                key={job.id}
                className="JobSeeker-dashboard-card"
                aria-label={`${job.title} at ${job.companyName}`}
              >
                <div className="JobSeeker-dashboard-header">
                  <div className="JobSeeker-dashboard-icon">
                    {job.companyImageUrl &&
                    job.companyImageUrl.trim() !== "" ? (
                      <img
                        src={job.companyImageUrl}
                        alt="Company"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-500 text-black flex items-center justify-center text-lg font-bold">
                        {job.companyName?.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                  </div>
                  <div className="JobSeeker-dashboard-details">
                    <div className="JobSeeker-dashboard-title-company">
                      <span className="JobSeeker-dashboard-title">
                        {job.title}
                      </span>
                      <span className="JobSeeker-dashboard-company">
                        {job.companyName}
                      </span>
                    </div>
                    <button
                      className="JobSeeker-dashboard-bookmark-button"
                      onClick={() => saveJob(job.id)}
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
                <div className="JobSeeker-dashboard-info">
                  <p>
                    <span className="JobSeeker-dashboard-info-icon">
                      <SvgIcon component={MapPin} style={{ fill: "none" }} />
                    </span>{" "}
                    {job.location}
                  </p>
                  <p>
                    <span className="JobSeeker-dashboard-info-icon">
                      <SvgIcon component={Building} style={{ fill: "none" }} />
                    </span>{" "}
                    {job.employmentType}
                  </p>
                  <p>
                    <span className="JobSeeker-dashboard-info-icon">
                      <SvgIcon
                        component={IndianRupee}
                        style={{ fill: "none" }}
                      />
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
                    onClick={() => applyToJob(job.id)}
                    aria-disabled={job.applied}
                    aria-label={
                      job.applied ? "Already applied" : "Apply to job"
                    }
                    style={{ cursor: job.applied ? "not-allowed" : "pointer" }}
                  >
                    {job.applied ? "Applied" : "Apply"}
                  </button>
                  <button
                    onClick={()=>handleClick(job.id)}
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
        <section
          className="JobSeeker-dashboard-upcoming-interviews"
          aria-label="Upcoming interviews"
        >
          <div className="JobSeeker-dashboard-header">
            <div className="JobSeeker-dashboard-tableicon">
              <img src={calendarDays} alt="Calender-icon" />
              <h3>Upcoming Interviews</h3>
            </div>
            <button className="JobSeeker-dashboard-view-all-button">
              View All
            </button>
          </div>
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
                          if (e.key === "Enter")
                            handleViewInterview(interview.id);
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
                          if (e.key === "Enter")
                            handleMessageInterview(interview.id);
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
                          if (e.key === "Enter")
                            handleEditInterview(interview.id);
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
