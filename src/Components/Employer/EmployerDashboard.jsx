import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Employer/EmployerDashboard.css";


import search from "../../Images/search.svg";
import Notification from "../../Images/Notification.svg";
import userHeader from "../../Images/userHeader.svg";

import Dashboard from "../../Images/Dashboard.svg";
import MyJobsPost from "../../Images/MyJobsPost.svg";
import Applicants from "../../Images/Applicants.svg";
import Recommendation from "../../Images/Recommendation.svg";
import Messages from "../../Images/Messages.svg";
import Analysis from "../../Images/Analysis.svg";
import settings from "../../Images/settings.svg";



const EmployerDashboard = () => {
    return (
        <>


            <div className="Employer_Dashboard-Container">
                {/* header */}
                <header className="Employer_Dashboard-header">
                    <div className="Employer_Dashboard-logo">
                        <span>Career</span> Connect
                    </div>
                    <nav className="Employer_Dashboard-nav-links">
                        <Link to="#" className="Employer_Dashboard-header-link">
                            <img src={search} alt="search" className="Employer_Dashboard-profile-icon" />
                        </Link>
                        <Link to="#" className="Employer_Dashboard-header-link">
                            <img src={Notification} alt="Notification" className="Employer_Dashboard-profile-icon" />
                        </Link>
                        <Link to="#" className="Employer_Dashboard-header-link">
                            <img src={userHeader} alt="userHeader" className="Employer_Dashboard-profile-icon" />
                        </Link>
                        <Link to="#">
                            <button className="Employer_Dashboard-btn-primary" >
                                Post a Job
                            </button>
                        </Link>
                    </nav>
                </header>


                {/* Sidebar */}


                <div className="Employer_Dashboard-sidebar">
                    <div className="Employer_Dashboard-sidebar-header"></div>

                    <ul className="Employer_Dashboard-sidebar-menu">

                        <li className="Employer_Dashboard-menu-item">
                            <a href="#">
                                <img src={Dashboard} alt="Dashboard" className="Employer_Dashboard-sidebar-profile-icon" />
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className="Employer_Dashboard-menu-item">
                            <a href="#">
                                <img src={MyJobsPost} alt="MyJobsPost" className="Employer_Dashboard-sidebar-profile-icon" />
                                <span>My Job Posts</span>
                            </a>
                        </li>
                        <li className="Employer_Dashboard-menu-item">
                            <a href="#">
                                <img src={Applicants} alt="Applicants" className="Employer_Dashboard-sidebar-profile-icon" />
                                <span>Applicants</span>
                            </a>
                        </li>
                        <li className="Employer_Dashboard-menu-item">
                            <a href="#">
                                <img src={Recommendation} alt="Recommendation" className="Employer_Dashboard-sidebar-profile-icon" />
                                <span>Recommendation</span>
                            </a>
                        </li>
                        <li className="Employer_Dashboard-menu-item">
                            <a href="#">
                                <img src={Messages} alt="Messages" className="Employer_Dashboard-sidebar-profile-icon" />
                                <span>Messages</span>
                            </a>
                        </li>
                        <li className="Employer_Dashboard-menu-item">
                            <a href="#">
                                <img src={Analysis} alt="Analysis" className="Employer_Dashboard-sidebar-profile-icon" />
                                <span>Analysis</span>
                            </a>
                        </li>
                        <li className="Employer_Dashboard-menu-item">
                            <a href="#">
                                <img src={settings} alt="settings" className="Employer_Dashboard-sidebar-profile-icon" />
                                <span>Settings</span>
                            </a>
                        </li>
                    </ul>
                    <button type="submit" className="Employer_Dashboard-Sidebar-PostButton">Post a job</button>


                    <div className="Employer_Dashboard-sidebar-footer">
                        <div className="Employer_Dashboard-user-profile">
                            <img src="Employer_Dashboard-user-profile-pic.jpg" alt="User Profile" className="profile-pic" />
                            <div className="user-info">
                                <span className="Employer_Dashboard-user-name">Shruti Punewar</span>
                                <span className="Employer_Dashboard-user-role">HR Executive</span>
                            </div>
                            <i className="icon-arrow-right"></i> {/* Replace with actual icon */}
                        </div>
                    </div>
                </div>


                {/* Middle-page */}
                <form className="Employer_Dashboard-MiddlePage">

                    {/* Post a Job - Top Section */}
                    <div className="Employer_Dashboard-job-post-container">
                        <h1 className="Employer_Dashboard-main-heading">Post a job</h1>
                        <p className="Employer_Dashboard-sub-heading">Ready to find your next great hire? Select a</p>

                        <div className="Employer_Dashboard-form-type-selection">
                            <label className="Employer_Dashboard-radio-option">
                                <input type="radio" name="formType" value="prefill" />
                                Prefill details from a job you've posted earlier
                            </label>
                            <label className="Employer_Dashboard-radio-option">
                                <input type="radio" name="formType" value="beginBlank" />
                                Begin with a blank job post form
                            </label>
                        </div>

                        <p className="Employer_Dashboard-form-instruction">
                            Fill out the details below and get your job live in minutes.
                        </p>
                        {/* <form className="Employer_Dashboard-job-post-form"></form>  This inner form tag is empty and not needed for styling, can be removed */}
                    </div>

                    {/* Basic details */}
                    <form className="Employer_Dashboard-form">
                        <section className="Employer_Dashboard-form-section">
                            <h2 className="Employer_Dashboard-section-title">Basic details</h2>
                            <div className="Employer_Dashboard-form-group">
                                <label htmlFor="jobTitle" className="Employer_Dashboard-label-required">Job title</label>
                                <input type="text" id="jobTitle" className="Employer_Dashboard-text-input" placeholder="E.g Software developer"
                                    required />
                            </div>
                            <div className="Employer_Dashboard-form-group">
                                <label htmlFor="employmentType" className="Employer_Dashboard-label-required">Employment type</label>
                                <select
                                    id="employmentType" className="Employer_Dashboard-select-input" required
                                >
                                    <option value="">Select employment type</option>
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="temporary">Temporary</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>

                        </section>

                        {/* Job Details */}
                        <section className="Employer_Dashboard-form-section">
                            <h2 className="Employer_Dashboard-section-title">Job details</h2>
                            <div className="Employer_Dashboard-form-group">
                                <label htmlFor="jobDescription" className="Employer_Dashboard-label-required">Job description</label>
                                <textarea
                                    id="jobDescription"
                                    className="Employer_Dashboard-textarea-input"
                                    placeholder="Describe a role and responsibilities......."
                                    rows="6"
                                    required
                                ></textarea>
                            </div>
                        </section>

                        {/* Required skills */}
                        <section className="Employer_Dashboard-form-section">
                            <h2 className="Employer_Dashboard-section-title">Required skills</h2>
                            <div className="Employer_Dashboard-skills-input-group">
                                <div className="Employer_Dashboard-skills-tags-container">
                                </div>
                                <input
                                    type="text"
                                    className="Employer_Dashboard-text-input"
                                    placeholder="+ Add skills"
                                />
                            </div>
                        </section>

                        {/* New: Experience Required section */}
                        <div className="Employer_Dashboard-form-group">
                            <label htmlFor="minExperience" className="Employer_Dashboard-label-required">Experience required</label>
                            <div className="Employer_Dashboard-experience-range-group-abc">
                                <select id="minExperience" className="Employer_Dashboard-text-input-half">
                                    <option value="">Minimum experience</option>
                                </select>
                                <span className="experience-separator">  to  </span>
                                <select id="maxExperience" className="Employer_Dashboard-text-input-half">
                                    <option value="">Maximum experience</option>
                                </select>
                            </div>
                        </div>

                        {/* Location And Compensation */}
                        <section className="Employer_Dashboard-form-section">
                            <h2 className="Employer_Dashboard-section-title">Location & Compensation</h2>
                            <div className="Employer_Dashboard-form-group">
                                <label htmlFor="location" className="Employer_Dashboard-label-required">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    className="Employer_Dashboard-text-input"
                                    placeholder="E.g Pune, Mumbai, Bangalore...."
                                />
                            </div>
                            <div className="Employer_Dashboard-form-group">
                                <label htmlFor="salaryRange" className="Employer_Dashboard-input-label">Salary range <span className="Employer_Dashboard-label-optional">(optional)</span></label>
                                <div className="Employer_Dashboard-salary-range-group">
                                    <input
                                        type="number"
                                        className="Employer_Dashboard-text-input-half"
                                        placeholder="Minimum"
                                    />
                                    <span className="salary-separator">to</span>
                                    <input
                                        type="number"
                                        className="Employer_Dashboard-text-input-half"
                                        placeholder="Maximum"
                                    />
                                </div>
                            </div>
                            <div className="Employer_Dashboard-form-group">
                                <label className="Employer_Dashboard-input-label">Benefits <span className="Employer_Dashboard-label-optional">(optional)</span></label>
                                <div className="Employer_Dashboard-benefits-grid">
                                    <label className="Employer_Dashboard-checkbox-option">
                                        <input type="checkbox" name="healthInsurance" />
                                        Health insurance
                                    </label>
                                    <label className="Employer_Dashboard-checkbox-option">
                                        <input type="checkbox" name="annualBonus" />
                                        Annual bonus
                                    </label>
                                    <label className="Employer_Dashboard-checkbox-option">
                                        <input type="checkbox" name="remoteHybridFlexibility" />
                                        Remote/hybrid flexibility
                                    </label>
                                    <label className="Employer_Dashboard-checkbox-option">
                                        <input type="checkbox" name="travelAllowance" />
                                        Travel allowance
                                    </label>
                                    <label className="Employer_Dashboard-checkbox-option">
                                        <input type="checkbox" name="esops" />
                                        ESOP's
                                    </label>
                                    <label className="Employer_Dashboard-checkbox-option">
                                        <input type="checkbox" name="learningPrograms" />
                                        Learning programs
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Additional Details */}
                        <section className="Employer_Dashboard-form-section">
                            <h2 className="Employer_Dashboard-section-title">Additional details</h2>
                            <div className="Employer_Dashboard-form-group">
                                <label htmlFor="applicationDeadline" className="Employer_Dashboard-label-required">Application deadline</label>
                                <div className="Employer_Dashboard-date-input-wrapper">
                                    <input
                                        type="date"
                                        id="applicationDeadline"
                                        className="Employer_Dashboard-text-input"
                                        required
                                    />

                                </div>
                            </div>
                            <div className="Employer_Dashboard-form-group">
                                <label htmlFor="numberOfOpening" className="Employer_Dashboard-input-label">Number of opening <span className="Employer_Dashboard-label-optional">(optional)</span></label>
                                <input
                                    type="number"
                                    id="numberOfOpening"
                                    className="Employer_Dashboard-text-input"
                                    placeholder="E.g., 2"
                                />
                            </div>
                        </section>
                        <div className="Employer_Dashboard-post-job-buttons">

                            <button type="submit" className="Employer_Dashboard-job-button-half">Save as draft</button>

                            <button type="submit" className="Employer_Dashboard-job-button-half active">Post a job</button>
                        </div>

                    </form>
                </form>



                {/* Post-preview-Section */}

                <div className="post-preview-container">
                    <h1>Post Preview</h1>

                    <section className="post-preview-section">
                        <h2>Basic details</h2>
                        <p><strong>Job title :</strong> Software Developer</p>
                        <p><strong>Employment type :</strong> Full-time</p> {/* Example added */}
                    </section>

                    <section className="post-preview-section">
                        <h2>Job details</h2>
                        <p><strong>Job description :</strong></p><p> We are seeking a highly motivated UI/UX Designer to join our design team. You'll collaborate with product managers, developers, and fellow.......</p>
                        <p><strong>Required skills :</strong> HTML/CSS/Java script/Node.js</p>
                        <p><strong>Experience :</strong> 2-4 years</p>
                    </section>

                    <section className="post-preview-section">
                        <h2>Location & compensation</h2>
                        <p><strong>Location :</strong> Pune</p>
                        <p><strong>Salary range :</strong> 400000-800000 Pa</p>
                        <p><strong>Benefits :</strong> Bonus, Health Insurance</p>
                    </section>

                    <section className="post-preview-section">
                        <h2>Additional details</h2>
                        <p><strong>Application deadline :</strong> 30/06/2025</p>
                        <p><strong>Number of openings :</strong> 03</p>
                    </section>


                </div>

            </div>






        </>
    );



};
export default EmployerDashboard;