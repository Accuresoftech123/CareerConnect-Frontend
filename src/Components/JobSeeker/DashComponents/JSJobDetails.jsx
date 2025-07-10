// JSJobDetails

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import send from "../../../Images/send.svg";
import bookmarkBlank from "../../../Images/bookmarkBlank.svg";


import "../../../Styles/JobSeeker/DashComponents/JSJobDetails.css";

const JSJobDetails = () => {

    const tags = [
    'Figma', 'UI', 'UX', 'Prototyping', 'User flow',
    'Wireframing', 'HTML', 'CSS', 'Information Architecture'
  ];


    const jobSummaryContent = (
        <p>
            We are seeking a highly motivated UI/UX Designer to join our design team. You'll collaborate with product managers, developers, and fellow designers to create intuitive, user-friendly digital experiences. This role demands creativity, user empathy, and the ability to turn complex requirements into elegant solutions.
        </p>
    );

    const keyResponsibilitiesContent = (
        <ul>
            <li>Work closely with product and engineering teams to define user interface requirements.</li>
            <li>Create wireframes, interactive prototypes, and final UI designs for web and mobile applications.</li>
            <li>Conduct user research, usability testing, and A/B testing to inform design decisions.</li>
            <li>Maintain consistency across platforms and ensure alignment with brand guidelines.</li>
            <li>Collaborate with developers to implement designs accurately.</li>
            <li>Advocate for design best practices and user-centered design thinking within the team.</li>
        </ul>

    );

    const qualificationsSkillsContent = (
        <ul>
            <li>Bachelor's degree in Design, HCI, Computer Science, or a related field.</li>
            <li>0-1 years of experience in UI/UX design.</li>
            <li>Proficiency in Figma, Adobe XD, Sketch, or similar tools.</li>
            <li>Strong portfolio showcasing design process, UI skills, and interaction design.</li>
            <li>Understanding of responsive design, accessibility, and usability principles.</li>
            <li>Experience designing for SaaS or B2B products.</li>
            <li>Knowledge of front-end technologies like HTML, CSS, JavaScript (not required to code).</li>
        </ul>
    );


    const PerksSkillsContent = (
        <ul>
            <li>Health insurance for you and your family</li>
            <li>Annual performance bonuses</li>
            <li>Learning & development budget</li>
            <li>Work-from-home flexibility</li>
            <li>Free meals & gym (at Pune office)</li>
        </ul>
    );


    return (
        <>
            <div className="JS_JobDetails-page-container">
                <div className="JS_JobDetails-job-card-wrapper">
                    <div className="JS_JobDetails-job-info">
                        <h1 className="JS_JobDetails-job-title">UI UX Designer</h1>
                        <p className="JS_JobDetails-company-name">Techno Solutions Pvt Ltd</p>
                        <div className="JS_JobDetails-rating">
                            <span>⭐ 3.7</span>
                        </div>
                        <div className="JS_JobDetails-actions">
                            <button className="JS_JobDetails-icon-button"><img src={send} alt="send" /></button>
                            <button className="JS_JobDetails-icon-button"><img src={bookmarkBlank} alt="Saved" /></button>
                        </div>
                    </div>

                    {/* Job Overview Section */}
                    <section className="JS_JobDetails-job-overview-section">

                        <div className="JS_JobDetails-detail-item">
                            <span className="JS_JobDetails-detail-icon">📍</span> Hinjewadi, Pune
                        </div>
                        <div className="JS_JobDetails-detail-item">
                            <span className="JS_JobDetails-detail-icon">🏢</span> Hybrid / Remote
                        </div>

                        <div className="JS_JobDetails-detail-item-below">
                        <div className="JS_JobDetails-detail-item">
                            <span className="JS_JobDetails-detail-icon">💰</span> 3.5 Lakhs - 6 Lakhs
                        </div>
                        <div className="JS_JobDetails-detail-item">
                            <span className="JS_JobDetails-detail-icon">🗓️</span> 0-1 Year
                        </div>
                        </div>
                        <button className="JS_JobDetails-apply-button-top">Apply</button>
                    </section>
                </div>


                <div className="JS_JobDetails-Describe-Job_info">

                {/* Tags Section */}
                <section className="JS_JobDetails-tags-section">
                    {tags.map((tag, index) => (
                        <span key={index} className="JS_JobDetails-tag">
                            {tag}
                        </span>
                    ))}
                </section>



                {/* Job Summary Section */}
                <section className="JS_JobDetails-content-section">
                    <h2 className="JS_JobDetails-section-title">Job Summary</h2>
                    <div className="JS_JobDetails-section-content">
                        {jobSummaryContent}
                    </div>
                </section>

                {/* Key Responsibilities Section */}
                <section className="JS_JobDetails-content-section">
                    <h2 className="JS_JobDetails-section-title">Key responsibilities</h2>
                    <div className="JS_JobDetails-section-content">
                        {keyResponsibilitiesContent}
                    </div>
                </section>

                {/* Qualifications & Skills Section */}
                <section className="JS_JobDetails-content-section">
                    <h2 className="JS_JobDetails-section-title">Qualifications & Skills</h2>
                    <div className="JS_JobDetails-section-content">
                        {qualificationsSkillsContent}
                    </div>
                </section>

                {/* Perks And Benefits */}
                <section className="JS_JobDetails-content-section">
                    <h2 className="JS_JobDetails-section-title">Perks & Benefits</h2>
                    <div className="JS_JobDetails-section-content">
                        {PerksSkillsContent}
                        <p>
                            Click on <a href="#" className="JS_JobDetails-apply-now-link">Apply Now</a> to upload your resume and portfolio. Shortlisted candidates will be contacted within 5 working days.
                        </p>
                    </div>
                </section>

                {/* Company Overview Section */}
                <section className="JS_JobDetails-company-overview-section">
                    <h2 className="JS_JobDetails-section-title">Company overview</h2>
                    <div className="JS_JobDetails-company-content">
                        <p><strong>Company Name</strong> - Techno Solutions Pvt. Ltd.</p>
                        <p><strong>Location</strong> - 602, Blue Ridge, Hinjewadi phase 1, Pune- 411057</p>
                        <p><strong>Industry</strong> - IT solutions</p>
                        <p>
                            <strong>Website</strong> - <a href="http://www.technosolutions.com" target="_blank" rel="noopener noreferrer" className="JS_JobDetails-website-link">www.technosolutions.com</a>
                        </p>
                        <p className="JS_JobDetails-about-us-text">
                            <strong>About us</strong> - Techno solutions is a global IT leader that trusted by 100+ customers across 26+ countries. Our team values innovation, collaboration, and human-centric design thinking.
                        </p>
                    </div>
                </section>

                {/* Contact Details Section */}
                <section className="JS_JobDetails-contact-details-section">
                    <h2 className="JS_JobDetails-section-title">Contact Details</h2>
                    <div className="JS_JobDetails-contact-content">
                        <p><strong>Recruiter Name</strong> - Anjali Sinha</p>
                        <p><strong>Mail ID</strong> - <a href="mailto:careers@technosolutions.com" className="JS_JobDetails-mail-link">careers@technosolutions.com</a></p>
                    </div>
                </section>

                <div className="JS_JobDetails-apply-button-bottom">
                    <button className="JS_JobDetails-apply-button-bottom">Apply</button>
                </div>
                </div>













            </div>


        </>
    );
};
export default JSJobDetails; 
