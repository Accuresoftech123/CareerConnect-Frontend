// JobSeekerHome.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
 FaBars,
 FaSignOutAlt,
 FaBell,
 FaSearch,
 FaTachometerAlt,
 FaMapMarkedAlt,
 FaUserTie,
 FaUserFriends,
 FaUserGraduate,
 FaBoxOpen,
 FaMoneyBillAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
// import logo from "../../Assets/logo.png";
import "../../Styles/JobSeeker/JobSeekerDashboard.css";
 
const JobSeekerDashboard = ({ children }) => {


    const url = "http://localhost:9191";


 const [sidebarOpen, setSidebarOpen] = useState(false);
 const location = useLocation();
 const dispatch = useDispatch();
 
 const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
 const closeSidebar = () => setSidebarOpen(false);
 const isActive = (path) => location.pathname.startsWith(path);
 
 const navItems = [
 { path: "/JobSeeker/dashboard", 
    // icon: <FaTachometerAlt />, 
    label: "Dashboard" },
 {
 path: "/JobSeeker/MyJobApplications",
//  icon: <FaMapMarkedAlt />,
 label: "My Job Applications",
 },
 {
 path: "/JobSeeker/Recommendations",
//  icon: <FaUserFriends />,
 label: "Recommendations",
 },
 {
 path: "/JobSeeker/Messages",
//  icon: <FaUserFriends />,
 label: "Messages",
 },
 {
 path: "/JobSeeker/Analysis",
//  icon: <FaUserGraduate />,
 label: "Analysis",
 },
 {
 path: "/JobSeeker/Settings",
//  icon: <FaUserGraduate />,
 label: "Settings",
 },

 ];

 return (
 <div className="JobSeekerHome_layout-container">
 {/*header section */}
 <header className="JobSeekerHome_header">
 <button
 className="JobSeekerHome_sidebar-toggle-btn"
 onClick={toggleSidebar}
 aria-label="Toggle Sidebar"
 >
 <FaBars />
 </button>
 
 <div className="JobSeekerHome_logo-container">
 <img src="" alt="Logo" />
 {/* <img src={logo} alt="Logo" /> */}
 </div>
 
 <div className="JobSeekerHome_search-container">
 <input
 type="text"
 placeholder="Search"
 className="JobSeekerHome_search-input"
 />
 <FaSearch className="JobSeekerHome_search-icon" />
 </div>
 
 <div className="JobSeekerHome_right-section">
     <div className="JobSeekerHome_user-greeting">Jobs</div>
 <div className="JobSeekerHome_user-greeting">Companies</div>

 <div className="JobSeekerHome_notification">
 <FaBell className="JobSeekerHome_bell-icon" />
 </div>

 <div className="JobSeekerHome_Profile">
 <FaBell className="JobSeekerHome_Profile" />
 </div>

 </div>
 </header>
 {/*body section */}
 {/*Sidebar*/}
 <div
 className={`JobSeekerHome_sidebar-overlay ${sidebarOpen ? "active" : ""}`}
 onClick={closeSidebar}
 ></div>
 
 <div className="JobSeekerHome_layout-body">
 <nav className={`JobSeekerHome_sidebar ${sidebarOpen ? "active" : ""}`}>
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
 
 <main className="JobSeeker-Home_main-content">{children}</main>
 </div>
 </div>
 );
};
 
export default JobSeekerDashboard;
 


