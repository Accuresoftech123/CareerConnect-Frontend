import React, { useState } from "react";
import "../../../Styles/JobSeeker/DashComponents/JSJobDetails.css";
import SearchIcon from "@mui/icons-material/Search";
import { SvgIcon } from "@mui/material";

const JSJobDetails = () => {
    const JSjobDetails = [
        {
            id: 1,
            title: "UI UX Designer",
            company: "Techno Solutions Pvt Ltd",
            location: "Hinjewadi, Pune",
            type: "Hybrid / Remote",
            salary: "3.5 Lakhs - 6 Lakhs",
            experience: "0 - 1 year",
            tags: ["Figma", "UI", "UX", "Prototyping"],
            time: "7 hours before",
        },
        {
            id: 2,
            title: "UI Designer",
            company: "Collabera Digital Pvt Ltd",
            location: "Sector 5, Delhi",
            type: "Remote",
            salary: "5 Lakhs - 7.5 Lakhs",
            experience: "0.6 - 2 years",
            tags: ["UI design", "Figma", "Adobe", "wireframing"],
            time: "12 hours before",
        },
        {
            id: 3,
            title: "Junior UI UX Designer",
            company: "Surya Technologies",
            location: "Rajiv Nagar, Indore",
            type: "In Office",
            salary: "4 Lakhs - 6.5 Lakhs",
            experience: "0 - 2 years",
            tags: ["Figma", "UX research", "UI Design"],
            time: "1 day before",
        },
        {
            id: 4,
            title: "UX Researcher",
            company: "QuantumQube Technologies",
            location: "Dombivli, Mumbai",
            type: "Remote",
            salary: "6 Lakhs - 10 Lakhs",
            experience: "2 - 4 years",
            tags: ["UX research", "IA", "Wireframing"],
            time: "2 days before",
        },
    ];

    const [selectedIndex, setSelectedIndex] = useState(0);
    const currentJob = JSjobDetails[selectedIndex];

    const handlePrev = () => {
        if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
    };

    const handleNext = () => {
        if (selectedIndex < JSjobDetails.length - 1) setSelectedIndex(selectedIndex + 1);
    };

    return (
        <div >
            <section class="jsjd-search">
                <form action="#" method="get">
                    <div className="jsjd-searchinput-container">
                    <SvgIcon component={SearchIcon} />
                    <input type="text" name="keywords"
                        placeholder="Search jobs by title" />
                        </div>
                    <select name="location"
                        placeholder="Location" >
                            <option>Select Location</option>
                        </select>
                    <select  name="company"
                        placeholder="Experience" >
                        <option>Select Experince</option>
                        </select>
                    <button type="submit">
                        Search
                    </button>
                </form>
            </section>
            <div className="jsjd-container">
            {/* LEFT SIDEBAR WITH ALL JOB CARDS */}
            <div className="jsjd-sidebar">
                {JSjobDetails.map((job, index) => (
                    <div
                        key={job.id}
                        className={`jsjd-card ${index === selectedIndex ? "jsjd-card-active" : ""}`}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <div className="jsjd-tags">
                            {job.tags.map((tag, i) => (
                                <span key={i}>{tag}</span>
                            ))}
                        </div>
                        <p>{job.experience} • {job.salary}</p>
                        <p className="jsjd-time">{job.time}</p>
                    </div>
                ))}
            </div>

            {/* RIGHT DETAILS PANEL */}
            <div className="jsjd-detail">
                <h2>{currentJob.title}</h2>
                <p><strong>Company:</strong> {currentJob.company}</p>
                <p><strong>Location:</strong> {currentJob.location}</p>
                <p><strong>Type:</strong> {currentJob.type}</p>
                <p><strong>Salary:</strong> {currentJob.salary}</p>
                <p><strong>Experience:</strong> {currentJob.experience}</p>
                <div className="jsjd-tags">
                    {currentJob.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                    ))}
                </div>

                <div className="jsjd-job-summary">
                    <h4>Job Summary</h4>
                    <p>We are seeking a highly motivated UI/UX Designer to join our team...</p>

                    <h4>Key Responsibilities</h4>
                    <ul>
                        <li>Collaborate with developers</li>
                        <li>Design mockups and prototypes</li>
                        <li>Conduct user testing</li>
                    </ul>

                    <h4>Skills</h4>
                    <ul>
                        <li>Figma, Adobe XD, Sketch</li>
                        <li>Wireframing & Prototyping</li>
                        <li>User research and usability testing</li>
                    </ul>

                    <h4>Perks</h4>
                    <ul>
                        <li>Remote work</li>
                        <li>Flexible hours</li>
                        <li>Annual bonus</li>
                    </ul>
                </div>

                <button className="jsjd-apply-btn">Apply Now</button>
            </div>
            </div>
            <div className="jsjd-pagination">
                    <button onClick={handlePrev} disabled={selectedIndex === 0}>Prev</button>
                    <span>{selectedIndex + 1} / {JSjobDetails.length}</span>
                    <button onClick={handleNext} disabled={selectedIndex === JSjobDetails.length - 1}>Next</button>
                </div>
        </div>
    );
};

export default JSJobDetails;
