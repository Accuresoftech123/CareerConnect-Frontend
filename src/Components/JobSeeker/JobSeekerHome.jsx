// JobSeekerHome.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaSignOutAlt,
  FaEnvelope,
  FaBell,
  FaSearch,
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaUserFriends,
  FaChartBar,
  FaRegUserCircle,
  FaCog,
  FaThumbsUp,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import "../../Styles/JobSeeker/JobSeekerHome.css";
import { useEffect } from "react";
import axios from "axios"; // ✅ Import Axios

const url = "http://localhost:9191"; // Base URL for API requests
const JobSeekerHome = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const isActive = (path) => location.pathname.startsWith(path);

  const [jobSeekerInfo, setJobSeekerInfo] = useState({
  fullName: "",
  profileImageUrl: "",
});
  const jobSeekerId = localStorage.getItem("jobSeekerId");
   const fetchJobSeekerInfo = async () => {
    try {
      const response = await axios.get(`${url}/jobseekers/get-image-name/${jobSeekerId}`);
      setJobSeekerInfo({
        fullName: response.data.fullName,
        profileImageUrl: response.data.profileImageUrl,
      });
    } catch (error) {
      console.error("Error fetching Job Seeker info:", error);
    }
  };

  const navItems = [
    {
      path: "/JobSeekerHome/Jobseeker-Dashboard",
      icon: <FaTachometerAlt />,
      label: "Dashboard",
    },
    {
      path: "/JobSeekerHome/MyJobApplications",
      icon: <FaMapMarkedAlt />,
      label: "My Job Applications",
    },
    {
      path: "/JobSeeker/Recommendations",
      icon: <FaThumbsUp />,
      label: "Recommendations",
    },
    {
      path: "/JobSeeker/Messages",
      icon: <FaEnvelope  />,
      label: "Messages",
    },
    {
      path: "/JobSeeker/Analysis",
      icon: <FaChartBar />,
      label: "Analysis",
    },
    {
      path: "/JobSeeker/Settings",
      icon: <FaCog />,
      label: "Settings",
    },
  ];
  useEffect(() => {
    fetchJobSeekerInfo(); // Fetch job seeker info when component mounts
  }, []);

  return (
    <div className="JobSeekerHome_layout-container">
      {/* Header */}
      <header className="JobSeekerHome_header">
        <button
          className="JobSeekerHome_sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>

        <div className="JobSeekerHome_logo">
          <span>Career</span> Connect
        </div>

        <div className="JobSeekerHome_search-container">
          <FaSearch className="JobSeekerHome_search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="JobSeekerHome_search-input"
          />
        </div>
        <div className="JobSeekerHome_right-section">
          <div className="JobSeekerHome_user-greeting">Jobs</div>
          <div className="JobSeekerHome_user-greeting">Companies</div>
          <div className="JobSeekerHome_notification">
            {/* <FaBell className="JobSeekerHome_bell-icon" /> */}
          </div>
          <div className="JobSeekerHome_Profile">
            <FaBell className="JobSeekerHome_Profile" />
          </div>
           <div className="JobSeekerHome_Profile">
 {jobSeekerInfo.profileImageUrl ? (
    <img
      src={jobSeekerInfo.profileImageUrl}
      alt="Profile"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  ) : (
    <FaRegUserCircle size={40} color="#ccc" />
  )}          </div>
        </div>
      </header>

      {/* Sidebar overlay for small screens */}
      <div
        className={`JobSeekerHome_sidebar-overlay ${
          sidebarOpen ? "active" : ""
        }`}
        onClick={closeSidebar}
      ></div>

      {/* Body section */}
      <div className="JobSeekerHome_layout-body">
        {/* Sidebar */}
        <nav
          className={`JobSeekerHome_sidebar ${sidebarOpen ? "active" : ""}`}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={isActive(item.path) ? "active-link" : "link"}
              onClick={closeSidebar}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* ✅ Main content now scrollable */}
        <main className="JobSeekerHome_main-content">{children}</main>
      </div>
    </div>
  );
};

export default JobSeekerHome;
