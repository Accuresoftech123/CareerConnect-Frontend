import React, { useState, useEffect } from "react";
import "../../../Styles/Admin/Dashcomponents/ScheduleInterviewModal.css";
import Candidates from "../../../Images/Candidates.svg";
import newRecruiter from "../../../Images/newRecruiter.svg";
// import axios from "axios"; // Uncomment when using axios

const ScheduleInterviewModal = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    candidateName: "",
    currentJobTitle: "",
    experience: "",
    expectedSalary: "",
    companyName: "",
    jobTitle: "",
    requiredExperience: "",
    salaryRange: "",
    interviewDate: "",
    startTime: "",
    endTime: "",
    platform: "",
    location: "",
    companyEmail: "",
    linkedInUrl: "",
    remarks: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        candidateName: user.name || "",
        currentJobTitle: user.jobTitle || "",
        experience: `${user.minExperience}-${user.maxExperience} Years`,
        expectedSalary: user.ExpectedSalary || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Scheduled Interview Data:", formData);

    // axios.post("/api/interviews", formData)
    //   .then(res => console.log("Success:", res.data))
    //   .catch(err => console.error("Error:", err));

    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="scheduleInterview-modal-overlay">
      <div className="scheduleInterview-modal">
        <h3 className="scheduleInterview-modal-title">Schedule Interview</h3>
        <form className="scheduleInterview-form" onSubmit={handleSubmit}>
          {/* Candidate Details */}
          <div className="scheduleInterview-form-section">
            <div className="scheduleInterview-section-title">
              <span className="scheduleInterview-section-icon" style={{ paddingRight: "20px" }}>
                <img src={Candidates} alt="New Candidates" />
              </span>
              <h4 style={{ paddingTop: "20px", fontWeight: "bold" }}>Candidate Details</h4>
            </div>
            <div className="scheduleInterview-form-row">
              <div className="scheduleInterview-input-group">
                <label>Candidate Name:</label>
                <input
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleChange}
                />
              </div>
              <div className="scheduleInterview-input-group">
                <label>Current Job Title:</label>
                <input
                  type="text"
                  name="currentJobTitle"
                  value={formData.currentJobTitle}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="scheduleInterview-form-row">
              <div className="scheduleInterview-input-group">
                <label>Experience:</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
              <div className="scheduleInterview-input-group">
                <label>Expected Salary:</label>
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="scheduleInterview-form-section">
            <div className="scheduleInterview-section-title">
              <span className="scheduleInterview-section-icon" style={{ paddingRight: "20px" }}>
                <img src={newRecruiter} alt="New Candidates" />
              </span>
              <h4 style={{ paddingTop: "20px", fontWeight: "bold" }}>Company Details</h4>
            </div>
            <div className="scheduleInterview-form-row">
              <div className="scheduleInterview-input-group">
                <label>Company Name:</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="scheduleInterview-input-group">
                <label>Job Title:</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="scheduleInterview-form-row">
              <div className="scheduleInterview-input-group">
                <label>Required Experience:</label>
                <input
                  type="text"
                  name="requiredExperience"
                  value={formData.requiredExperience}
                  onChange={handleChange}
                />
              </div>
              <div className="scheduleInterview-input-group">
                <label>Salary Range:</label>
                <input
                  type="text"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Interview Details */}
          <div className="scheduleInterview-form-section">
            <div className="scheduleInterview-section-title">
              <span
                className="material-symbols-outlined calendar-clock-icon"
                style={{
                  fontSize: "28px",
                  color: "#842cc0",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                calendar_clock
              </span>
              <h4 style={{ paddingTop: "20px", paddingLeft: "20px", fontWeight: "bold" }}>
                Interview Details
              </h4>
            </div>
            <div className="scheduleInterview-form-row">
              <div className="scheduleInterview-input-group">
                <label>Date:</label>
                <input
                  type="date"
                  name="interviewDate"
                  value={formData.interviewDate}
                  onChange={handleChange}
                />
              </div>
              <div className="scheduleInterview-input-group">
                <label>Time:</label>
                <div className="time-range-wrapper">
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                  <span>to</span>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="scheduleInterview-form-row">
              <div className="scheduleInterview-input-group">
                <label>Platform:</label>
                <input
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                />
              </div>
              <div className="scheduleInterview-input-group">
                <label>Location / Address:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="scheduleInterview-form-row">
              <div className="scheduleInterview-input-group">
                <label>Company Email:</label>
                <input
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="scheduleInterview-input-group">
                <label>LinkedIn URL:</label>
                <input
                  type="url"
                  name="linkedInUrl"
                  value={formData.linkedInUrl}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="scheduleInterview-form-row-full">
              <div className="scheduleInterview-input-group">
                <label>Additional Remark:</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Enter other instructions or notes..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="scheduleInterview-modal-actions">
            <button type="button" className="scheduleInterview-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="scheduleInterview-btn">
              Schedule Interview
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
