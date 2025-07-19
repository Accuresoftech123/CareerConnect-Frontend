// Admin-Dashboard
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../../../Styles/Admin/Dashcomponents/AdminDashboard.css";
import newJobPosted from "../../../Images/newJobPosted.svg";
import newCandidate from "../../../Images/newCandidate.svg";
import newCompanies from "../../../Images/newCompanies.svg";
import indianRupee from "../../../Images/indianRupee.svg";
import activeUser from "../../../Images/activeUser.svg";
import Candidates from "../../../Images/Candidates.svg";
import newRecruiter from "../../../Images/newRecruiter.svg";
import activeUsersSection from "../../../Images/activeUsersSection.svg";
import axios from "axios";
import axiosInstance from "../../../axiosInstance";
import { formatDistanceToNow } from "date-fns";

const AdminDashboard = () => {
  const url = "http://localhost:9191";
  // Stats data
  const [newJobPostedcount, setnewJobPostedcount] = useState(0);
  const [newCandidatescount, setnewCandidatescount] = useState(0);
  const [newCompaniescount, setnewCompaniescount] = useState(0);
  const [totalSubscriptionscount, settotalSubscriptionscount] = useState(0);
  const [totalActiveUserscount, settotalActiveUserscount] = useState(0);
  const [newCandidates, setNewCandidates] = useState([]);
  const [newRecruiters, setNewrecruiters] = useState([]);
  const [allActiveUsers, setAllActiveUsers] = useState([]); // static data initially
  const [filteredActiveUsers, setFilteredActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentJobSeekers = async () => {
    try {
      const response = await axios.get(`${url}/api/jobseekers/recent`);
      setNewCandidates(response.data);
      console.log("Recent Job Seekers:", response.data);
    } catch (error) {
      console.error("Error fetching recent job seekers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobPostedcount = async () => {
    try {
      const response = await axiosInstance.get(
        `${url}/api/jobposts/jobposts/recent/count`
      );
      setnewJobPostedcount(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  const fetchCandidatescount = async () => {
    try {
      const response = await axiosInstance.get(
        `${url}/api/jobseekers/recent/count`
      );
      setnewCandidatescount(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  const fetchCompaniescount = async () => {
    try {
      const response = await axiosInstance.get(
        `${url}/api/recruiters/recent/count`
      );
      setnewCompaniescount(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  const fetchSubscriptionscount = async () => {
    try {
      const response = await axiosInstance.get(
        `${url}/api/payments/total-amount`
      );
      settotalSubscriptionscount(response.data);
      //  console.log(response);
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  const fetchActiveUserscount = async () => {
    // try {
    //   const response = await axiosInstance.get("/api/admin/dashboard-stats");
    //   settotalActiveUserscount(response.data);
    // } catch (error) {
    //   console.error("Failed to fetch dashboard stats", error);
    // }
  };
  // New Recruiters data
  const fetchnewcompanies = async () => {
      try {
        const response = await axios.get("http://localhost:9191/api/recruiters/recent");
       setNewrecruiters(response.data);
       console.log(response.data);
      } catch (error) {
        console.error("Error fetching recruiters:", error);
      }
    };

  // New Candidates data
  // const fetchnewcandidates = () => {

  //   setNewCandidates([
  //     { name: 'Asmita Rai', jobTitle: 'Java Developer', subscription: 'Platinum', time: '2 hours ago' },
  //     { name: 'Vaishnavi Singh', jobTitle: 'Senior HR', subscription: 'Golden', time: '5 hours ago' },
  //     { name: 'Shree Pione', jobTitle: 'Full-stack developer', subscription: 'Free', time: '14 hours ago' },
  //     { name: 'Amar Taneja', jobTitle: 'UIUX Designer', subscription: 'Golden', time: '16 hours ago' },
  //     { name: 'Rajat Tiwari', jobTitle: 'Business Developer', subscription: 'Platinum', time: '01 day ago' }
  //   ]);
  // }

  // Active Users data with action icons
  const [selectedFilter, setSelectedFilter] = useState("Last 7 days");
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    "Last 24 hours",
    "Last 7 days",
    "Last 14 days",
    "Last 30 days",
    "Last 90 days",
    "Last 12 months",
    "Custom range",
  ];

  //Active user section
  const fetchactiveUsers = () => {
    const user = [
      {
        name: "Vnay Pawar",
        userType: "Candidate",
        jobTitle: "Full-stack Developer",
        status: "Active",
        lastActive: "2025-07-18T08:30:00Z",
      },
      {
        name: "Itechno Solutions",
        userType: "Recruiter",
        jobTitle: "IMD engineer",
        status: "Active",
        lastActive: "2025-07-17T10:15:00Z",
      },
      {
        name: "Technofast Solutions",
        userType: "Recruiter",
        jobTitle: "UIUX Designer",
        status: "Active",
        lastActive: "2025-07-12T14:45:00Z",
      },
      {
        name: "Mayur Shinde",
        userType: "Candidate",
        jobTitle: "Senior HR Executive",
        status: "Active",
        lastActive: "2025-07-03T09:20:00Z",
      },
      {
        name: "Vaishali Gupta",
        userType: "Candidate",
        jobTitle: "Java Developer",
        status: "Active",
        lastActive: "2025-06-15T11:00:00Z",
      },
      {
        name: "Shree Pione",
        userType: "Candidate",
        jobTitle: "Senior HR",
        status: "Active",
        lastActive: "2025-01-25T12:30:00Z",
      },
    ];
    setAllActiveUsers(user);
    setFilteredActiveUsers(user);
  };
  //filter apply on table
  const applyActiveUsersFilter = (filter) => {
    const now = new Date();
    let filtered = [...allActiveUsers];

    filtered = allActiveUsers.filter((user) => {
      const lastActive = new Date(user.lastActive);

      switch (filter) {
        case "Last 24 hours":
          return now - lastActive <= 24 * 60 * 60 * 1000; // 24 hours
        case "Last 7 days":
          return now - lastActive <= 7 * 24 * 60 * 60 * 1000;
        case "Last 14 days":
          return now - lastActive <= 14 * 24 * 60 * 60 * 1000;
        case "Last 30 days":
          return now - lastActive <= 30 * 24 * 60 * 60 * 1000;
        case "Last 90 days":
          return now - lastActive <= 90 * 24 * 60 * 60 * 1000;
        case "Last 12 months":
          return now - lastActive <= 365 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    });

    setFilteredActiveUsers(filtered);
  };

  //handle view
  const handleView = (user) => {
    console.log("Viewing user:", user);
    alert(`Viewing details of ${user.name}`);
  };

  //handle massage
  const handleMessage = (user) => {
    console.log("Messaging user:", user);
    alert(`Starting chat with ${user.name}`);
  };
  //handle more
  const handleMore = (user) => {
    console.log("More options for:", user);
    alert(`More options for ${user.name}`);
  };

  useEffect(() => {
    fetchJobPostedcount();
    fetchSubscriptionscount();
    fetchActiveUserscount();
    fetchCandidatescount();
    fetchCompaniescount();
    // fetchnewcandidates();
    fetchRecentJobSeekers();
    fetchnewcompanies();
    fetchactiveUsers();
  }, []);

  useEffect(() => {
    applyActiveUsersFilter(selectedFilter);
  }, [allActiveUsers]);

  return (
    <div className="AdminDashboard-container">
      {/* Stats Cards */}
      <div className="AdminDashboard-summary-cards">
        <div className="AdminDashboard-card">
          <span class="AdminDashboard-summary-icon">
            <img src={newJobPosted} alt="New Job Posted" />
          </span>
          <h3>{newJobPostedcount}</h3>
          <p>New Job Posted</p>
        </div>
        <div className="AdminDashboard-card">
          <span class="AdminDashboard-summary-icon">
            <img src={newCandidate} alt="New Candidates" />
          </span>
          <h3>{newCandidatescount}</h3>
          <p>New Candidates</p>
        </div>
        <div className="AdminDashboard-card">
          <span class="AdminDashboard-summary-icon">
            <img src={newCompanies} alt="New Companies" />
          </span>
          <h3>{newCompaniescount}</h3>
          <p>New Companies</p>
        </div>
        <div className="AdminDashboard-card">
          <span class="AdminDashboard-summary-icon">
            <img src={indianRupee} alt="Total Subscriptions" />
          </span>
          <h3>{totalSubscriptionscount}</h3>
          <p>Total Subscriptions</p>
        </div>
        <div className="AdminDashboard-card">
          <span class="AdminDashboard-summary-icon">
            <img src={activeUser} alt="Total active users" />
          </span>
          <h3>{totalActiveUserscount}</h3>
          <p>Total active users</p>
        </div>
      </div>

      {/* New Recruiters Section */}
      <div className="AdminDashboard-dashboard-section-tables">
        <div className="AdminDashboard-dashboard-section">
          <div className="AdminDashboard-section-title">
            <span
              class="AdminDashboard-section-icon"
              style={{ paddingRight: "20px" }}
            >
              <img src={newRecruiter} alt="New Job Posted" />
            </span>
            <h2>New Recruiters</h2>
            <span className="AdminDashboard-dashboard-section-viewAll">
              view all
            </span>
          </div>
          <div className="AdminDashboard-recruiters-grid">
            <div className="AdminDashboard-grid-column">
              <h3>Company Name</h3>
              {newRecruiters.map((recruiter, index) => (
                <div key={index} className="AdminDashboard-grid-item">
                  {recruiter.companyName}
                </div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Location</h3>
              {newRecruiters.map((recruiter, index) => (
                <div key={index} className="AdminDashboard-grid-item"> {recruiter.companyLocations?.length > 0
        ? recruiter.companyLocations
            .map((location) => location.city)
            .filter(city => city) // remove null or empty
            .join(", ")
        : "N/A"}
</div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Subscription</h3>
              {newRecruiters.map((recruiter, index) => (
                <div key={index} className="AdminDashboard-grid-item">{recruiter.mobileNumber}</div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Time</h3>
              {newRecruiters.map((recruiter, index) => (
                <div key={index} className="AdminDashboard-grid-item">{recruiter.createdAt}</div>
              ))}
            </div>
          </div>
        </div>

        {/* New Candidates Section */}
        <div className="AdminDashboard-dashboard-section">
          <div className="AdminDashboard-section-title">
            <span
              class="AdminDashboard-section-icon"
              style={{ paddingRight: "20px" }}
            >
              <img src={Candidates} alt="New Candidates" />
            </span>
            <h2>New Candidates</h2>
            <span className="AdminDashboard-dashboard-section-viewAll">
              view all
            </span>
          </div>
          <div className="AdminDashboard-candidates-grid">
            <div className="AdminDashboard-grid-column">
              <h3>Candidate Name</h3>
              {newCandidates.map((candidate, index) => (
                <div key={index} className="AdminDashboard-grid-item">
                  {candidate.fullName}
                </div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Job Title</h3>
              {newCandidates.map((candidate, index) => (
                <div key={index} className="AdminDashboard-grid-item">
                  {candidate.jobPreferences.desiredJobTitle}
                </div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Mobile Number</h3>
              {newCandidates.map((candidate, index) => (
                <div key={index} className="AdminDashboard-grid-item">
                  {candidate.mobileNumber}
                </div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Time</h3>
              {newCandidates.map((candidate, index) => (
                <div key={index} className="AdminDashboard-grid-item">
                  {candidate.createdAt
                    ? `${formatDistanceToNow(
                        new Date(candidate.createdAt)
                      )} ago`
                    : "N/A"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Users Section */}
      <div className="AdminDashboard-dashboard-section-user">
        <div className="AdminDashboard-section-header">
          <span class="AdminDashboard-section-icon">
            <img src={activeUsersSection} alt="Active Users" />
          </span>

          <h2>Active users</h2>

          {/* Days Filter */}
          <div className="AdminDashboard-days-filter-container">
            <div
              className="AdminDashboard-days-filter-selected"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedFilter}
              <span className={`dropdown-icon ${isOpen ? "open" : ""}`}>▾</span>
            </div>

            {isOpen && (
              <div className="AdminDashboard-days-filter-options">
                {filterOptions.map((option) => (
                  <div
                    key={option}
                    className={`filter-option ${
                      selectedFilter === option ? "selected" : ""
                    }`}
                    onClick={() => {
                      setSelectedFilter(option);
                      setIsOpen(false);
                      applyActiveUsersFilter(option);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/*table of active users*/}
        <table className="AdminDashboard-active-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>User type</th>
              <th>Job Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredActiveUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.userType}</td>
                <td>{user.jobTitle}</td>
                <td>{user.status}</td>
                <td>
                  <div className="AdminDashboard-action-icons">
                    <VisibilityIcon
                      className="AdminDashboard-action-icon"
                      onClick={() => handleView(user)}
                      titleAccess="View"
                    />
                    <MessageIcon
                      className="AdminDashboard-action-icon"
                      onClick={() => handleMessage(user)}
                      titleAccess="Message"
                    />
                    <MoreVertIcon
                      className="AdminDashboard-action-icon"
                      onClick={() => handleMore(user)}
                      titleAccess="More Options"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
