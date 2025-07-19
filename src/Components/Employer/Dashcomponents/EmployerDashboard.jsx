// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaRegEye,
  FaEnvelope,
  FaRegBookmark,
  FaRegStar,
  FaBars,
  FaRegFileAlt,
  FaRegUser,
  FaPlus,
} from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { AiOutlineCalendar } from "react-icons/ai";
import "../../../Styles/Employer/Dashcomponents/EmployerDashboard.css";
import axiosInstance from "../../../axiosInstance";

const EmployerDashboard = () => {
  const navigate = useNavigate();

  // State for interviews and applicants
  const [interviewData, setInterviewData] = useState([]);

  // applicants data object
  const [applicantsData, setApplicantsData] = useState([]);

  // Loading states (optional)
  const [loadingInterviews, setLoadingInterviews] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(true);

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");

  //states for stat cards
  const [totalJobsPostedCount, setTotalJobsPostedCount] = useState(0);
  const [newApplicationsCount, setnewApplicationsCount] = useState(0);
  const [shortlistedCount, setshortlistedCount] = useState(0);
  const [savedProfilesCount, setsavedProfilesCount] = useState(0);
  const [totalViewsCount, settotalViewsCount] = useState(0);


  // upcoming interview function 

  // jobpostcount function
  const upcomingInterviews = async () => {
      setInterviewData([
        {
          name: "Asmita Rai",
          jobTitle: "Python Developer",
          datetime: "29 May 2025 11 AM",
          round: "Technical round 2",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Mithilesh Patil",
          jobTitle: "Senior QA Engineer",
          datetime: "29 May 2025 3 PM",
          round: "HR Introduction",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          name: "Akash Patwardhan",
          jobTitle: "Senior QA Engineer",
          datetime: "1 June 2025 12 PM",
          round: "Technical round 1",
          image: "https://randomuser.me/api/portraits/men/77.jpg",
        },
      ]);
    };

   // fetch applicants function
  const applicants = async () => {

    const employeeId = localStorage.getItem("recruiterId");
     try {
           const response = await axiosInstance.get(`/api/recruiters/dashboard/recent-applicants?recruiterId=${employeeId}`);
    
           console.log(response.data);
    if (response.status === 200) {
      const transformedData = response.data.map(applicant => ({
        name: applicant.jobSeekerName || "N/A", // fallback
        title: applicant.jobPostTitle || "Unknown Title",
        location: applicant.jobPostLocation || "Unknown",
        date: formatDate(applicant.appliedDate),
        status: formatStatus(applicant.status),
        resume: applicant.resumeFileName,
        email: applicant.email,
         profileImageUrl: applicant.profileImageUrl || "https://randomuser.me/api/portraits/men/32.jpg", 
      }));

      console.log("Applicants Data:", transformedData);


      setApplicantsData(transformedData);
    } else {
      setApplicantsData([]);
    }
  } catch (error) {
    console.error('Error fetching applicants:', error);
    setApplicantsData([]);
  }

    };

    // Utility function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// Optional: map backend statuses to UI-friendly names
const formatStatus = (status) => {
  switch (status) {
    case 'SUBMITTED': return 'Submitted';
    case 'UNDER_REVIEW': return 'Under Review';
    case 'SHORTLISTED': return 'Shortlisted';
    case 'INTERVIEW_SCHEDULED': return 'Interview Scheduled';
    case 'REJECTED': return 'Rejected';
    case 'OFFER_EXTENDED': return 'Offer Extended';
    case 'HIRED': return 'Hired';
    default: return status ? status.charAt(0) + status.slice(1).toLowerCase() : 'Unknown';
  }
};



    


  // jobpostcount function
  const  newApplicationCount = async () => {
      const employeeId = localStorage.getItem("recruiterId");
      setTotalJobsPostedCount(4);
     try {
        const response = await axiosInstance.get(`/api/recruiters/dashboard/summary/${employeeId}`);
      const data =response.data;
        console.log(data);
        setnewApplicationsCount(data.newApplications || 0);
        setsavedProfilesCount(data.savedProfiles || 0);
        settotalViewsCount(data.totalviews || 0);
        setshortlistedCount(data.shortlisted || 0);

      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
      }
    };


      // jobpostcount function
      const jobPostCount = async () => {
      const recruiterId = localStorage.getItem("recruiterId");
           try {
                const response = await axiosInstance.get(`/api/jobposts/jobpost-count/${recruiterId}`);
             
                   console.log(response.data);
                  if (response.status === 200) {
                  setTotalJobsPostedCount(response.data);
                  } else {
                   console.warn("Unexpected response:", response);
                  setTotalJobsPostedCount(0); // fallback
            }
            } catch (error) {
                   console.error("Error fetching job post count:", error);
                   setTotalJobsPostedCount(0); // fallback on error
           }
    
    };

    //shortlist count function
     const shortListCount = async () => {
      const jobSeekerId = localStorage.getItem("jobSeekerId");

       setshortlistedCount(100);
      // try {
      //   const response = await axiosInstance.get(
      //     `/api/jobseekers/saved-jobs/count/${jobSeekerId}`
      //   );
  
      //   setnewApplications(10);
      //   console.log("Saved jobs count:", response.data);
      // } catch (error) {
      //   console.error("Error fetching saved jobs count:", error);
      // }
    };

    // saved profile count 
    const savedProfileCount = async () => {
      const jobSeekerId = localStorage.getItem("jobSeekerId");

       setsavedProfilesCount(50);
      // try {
      //   const response = await axiosInstance.get(
      //     `/api/jobseekers/saved-jobs/count/${jobSeekerId}`
      //   );
  
      //   setnewApplications(10);
      //   console.log("Saved jobs count:", response.data);
      // } catch (error) {
      //   console.error("Error fetching saved jobs count:", error);
      // }
    };
    // total views count 
    const totalviewCount = async () => {
      const jobSeekerId = localStorage.getItem("jobSeekerId");

       settotalViewsCount(500);
      // try {
      //   const response = await axiosInstance.get(
      //     `/api/jobseekers/saved-jobs/count/${jobSeekerId}`
      //   );
  
      //   setnewApplications(10);
      //   console.log("Saved jobs count:", response.data);
      // } catch (error) {
      //   console.error("Error fetching saved jobs count:", error);
      // }
    };


  // Simulate API fetch for interviews
  useEffect(() => {

    upcomingInterviews();
    applicants();
    jobPostCount();
    newApplicationCount();
    shortListCount();
    savedProfileCount();
    totalviewCount();
    // Simulate network delay
     setTimeout(() => {
      setLoadingApplicants(false);
      setLoadingInterviews(false);
    }, 1000);
  }, []);

  
  return (
    <div className="EDashboard-container">
      {/* Search Bar */}
      <div className="EDashboard-search-bar">
        <input
          type="text"
          placeholder="Enter Job Title or Name"
          className="EDashboard-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="EDashboard-select"
          value={experienceFilter}
          onChange={(e) => setExperienceFilter(e.target.value)}
        >
          <option value="">Select experience</option>
          <option value="Internship">Internship</option>
          <option value="1 Tos 2 Years">1 Tos 2 Years</option>
          <option value="2 To 5 Years">2 To 5 Years</option>
          <option value="5 Years Above">5 Years Above</option>
        </select>
        <select
          className="EDashboard-select"
          value={jobTypeFilter}
          onChange={(e) => setJobTypeFilter(e.target.value)}
        >
          <option value="">Select Job type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </select>
        <button
          className="EDashboard-search-btn"
          onClick={() => {
            // If you want to trigger search on button click instead of live filtering, handle here
          }}
        >
          Search
        </button>
      </div>

           {/* Summary Cards */}
      <div className="EDashboard-summary-cards">
        {[
          {
            icon: <FaRegFileAlt size={24} color="rgb(218, 96, 52)" />,
            label: "Job Posted",
            value: totalJobsPostedCount,
          },
          {
            icon: <FaRegUser size={24} color="rgb(218, 96, 52)" />,
            label: "New Applications",
            value: newApplicationsCount,
          },
          {
            icon: <FaRegStar size={24} color="rgb(218, 96, 52)" />,
            label: "Short listed",
            value: shortlistedCount,
          },
          {
            icon: <FaRegBookmark size={24} color="rgb(218, 96, 52)" />,
            label: "Saved Profile",
            value: savedProfilesCount,
          },
          {
            icon: <FaRegEye size={24} color="rgb(218, 96, 52)" />,
            label: "Total views",
            value: totalViewsCount,
          },
        ].map((item, idx) => (
          <div key={idx} className="EDashboard-summary-card">
            <div>{item.icon}</div>
            <div className="EDashboard-card-value">{item.value}</div>
            <div className="EDashboard-card-label">{item.label}</div>
          </div>
        ))}
      </div>


      {/* Post Job and Upcoming Interviews */}
      <div className="EDashboard-grid-section">
        <div className="EDashboard-post-job">
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <FaPlus size={30} color="#b153e5" />
            <h2 className="EDashboard-post-job-title"> Post a new Job</h2>
          </div>
          <p className="EDashboard-post-job-description">
            Find a new candidates by posting a new job openings
          </p>
          <button
            className="EDashboard-post-btn"
            onClick={() => {
              navigate("/EmployerHome/Job-Post");
            }}
          >
            Post a job
          </button>
        </div>

        <div className="EDashboard-interview-schedule">
          <div className="EDashboard-interview-header">
            <div className="EDashboard-interview-header-left">
              <AiOutlineCalendar
                size={30}
                color="#b153e5"
                style={{ marginRight: "10px" }}
              />
              <h3>Upcoming Interviews</h3>
            </div>
            <button className="EDashboard-interview-view-all">View all</button>
          </div>

          {loadingInterviews ? (
            <p>Loading interviews...</p>
          ) : (
            <table className="EDashboard-interview-table" style={{ color:"#B8860B"}}>
              <thead>
                <tr>
                  <th>Candidate Name</th>
                  <th>Job Title</th>
                  <th>Date & Time</th>
                  <th>Interview Round</th>
                </tr>
              </thead>
              <tbody>
                {interviewData.map((candidate, i) => (
                  <tr key={i}>
                    <td>
                      <div className="EDashboard-candidate-profile">
                        <img src={candidate.image} alt={candidate.name} />
                        <span>{candidate.name}</span>
                      </div>
                    </td>
                    <td>{candidate.jobTitle}</td>
                    <td>{candidate.datetime}</td>
                    <td>{candidate.round}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Recent Applicants */}
      <div className="EDashboard-recent-applicants">
        <div className="EDashboard-recent-header">
          <div className="EDashboard-recent-header-left">
            <HiOutlineUsers size={30} color="orange" />
            <h3>Recent applicants</h3>
          </div>
          <select className="EDashboard-select">
            <option>Last 7 days</option>
          </select>
        </div>
        <div className="EDashboard-applicants-table-wrapper">
          {loadingApplicants ? (
            <p>Loading applicants...</p>
          ) : (
            <table className="EDashboard-applicants-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job Title</th>
                  <th>Application Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applicantsData.map(({ name, title, date, status, profileImageUrl }, idx) => (
                  <tr key={idx}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="EDashboard-candidate-profile">
                        <img
                             src={profileImageUrl || "/default-avatar.png"}
                                alt={name}
                                onError={(e) => (e.target.src = "/default-avatar.png")}
                         />
                        <span>{name}</span>
                      </div>
                    </td>

                    <td>{title}</td>
                    <td>{date}</td>
                    <td>
                      <span
                        className={`EDashboard-status-badge ${status
                          .replace(/\s/g, "")
                          .toLowerCase()}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="EDashboard-action-icons">
                      <FaRegEye /> <FaEnvelope /> <FaRegBookmark /> <FaBars />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="EDashboard-view-all-wrapper">
          <div className="EDashboard-recentapplicant-view-all">View all</div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
