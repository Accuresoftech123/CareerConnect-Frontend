// JobSeekerHome.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt, FaEnvelope, FaBell, FaSearch, FaTachometerAlt, FaMapMarkedAlt,
  FaUserFriends, FaChartBar, FaRegUserCircle, FaCog, FaThumbsUp,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import "../../Styles/JobSeeker/JobSeekerHome.css";
import { useEffect } from "react";
import axios from "axios"; // ✅ Import Axios
import axiosInstance from "../../axiosInstance";

//Parent component of JobSeeker Dashboard
const JobSeekerHome = ({ children }) => {
  const navigate = useNavigate();

  const url = "http://localhost:9191";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const isActive = (path) => {
    // For default path /JobSeekerHome, manually match Dashboard route
    if (
      location.pathname === "/JobSeekerHome" &&
      path === "/JobSeekerHome/Jobseeker-Dashboard"
    ) {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  const [jobSeekerInfo, setJobSeekerInfo] = useState({
    fullName: "",
    profileImageUrl: "",
  });
  const jobSeekerId = localStorage.getItem("jobSeekerId");
  // Fetch job seeker info from the backend
  const fetchJobSeekerInfo = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/jobseekers/get-image-name/${jobSeekerId}`
      );
      setJobSeekerInfo({
        fullName: response.data.fullName,
        profileImageUrl: response.data.profileImageUrl,
      });
    } catch (error) {
      console.error("Error fetching Job Seeker info:", error);
    }
  };
  // Navigation items for the sidebar
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
      style: { color: "#FFFF00" },
    },
    {
      path: "/JobSeekerHome/Recommendations",
      icon: <FaThumbsUp />,
      label: "Recommendations",
      style: { color: "#FFFF00" },
    },
    {
      path: "/JobSeekerHome/Messages",
      icon: <FaEnvelope />,
      label: "Messages",
      style: { color: "#FFFF00" },
    },
    {
      path: "/JobSeekerHome/Analysis",
      icon: <FaChartBar />,
      label: "Analysis",
      style: { color: "#FFFF00" },
    },
    {
      path: "/JobSeekerHome/Settings",
      icon: <FaCog />,
      label: "Settings",
      style: { color: "#FFFF00" },
    },
    {
      path: "/Login",
      icon: <FaSignOutAlt />,
      label: "Logout",
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
      {location.pathname !== '/JobSeekerHome/Job-details' && (
        <div className="JobSeekerHome_search-container">
          <FaSearch className="JobSeekerHome_search-icon" />
          <input
            type="text"
            placeholder="Search Job"
            className="JobSeekerHome_search-input"
            onClick={() =>  navigate("/JobSeekerHome/Job-details")}
          />
        </div>
      )}
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
            )}{" "}
          </div>
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
        <nav className={`JobSeekerHome_sidebar ${sidebarOpen ? "active" : ""}`}>
  {navItems.map((item) => (
    <Link
      key={item.path}
      to={item.path}
      className={isActive(item.path) ? "active-link" : "link"}
      onClick={closeSidebar}
      style={isActive(item.path) ? { color: "#000" } : item.style} // white for active, yellow otherwise
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
