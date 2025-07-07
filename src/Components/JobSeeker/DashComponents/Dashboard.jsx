// Dashboard.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import send from "../../../Images/send.svg";
import bookmark from "../../../Images/bookmark.svg";
import calendarDays from "../../../Images/calendarDays.svg"
import zap from "../../../Images/zap.svg";
import eye from "../../../Images/eye.svg";
import mail from "../../../Images/mail.svg";
import penLine from "../../../Images/penLine.svg";
import bookmarkBlank from "../../../Images/bookmarkBlank.svg";
import productDesigner from "../../../Images/productDesigner.svg";
import UiUxDesigner from "../../../Images/UiUxDesigner.svg";
import UxDesigner from "../../../Images/UxDesigner.svg";



import "../../../Styles/JobSeeker/DashComponents/Dashboard.css";

const Dashboard = () => {
        const navigate = useNavigate(); // ✅ Add this line

    
        const handleClick = () => {
            navigate("/JobSeekerHome/Job-details");

        };


        return (
            <>

                <div className="JobSeeker-dashboard-content">

                    {/* Cretate Profile */}
                    <div className="JobSeeker-dashboard-complete-profile-section">
                        <div className="JobSeeker-dashboard-profile-progress">
                            <h3>Complete your profile</h3>
                            <p>80% profile is completed - Almost there</p>
                            <div className="JobSeeker-dashboard-progress-bar-container">
                                <div className="JobSeeker-dashboard-progress-bar" ></div>
                            </div>
                        </div>
                        <button className="JobSeeker-dashboard-complete-profile-button">Complete profile</button>
                    </div>
                    <div className="JobSeeker-dashboard-stats">
                        <div className="JobSeeker-dashboard-stat-card">
                            <div className="JobSeeker-dashboard-stat-icon">
                                <img src={send} alt="send" />
                            </div>
                            <div className="JobSeeker-dashboard-stat-info">
                                <p className="JobSeeker-dashboard-stat-label">Application sent</p>
                                <p className="JobSeeker-dashboard-stat-value">28</p>
                                <p className="JobSeeker-dashboard-stat-change">↑ 25% from last month</p>
                            </div>
                        </div>
                        <div className="JobSeeker-dashboard-stat-card">
                            <div className="JobSeeker-dashboard-stat-icon">
                                <img src={bookmark} alt="Saved Jobs" />
                            </div>
                            <div className="JobSeeker-dashboard-stat-info">
                                <p className="JobSeeker-dashboard-stat-label">Saved jobs</p>
                                <p className="JobSeeker-dashboard-stat-value">16</p>
                                <p className="JobSeeker-dashboard-stat-change">↑ 5 new for this week</p>
                            </div>
                        </div>
                        <div className="JobSeeker-dashboard-stat-card">
                            <div className="JobSeeker-dashboard-stat-icon">
                                <img src={calendarDays} alt="Interview Scheduled" />
                            </div>
                            <div className="JobSeeker-dashboard-stat-info">
                                <p className="JobSeeker-dashboard-stat-label">Interview scheduled</p>
                                <p className="JobSeeker-dashboard-stat-value">04</p>
                                <p className="JobSeeker-dashboard-stat-change">↑ 2 more than last week</p>
                            </div>
                        </div>
                        <div className="JobSeeker-dashboard-stat-card">
                            <div className="JobSeeker-dashboard-stat-icon">
                                <img src={zap} alt="Job Matches" />
                            </div>
                            <div className="JobSeeker-dashboard-stat-info">
                                <p className="JobSeeker-dashboard-stat-label">Today's job matches</p>
                                <p className="JobSeeker-dashboard-stat-value">18</p>
                                <p className="JobSeeker-dashboard-stat-link">View all matches</p>
                            </div>
                        </div>
                    </div>


                    {/* Recommended Jobs */}

                    <div className="JobSeeker-dashboard-JobSeeker-recommended-jobs">
                        <h3>Recommended for your</h3>
                        <div className="JobSeeker-dashboard-cards-container">
                            <div className="JobSeeker-dashboard-JobSeeker-job-card">
                                <div className="JobSeeker-dashboard-header">
                                    <div className="JobSeeker-dashboard-icon">
                                        <img src={UiUxDesigner} alt="job" />
                                    </div>
                                    <div className="JobSeeker-dashboard-details">
                                        <div className="JobSeeker-dashboard-title-company">
                                            <span className="JobSeeker-dashboard-title">UI UX Designer</span>
                                            <span className="JobSeeker-dashboard-company">Techno Solutions Pvt Ltd</span>
                                        </div>
                                        <button className="JobSeeker-dashboard-bookmark-button"><img src={bookmarkBlank} alt="bookmark" /></button>
                                    </div>
                                </div>
                                <div className="JobSeeker-dashboard-info">
                                    <p><span className="JobSeeker-dashboard-info-icon">📍</span> Hinjewadi, Pune</p>
                                    <p><span className="JobSeeker-dashboard-info-icon">🏢</span> Hybrid</p>
                                    <p><span className="JobSeeker-dashboard-info-icon">💰</span> 3.5 Lakhs - 6 Lakhs</p>
                                </div>
                                <div className="JobSeeker-dashboard-tags">
                                    <span className="JobSeeker-dashboard-tag">Figma</span>
                                    <span className="JobSeeker-dashboard-tag">UI</span>
                                    <span className="JobSeeker-dashboard-tag">UX</span>
                                    <span className="JobSeeker-dashboard-tag">Prototyping</span>
                                </div>
                                <div class="JobSeeker-dashboard-button-group">
                                    <button className="JobSeeker-dashboard-apply-button">Apply</button>
                                    <button onClick={handleClick}className="JobSeeker-dashboard-details-button">Details</button>
                                </div>

                            </div>

                            <div className="JobSeeker-dashboard-card">
                                <div className="JobSeeker-dashboard-header">
                                    <div className="JobSeeker-dashboard-icon">
                                        <img src={productDesigner} alt="job" />
                                    </div>

                                    <div className="JobSeeker-dashboard-details">
                                        <div className="JobSeeker-dashboard-title-company">
                                            <span className="JobSeeker-dashboard-title">Product Designer</span>
                                            <span className="JobSeeker-dashboard-company">QTS Softech Pvt. Ltd.</span>
                                        </div>
                                        <button className="JobSeeker-dashboard-bookmark-button"><img src={bookmarkBlank} alt="bookmark" /></button>
                                    </div>
                                </div>
                                <div className="JobSeeker-dashboard-info">
                                    <p><span className="JobSeeker-dashboard-info-icon">📍</span> Sector 12, Gurugram</p>
                                    <p><span className="JobSeeker-dashboard-info-icon">🏢</span> In office</p>
                                    <p><span className="JobSeeker-dashboard-info-icon">💰</span> 6 Lakhs - 10.4 Lakhs</p>
                                </div>
                                <div className="JobSeeker-dashboard-tags">
                                    <span className="JobSeeker-dashboard-tag">Adobe XD</span>
                                    <span className="JobSeeker-dashboard-tag">UI design</span>
                                    <span className="JobSeeker-dashboard-tag">Wireframing</span>
                                </div>
                                <div class="JobSeeker-dashboard-button-group">
                                    <button  className="JobSeeker-dashboard-apply-button">Apply</button>
                                    <button onClick={handleClick} className="JobSeeker-dashboard-details-button">Details</button>
                                </div>

                            </div>

                            <div className="JobSeeker-dashboard-card">
                                <div className="JobSeeker-dashboard-header">
                                    <div className="JobSeeker-dashboard-icon">
                                        <img src={UxDesigner} alt="job" />
                                    </div>
                                    <div className="JobSeeker-dashboard-details">
                                        <div className="JobSeeker-dashboard-title-company">
                                            <span className="JobSeeker-dashboard-title">UX Researcher</span>
                                            <span className="JobSeeker-dashboard-company">Nexius Digital</span>
                                        </div>
                                        <button className="JobSeeker-dashboard-bookmark-button"><img src={bookmarkBlank} alt="bookmark" /></button>
                                    </div>
                                </div>
                                <div className="JobSeeker-dashboard-info">
                                    <p><span className="JobSeeker-dashboard-info-icon">📍</span> Bangalore</p>
                                    <p><span className="JobSeeker-dashboard-info-icon">🏢</span> Remote</p>
                                    <p><span className="JobSeeker-dashboard-info-icon">💰</span> 7.2 Lakhs - 9.5 Lakhs</p>
                                </div>
                                <div className="JobSeeker-dashboard-tags">
                                    <span className="JobSeeker-dashboard-tag">UX research</span>
                                    <span className="JobSeeker-dashboard-tag">UX</span>
                                    <span className="JobSeeker-dashboard-tag">User flow</span>
                                </div>
                                <div class="JobSeeker-dashboard-button-group">
                                    <button className="JobSeeker-dashboard-apply-button">Apply</button>
                                    <button onClick={handleClick} className="JobSeeker-dashboard-details-button">Details</button>
                                </div>

                            </div>
                        </div>


                        {/* Upcoming Interviews */}
                        <div className="JobSeeker-dashboard-upcoming-interviews">
                            <div className="JobSeeker-dashboard-icon">
                                <img src={calendarDays} alt="calendar" />
                            </div>
                            <h3>Upcoming Interviews</h3>
                            <button className="JobSeeker-dashboard-view-all-button">View all</button>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Company Name</th>
                                        <th>Job Title</th>
                                        <th>Date & Time</th>
                                        <th>Interview Round</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Oracle Software Pvt Ltd</td>
                                        <td>Product Designer</td>
                                        <td>30 May 2025 11:30 AM</td>
                                        <td>Technical round 2</td>
                                        <td className="JobSeeker-dashboard-interview-actions">
                                            <div className="JobSeeker-dashboard-upcoming-interviews-Eye">
                                                <img src={eye} alt="job" />
                                            </div>
                                            <div className="JobSeeker-dashboard-upcoming-interviews-MsgBox">
                                                <img src={mail} alt="job" />
                                            </div>

                                            <div className="JobSeeker-dashboard-upcoming-interviews-Edit">
                                                <img src={penLine} alt="job" />
                                            </div>



                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Synergy Digital</td>
                                        <td>UI UX Designer</td>
                                        <td>03 June 2025 1:00 PM</td>
                                        <td>HR discussion</td>
                                        <td className="JobSeeker-dashboard-interview-actions">
                                            <div className="JobSeeker-dashboard-upcoming-interviews-Eye">
                                                <img src={eye} alt="job" />
                                            </div>
                                            <div className="JobSeeker-dashboard-MsgBox">
                                                <img src={mail} alt="job" />
                                            </div>

                                            <div className="JobSeeker-dashboard-Edit">
                                                <img src={penLine} alt="job" />
                                            </div>


                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Growth X Solutions Pvt Ltd</td>
                                        <td>UI Designer</td>
                                        <td>03 June 2025 4:00 PM</td>
                                        <td>HR introduction</td>
                                        <td className="JobSeeker-dashboard-interview-actions">
                                            <div className="JobSeeker-dashboard-upcoming-interviews-Eye">
                                                <img src={eye} alt="job" />
                                            </div>
                                            <div className="JobSeeker-dashboard-MsgBox">
                                                <img src={mail} alt="job" />
                                            </div>

                                            <div className="JobSeeker-dashboard-Edit">
                                                <img src={penLine} alt="job" />
                                            </div>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>









            </>

        )
    }


    export default Dashboard;



