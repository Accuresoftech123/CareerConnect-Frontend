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
import search from "../../Images/search.svg";
import Notification from "../../Images/Notification.svg";
import userHeader from "../../Images/userHeader.svg";
 
import "../../Styles/Admin/AdminHome.css"
 
 
const AdminHome = ({ children }) => {
      const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
 
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const isActive = (path) => location.pathname.startsWith(path);
 
  const navItems = [
    {
      path: "/AdminHome/Admin-Dashboard",
      icon: <FaTachometerAlt />,
      label: "Dashboard",
    },
    {
      path: "/AdminHome/JobListing",
      icon: <FaMapMarkedAlt />,
      label: "Job Listing",
    },
    {
      path: "/Admin/Candidates",
      icon: <FaThumbsUp />,
      label: "Candidates",
    },
    {
      path: "/Admin/Recruiters",
      icon: <FaEnvelope  />,
      label: "Recruiters",
    },
    {
      path: "/Admin/ReportedContent",
      icon: <FaEnvelope  />,
      label: "Reported content",
    },
 
    {
      path: "/Admin/Analysis",
      icon: <FaChartBar />,
      label: "Analysis",
    },
    {
      path: "/Admin/Settings",
      icon: <FaCog />,
      label: "Settings",
    },
     {
      path: "/AdminLogin",
      icon: <FaCog />,
      label: "Logout",
    },
  ];
 
    return (
    <div className="AdminHome_layout-container">
      {/* Header */}
      <header className="AdminHome_header">
        <button
          className="AdminHome_sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
        +  <FaBars />
        </button>
 
        <div className="AdminHome_logo">
          <span>Career</span> Connect
        </div>
 
       
        <div className="AdminHome_right-section">
 
          <Link to="#" className="AdminHome_header-link">
            <img
              src={search}
              alt="search"
              className="AdminHome_profile-icon"
            />
          </Link>
 
 
          <Link to="#" className="AdminHome_header-link">
            <img
              src={Notification}
              alt="Notification"
              className="AdminHome_profile-icon"
            />
          </Link>
          <Link to="#" className="AdminHome_header-link">
            <img
              src={userHeader}
              alt="userHeader"
              className="AdminHome_profile-icon"
            />
          </Link>
        </div>
      </header>
 
      {/* Sidebar overlay for small screens */}
      <div
        className={`AdminHome_sidebar-overlay ${
          sidebarOpen ? "active" : ""
        }`}
        onClick={closeSidebar}
      ></div>
 
      {/* Body section */}
      <div className="AdminHome_layout-body">
        {/* Sidebar */}
        <nav
          className={`AdminHome_sidebar ${sidebarOpen ? "active" : ""}`}
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
          <div className="AdminHome_sidebar-footer">
          <div className="AdminHome_user-profile">
            <img
              src="AdminHome_user-profile-pic.jpg"
              alt="User Profile"
              className="profile-pic"
            />
            <div className="user-info">
              <span className="AdminHome_user-name">
                Shruti Punewar
              </span>
              <span className="AdminHome_user-role">Admin</span>
            </div>
            <i className="icon-arrow-right"></i>
          </div>
        </div>
        </nav>
 
        {/* ✅ Main content now scrollable */}
        <main className="AdminHome_main-content">{children}</main>
      </div>
    </div>
  );
 
}
export default AdminHome;