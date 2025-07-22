// JobSeekerHome.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import "../../Styles/Employer/EmployerHome.css";
import { useEffect } from "react";
import axios from "axios"; // ✅ Import Axios
import axiosInstance from "../../axiosInstance";
import { baseURL } from "../../axiosInstance"; // Import your axios instance

//Parent component of JobSeeker Dashboard
const EmployerHome = ({ children }) => {
  const navigate = useNavigate();

 //const url = "http://localhost:9191";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const isActive = (path) => {
    // For default path /JobSeekerHome, manually match Dashboard route
    if (
      location.pathname === "/EmployerHome" &&
      path === "/EmployerHome/Employer-Dashboard"
    ) {
      return true;
    }
    return location.pathname.startsWith(path);
  };

  const [employerInfo, setEmployerInfo] = useState({
    companyName: "",
    profileImageUrl: "",
  });
  const employerId = localStorage.getItem("employerId");
 
  // Navigation items for the sidebar
  const navItems = [
    {
      path: "/EmployerHome/Employer-Dashboard",
      icon: <FaTachometerAlt />,
      label: "Dashboard",
    },
    {
      path: "/EmployerHome/MyJobPosts",
      icon: <FaMapMarkedAlt />,
      label: "My Job Posts",
      style: { color: "#FFFF00" },
    },
    {
      path: "/EmployerHome/Applicants",
      icon: <FaThumbsUp />,
      label: "Applicants",
      style: { color: "#FFFF00" },
    },
    {
      path: "/EmployerHome/Recommendations",
      icon: <FaThumbsUp />,
      label: "Recommendations",
      style: { color: "#FFFF00" },
    },
    {
      path: "/EmployerHome/Messages",
      icon: <FaEnvelope />,
      label: "Messages",
      style: { color: "#FFFF00" },
    },
    {
      path: "/EmployerHome/Analysis",
      icon: <FaChartBar />,
      label: "Analysis",
      style: { color: "#FFFF00" },
    },
    {
      path: "/EmployerHome/Settings",
      icon: <FaCog />,
      label: "Settings",
      style: { color: "#FFFF00" },
    },
    {
      path: "/Employer",
      icon: <FaSignOutAlt />,
      label: "Logout",
    },
  ];

   // profile img 
    const getProfileImg = async () => {
      const recruiterId = localStorage.getItem("recruiterId");

       try {
       
          const response = await axios.get(`${baseURL}/api/recruiters/profile-image/${recruiterId}`);

          console.log("company profile img ", response.data);
    setEmployerInfo({
      companyName: response.data.companyName || "Company Name",
      profileImageUrl: response.data.image || "/default-avatar.png",
    });
  } catch (error) {
    console.error("Error fetching recruiter profile:", error);
    setEmployerInfo({
      companyName: "Company Name",
      profileImageUrl: "/default-avatar.png",
    });
  }

    };


  useEffect(() => {
    getProfileImg();
    
  }, []);

  // logout function
  const handleLogout = () => {
    localStorage.removeItem("recruiterId"); // Clear stored user ID
    localStorage.removeItem("token"); // Clear token if you're using JWT
    localStorage.removeItem("rzp_checkout_anon_id"); //clear razerpay details
    localStorage.removeItem("rzp_device_id"); // clear razerpay id
    localStorage.removeItem("rzp_stored_checkout_id");

    navigate("/Employer"); // Redirect to login page
  };

  return (
    <div className="EmployerHome_layout-container">
      {/* Header */}
      <header className="EmployerHome_header">
        <button
          className="EmployerHome_sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>

        <div className="EmployerHome_logo">
          <span>Career</span> Connect
        </div>
        <div className="EmployerHome_right-section">
            <FaSearch className="EmployerHome_search-icon" />
           <div className="EmployerHome_notification">
            {/* <FaBell className="EmployerHome_bell-icon" /> */}
          </div>
          <div className="EmployerHome_notification">
            <FaBell className="EmployerHome_notification" />
          </div>
          <div className="EmployerHome_Profile">
            {employerInfo.profileImageUrl ? (
              <img
                src={employerInfo.profileImageUrl}
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
        className={`EmployerHome_sidebar-overlay ${
          sidebarOpen ? "active" : ""
        }`}
        onClick={closeSidebar}
      ></div>

      {/* Body section */}
      <div className="EmployerHome_layout-body">
        {/* Sidebar */}
        <nav className={`EmployerHome_sidebar ${sidebarOpen ? "active" : ""}`}>
          {navItems.map((item) =>
            item.label === "Logout" ? (
              <button
                key={item.path}
                className="link logout-btn"
                onClick={handleLogout}
                style={{
                  color: "#FF0000",
                  background: "none",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={isActive(item.path) ? "active-link" : "link"}
                onClick={closeSidebar}
                style={isActive(item.path) ? { color: "#000" } : item.style}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          )}
        </nav>

        {/* ✅ Main content now scrollable */}
        <main className="EmployerHome_main-content">{children}</main>
      </div>
    </div>
  );
};

export default EmployerHome;
