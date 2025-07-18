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

const EmployerDashboard = () => {
  const navigate = useNavigate();

  // State for interviews and applicants
  const [interviewData, setInterviewData] = useState([]);
  const [applicantsData, setApplicantsData] = useState([]);

  // Loading states (optional)
  const [loadingInterviews, setLoadingInterviews] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(true);

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");

  // Simulate API fetch for interviews
  useEffect(() => {
    // Simulate network delay
    setTimeout(() => {
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
      setLoadingInterviews(false);
    }, 1000);
  }, []);

  // Simulate API fetch for applicants
  useEffect(() => {
    setTimeout(() => {
      setApplicantsData([
        {
          name: "Ganesh Khedkar",
          title: "Graphics Designer",
          date: "26 May 2025",
          status: "In review",
        },
        {
          name: "Nikita Vaishampayal",
          title: "Cyber Security Engineer",
          date: "26 May 2025",
          status: "Rejected",
        },
        {
          name: "Simaran Agrawal",
          title: "UI UX Designer",
          date: "25 May 2025",
          status: "Shortlisted",
        },
        {
          name: "Mayur Shinde",
          title: "Senior HR Executive",
          date: "25 May 2025",
          status: "In review",
        },
        {
          name: "Vaishali Gupta",
          title: "Java Developer",
          date: "24 May 2025",
          status: "Rejected",
        },
      ]);
      setLoadingApplicants(false);
    }, 1000);
  }, []);
const  shortlistedCount = 20;
 const totalJobsPosted = 5;
  const newApplications = 34;
  const savedProfiles = 10;
  const totalViews = 1027;

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
            value: totalJobsPosted,
          },
          {
            icon: <FaRegUser size={24} color="rgb(218, 96, 52)" />,
            label: "New Applications",
            value: newApplications,
          },
          {
            icon: <FaRegStar size={24} color="rgb(218, 96, 52)" />,
            label: "Short listed",
            value: shortlistedCount,
          },
          {
            icon: <FaRegBookmark size={24} color="rgb(218, 96, 52)" />,
            label: "Saved Profile",
            value: savedProfiles,
          },
          {
            icon: <FaRegEye size={24} color="rgb(218, 96, 52)" />,
            label: "Total views",
            value: totalViews,
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
            <table className="EDashboard-interview-table">
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
                {applicantsData.map(({ name, title, date, status }, idx) => (
                  <tr key={idx}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <div className="EDashboard-candidate-profile">
                        <img
                          src={`https://randomuser.me/api/portraits/${
                            idx % 2 === 0 ? "men" : "women"
                          }/${20 + idx}.jpg`}
                          alt={name}
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
