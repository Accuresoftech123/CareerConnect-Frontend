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
import axiosInstance, { baseURL } from "../../../axiosInstance";
import { formatDistanceToNow } from "date-fns";
import ScheduleInterviewModal from "./ScheduleInterviewModal";

const AdminDashboard = () => {
  // const url = "http://localhost:9191";
  // Stats data
  //count
  const [newJobPostedcount, setnewJobPostedcount] = useState(0);
  const [newCandidatescount, setnewCandidatescount] = useState(0);
  const [newCompaniescount, setnewCompaniescount] = useState(0);
  const [totalSubscriptionscount, settotalSubscriptionscount] = useState(0);
  const [totalActiveUserscount, settotalActiveUserscount] = useState(0);
  //data table section
  const [subscribedCandidates, setsubscribedCandidates] = useState([]);
  const [newCandidates, setNewCandidates] = useState([]);
  const [newRecruiters, setNewrecruiters] = useState([]);
  const [allActiveUsers, setAllActiveUsers] = useState([]); // static data initially
  const [filteredActiveUsers, setFilteredActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  //for schedule interview usestates
  const [isScheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchRecentJobSeekers = async () => {
    try {
      const response = await axiosInstance.get(`/api/admin/jobseeker/recent`);
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
        `/api/admin/jobposts/recent/count`
      );
      setnewJobPostedcount(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  const fetchCandidatescount = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/jobseeker/recent/count`
      );
      setnewCandidatescount(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  const fetchCompaniescount = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/admin/recruiter/recent/count`
      );
      setnewCompaniescount(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  const fetchSubscriptionscount = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/payments/total-amount`);
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
      const response = await axiosInstance.get(`/api/admin/recruiter/recent`);
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

  //subscribed candidates
  const fetchSubscriptionCandidates = () => {
    setsubscribedCandidates([
  {
    name: "Vivek Pawar",
    userType: "Pro",
    jobTitle: "Full-stack Developer",
    status: "Scheduled",
    minExperience: 2,
    maxExperience: 4,
    ExpectedSalary: 800000, // in INR per annum
  },
  {
    name: "Racton Solutions",
    userType: "Pro",
    jobTitle: "Jr. iOS Developer",
    status: "Re-scheduled",
    minExperience: 1,
    maxExperience: 2,
    expectedSalary: 500000,
  },
  {
    name: "Techrodrant Solutions",
    userType: "Pro",
    jobTitle: "UI/UX Designer",
    status: "Cancelled",
    minExperience: 3,
    maxExperience: 5,
    expectedSalary: 750000,
  },
  {
    name: "Mayur Shinde",
    userType: "elite",
    jobTitle: "Senior HR Executive",
    status: "Pending",
    minExperience: 4,
    maxExperience: 7,
    expectedSalary: 900000,
  },
  {
    name: "Nautik Tandel",
    userType: "free",
    jobTitle: "Java Developer",
    status: "Done",
    minExperience: 2,
    maxExperience: 3,
    expectedSalary: 600000,
  },
]);
  };
  //schedule interview popup
  const openScheduleModal = (e, user) => {
    e.preventDefault();
    setSelectedUser(user);
    setScheduleModalOpen(true);
    console.log(user);
  };

  const closeScheduleModal = () => {
    setSelectedUser(null);
    setScheduleModalOpen(false);
  };
  //Active user section
  
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
    fetchSubscriptionCandidates();
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

      {/* Subscribed Candidates Section */}
      <div className="SubscribedCandidates-section">
        <div className="SubscribedCandidates-header">
          <div className="SubscribedCandidates-header">
            <span className="SubscribedCandidates-icon">
              <img src={activeUsersSection} alt="Subscribed Candidates" />
            </span>
            <h3 style={{ paddingTop: "20px" }}>Subscribed Candidates</h3>
          </div>
        </div>

        <div className="AdminDashboard-table-scroll-wrapper">
          <table className="SubscribedCandidates-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Plan</th>
                <th>Job Title</th>
                <th>Interview Status</th>
                <th>Schedule Interview</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribedCandidates.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className="SubscribedCandidates-nameCell">
                      <img
                        src="https://via.placeholder.com/40"
                        alt={user.name}
                        className="SubscribedCandidates-avatar"
                      />
                      <span className="SubscribedCandidates-nameText">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="SubscribedCandidates-plan">
                      {user.userType}
                    </span>
                  </td>
                  <td>
                    <span className="SubscribedCandidates-jobTitle">
                      {user.jobTitle}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`SubscribedCandidates-status ${user.status
                        .toLowerCase()
                        .replace("-", "")}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="SubscribedCandidates-scheduleBtn"
                      onClick={(e) => openScheduleModal(e, user)}
                    >
                      <span className="material-symbols-outlined calendar-clock-icon">
                        calendar_clock
                      </span>
                      <span style={{ paddingLeft: "10px" }}>Schedule</span>
                    </button>
                  </td>
                  <td>
                    <div className="SubscribedCandidates-actions">
                      <VisibilityIcon
                        className="SubscribedCandidates-icon"
                        onClick={() => handleView(user)}
                        titleAccess="View"
                      />
                      <MessageIcon
                        className="SubscribedCandidates-icon"
                        onClick={() => handleMessage(user)}
                        titleAccess="Message"
                      />
                      <MoreVertIcon
                        className="SubscribedCandidates-icon"
                        onClick={() => handleMore(user)}
                        titleAccess="More Options"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ScheduleInterviewModal
            isOpen={isScheduleModalOpen}
            onClose={closeScheduleModal}
            user={selectedUser}
          />
        </div>

        <div className="Adash-viewAll-container">
          <span className="Adash-viewAll">View all</span>
        </div>
      </div>

      {/* New Recruiters Section */}
      <div className="AdminDashboard-dashboard-section-tables">
        <div className="AdminDashboard-dashboard-section">
          <div className="AdminDashboard-section-title">
            <div className="AdminDashboard-section-title">
              <span
                className="AdminDashboard-section-icon"
                style={{ paddingRight: "20px" }}
              >
                <img src={newRecruiter} alt="New Recruiters" />
              </span>
              <h2 style={{ paddingTop: "20px" }}>New Recruiters</h2>
            </div>
            <span className="AdminDashboard-dashboard-section-viewAll">
              View all
            </span>
          </div>
          <div className="AdminDashboard-table-wrapper">
            <div className="AdminDashboard-scroll-container">
              <table className="AdminDashboard-data-table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Location</th>
                    <th>Mobile Number</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {newRecruiters.map((recruiter, index) => (
                    <tr key={index}>
                      <td>{recruiter.companyName}</td>
                      <td>
                        {recruiter.companyLocations?.length > 0
                          ? recruiter.companyLocations
                              .map((location) => location.city)
                              .filter(Boolean)
                              .join(", ")
                          : "N/A"}
                      </td>
                      <td>{recruiter.mobileNumber}</td>
                      <td>
                        {recruiter.createdAt
                          ? `${formatDistanceToNow(
                              new Date(recruiter.createdAt)
                            )} ago`
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* New Candidates Section */}
        <div className="AdminDashboard-dashboard-section">
          <div className="AdminDashboard-section-title">
            <div className="AdminDashboard-section-title">
              <span
                className="AdminDashboard-section-icon"
                style={{ paddingRight: "20px" }}
              >
                <img src={Candidates} alt="New Candidates" />
              </span>
              <h2 style={{ paddingTop: "20px" }}>New Job-Seekers</h2>
            </div>
            <span className="AdminDashboard-dashboard-section-viewAll">
              View all
            </span>
          </div>
          <div className="AdminDashboard-table-wrapper">
            <div className="AdminDashboard-scroll-container">
              <table className="AdminDashboard-data-table">
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Job Title</th>
                    <th>Mobile Number</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {newCandidates.map((candidate, index) => {
                    const titles =
                      candidate.jobPreferences?.desiredJobTitle || [];
                    const displayTitles = titles.slice(0, 2).join(", ");
                    const extraCount =
                      titles.length > 2 ? ` +${titles.length - 2} more` : "";
                    return (
                      <tr key={index}>
                        <td>{candidate.fullName}</td>
                        <td>
                          {titles.length > 0
                            ? displayTitles + extraCount
                            : "No job titles specified"}
                        </td>
                        <td>{candidate.mobileNumber}</td>
                        <td>
                          {candidate.createdAt
                            ? `${formatDistanceToNow(
                                new Date(candidate.createdAt)
                              )} ago`
                            : "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Active Users Section */}
      <div
        className="AdminDashboard-dashboard-section-user"
        style={{ backgroundColor: "#facc15", color: "#000" }}
      >
        <div className="AdminDashboard-section-header">
          <div className="AdminDashboard-section-header">
            <span class="AdminDashboard-section-icon">
              <img src={activeUsersSection} alt="Active Users" />
            </span>

            <h2 style={{ paddingRight: "20px" }}>Active users</h2>
          </div>
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
        <div className="AdminDashboard-table-scroll-wrapper">
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
        <div className="Adash-viewAll-container">
          <span className="Adash-viewAll">View all</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
