import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/JobSeeker/JobSeekerDashboard.css";

import search from "../../Images/search.svg";
import Notification from "../../Images/Notification.svg";
import user from "../../Images/user.svg"


import Dashboard from "../../Images/Dashboard.svg";
import MyJobsPost from "../../Images/MyJobsPost.svg";
import Applicants from "../../Images/Applicants.svg";
import Recommendation from "../../Images/Recommendation.svg";
import Messages from "../../Images/Messages.svg";
import Analysis from "../../Images/Analysis.svg";
import settings from "../../Images/settings.svg";





const JobSeekerDashboard = () => {
    return (
        <>

            <div className="JobSeeker_Dashboard-Container">
                {/* header */}
                <header className="JobSeeker_Dashboard-header">
                    <div className="JobSeeker_Dashboard-logo">
                        <span>Career</span> Connect
                    </div>
                    <nav className="JobSeeker_Dashboard-nav-links">
                        <div className="JobSeeker_Dashboard-search-box">
                            <img src={search} alt="search" className="JobSeeker_Dashboard-profile-icon" />
                            <input type="text" id="SearchBox" className="JobSeeker_Dashboard-search-box-input"
                                placeholder="Search Jobs" required />
                        </div>
                        <Link to="/jobs" className="JobSeeker_Dashboard-nav-link" >Jobs</Link>
                        <Link to="/companies" className="JobSeeker_Dashboard-nav-link" >Companies</Link>


                        <Link to="#" >
                            <img src={Notification} alt="Notification" className="JobSeeker_Dashboard-nav-link" />
                        </Link>

                        <Link to="#" >
                            <img src={user} alt="user" className="JobSeeker_Dashboard-nav-link" />
                        </Link>

                    </nav>
                </header>



                {/* Side-bar */}
                <div className="JobSeeker_Dashboard-sidebar">
                    <div className="JobSeeker_Dashboard-sidebar-header"></div>

                    <ul className="JobSeeker_Dashboard-sidebar-menu">

                        <li className="JobSeeker_Dashboard-menu-item">
                            <a href="#">
                                <img src={Dashboard} alt="Dashboard" className="JobSeeker_Dashboard-sidebar-profile-icon" />
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className="JobSeeker_Dashboard-menu-item">
                            <a href="#">
                                <img src={MyJobsPost} alt="MyJobsPost" className="JobSeeker_Dashboard-sidebar-profile-icon" />
                                <span>My Job Posts</span>
                            </a>
                        </li>
                        <li className="JobSeeker_Dashboard-menu-item">
                            <a href="#">
                                <img src={Applicants} alt="Applicants" className="JobSeeker_Dashboard-sidebar-profile-icon" />
                                <span>Applicants</span>
                            </a>
                        </li>
                        <li className="JobSeeker_Dashboard-menu-item">
                            <a href="#">
                                <img src={Recommendation} alt="Recommendation" className="JobSeeker_Dashboard-sidebar-profile-icon" />
                                <span>Recommendation</span>
                            </a>
                        </li>
                        <li className="JobSeeker_Dashboard-menu-item">
                            <a href="#">
                                <img src={Messages} alt="Messages" className="JobSeeker_Dashboard-sidebar-profile-icon" />
                                <span>Messages</span>
                            </a>
                        </li>
                        <li className="JobSeeker_Dashboard-menu-item">
                            <a href="#">
                                <img src={Analysis} alt="Analysis" className="JobSeeker_Dashboard-sidebar-profile-icon" />
                                <span>Analysis</span>
                            </a>
                        </li>
                        <li className="JobSeeker_Dashboard-menu-item">
                            <a href="#">
                                <img src={settings} alt="settings" className="JobSeeker_Dashboard-sidebar-profile-icon" />
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Middle-Page */}
                <div className="JobSeeker_Dashboard-MiddlePage">
                    {/* Complete Your Profile */}
                    <div className="JobSeeker_Dashboard-Complete-Profile" >
                        <h2>Complete your profile</h2>
                        <p>80% profile is completed-Almost there</p>
                    
                    <div>
                        {/* taskbar */}
                        <button className="JobSeeker_Dashboard-Complete-Profile-button">Complete Profile</button>

                    </div>
                    </div>
                    {/* Features Option */}
                    <div className="JobSeeker_Dashboard-card-Features">
                        <div className="Jobseeker-Dashboard-card-Features option">
                            <h3>Application Sent</h3>
                            <Link to="#" >
                                <img src={Notification} alt="Notification" className="JobSeeker_Dashboard-nav-link" />
                            </Link>
                            <h2>28</h2>
                            <p>25% from last month</p>
                        </div>

                        <div className="Jobseeker-Dashboard-card-Features option">
                            <h3>Saved Jobs</h3>
                            <Link to="#" >
                                <img src={Notification} alt="Notification" className="JobSeeker_Dashboard-nav-link" />
                            </Link>
                            <h2>16</h2>
                            <p>+5 new jobs for this week</p>
                        </div>

                        <div className="Jobseeker-Dashboard-card-Features option">
                            <h3>Interview Scheduled</h3>
                            <Link to="#" >
                                <img src={Notification} alt="Notification" className="JobSeeker_Dashboard-nav-link" />
                            </Link>
                            <h2>04</h2>
                            <p>+2 more than last week</p>
                        </div>

                        <div className="Jobseeker-Dashboard-card-Features option">
                            <h3>Today's job matches</h3>
                            <Link to="#" >
                                <img src={Notification} alt="Notification" className="JobSeeker_Dashboard-nav-link" />
                            </Link>
                            <h2>18</h2>
                            <p>view all matches</p>
                        </div>
                    </div>


                    {/* Recommended for You */}
                    {/* <div className="JobSeeker_Dashboard-card-Recommendation">
                        <div className="JobSeeker_Dashboard-card-Recommendation jobs">
                            <h3>UI UX Designer</h3>
                            <p>Techno Solutions Pvt ltd</p>
                            <p>Hinjewadi,Pune</p>
                            <p>Hybrid</p>
                            <p>3.5Lakhs-6Lakhs</p>
                            <button>Apply</button>
                            <button>Details</button>
                        </div>

                    </div> */}

                    {/* Recommended Jobs */}
          <div className="JobSeeker_Dashboard-recommended-jobs">
            <h2 className="JobSeeker_Dashboard-section-title">Recommended for your</h2>
            <div className="JobSeeker_Dashboard-job-cards-container">
                <div className="JobSeeker_Dashboard-job-card" >
                  <div className="JobSeeker_Dashboard-job-header">
                    <div className="JobSeeker_Dashboard-company-in  fo">
                 <img src="" alt="" className="company-logo" /> 
                        {/* <img src={job.logo} alt={ logo} className="company-logo" />  */}

                      {/* <img src={job.logo} alt={`${job.company} logo`} className="company-logo" />  */}
                      <div className="JobSeeker_Dashboard-job-title-company">
                        <div className="JobSeeker_Dashboard-job-title"></div>
                        <div className="JobSeeker_Dashboard-company-name"></div>
                        {/* <div className="JobSeeker_Dashboard-job-title">{job.title}</div>
                        <div className="JobSeeker_Dashboard-company-name">{job.company}</div> */}
                      </div>
                    </div>
                    <span className="bookmark-icon">🔖</span>
                  </div>
                  <div className="JobSeeker_Dashboard-job-details">
                    <div className="JobSeeker_Dashboard-detail-item">📍 </div>
                    <div className="JobSeeker_Dashboard-detail-item">🏢 </div>
                    <div className="JobSeeker_Dashboard-detail-item">💰 </div>


                    {/* <div className="JobSeeker_Dashboard-detail-item">📍 {job.location}</div>
                    <div className="JobSeeker_Dashboard-detail-item">🏢 {job.type}</div>
                    <div className="JobSeeker_Dashboard-detail-item">💰 {job.salary}</div> */}
                  </div>
                  <div className="job-tags">
                    {/* {job.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="job-tag">
                        {tag}
                      </span>
                    ))} */}
                  </div>
                  <div className="JobSeeker_Dashboard-job-actions">
                    <button className="JobSeeker_Dashboard-apply-btn">Apply</button>
                    <button className="JobSeeker_Dashboard-details-btn">Details</button>
                  </div>
                </div>
              {/* ))} */}
            </div>
          </div>





                    {/* Upcoming Interview */}

                </div>







            </div>


        </>
    );



};
export default JobSeekerDashboard;