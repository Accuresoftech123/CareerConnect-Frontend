//import react from 'react';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "../../Styles/Employer/EmployerRegisterstyle.css";
import EmployerRegisterImage from "../../Images/EmployerRegisterImage.svg"
import PersonIcon from "@mui/icons-material/Person";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import EmailVerificationPopup from "../EmailVerification";

const EmployerRegistration = () => {
  const navigate = useNavigate();
  // const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  // const [isVerified, setIsVerified] = useState(false);
    const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });
 
 const handleChange = (e) => {
  e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // setShowVerificationPopup(true);  // show popup
    // try {
    //   // await axios.post("http://localhost:9191/jobseekers/sendOtp", null, {
    //   //   params: { email: formData.email }
    //   // });
    //   await axios.post("http://localhost:9191/jobseekers/register", formData);
    // } catch (error) {
    //   alert("Error: " + (error.response?.data || error.message));
    // }
    navigate("/EmployerCreateProfile");
  };


    

  

// const handleOtpVerified = () => {
//     setShowVerificationPopup(false);
//     setIsVerified(true);
//     alert("Email Verified Successfully!");
//     navigate("/login");
//   };
//   const UserLogin = (e) => {
//     // navigate("/login");
//   };


 return (
    <div className="employer_registerpage-container">
      <header className="employer_register-header">
        <div className="employer_logo">
          <span>Career</span> Connect
        </div>
        <nav className="employer_registernav-links">
          <a href="Candidates">Candidates</a>
          <a href="companies">Companies</a>
          <button className="employer_btn-primary" onClick={() => navigate("/Login")}>Log In</button>
        </nav>
      </header>

      <main className="employer_register-section">
        <div className="employer_register-content">
          <div className="employer_register-text col-6">
            <h1>Welcome Back, to <span> Career Connect</span></h1>
            <p>Post jobs,review applications,and schedule interviews-all in one place</p>
            <div className="employer_illustration">
              <img src={EmployerRegisterImage} alt="welcome Illustration" />
            </div>
          </div>

          {/* Registration Form */}
          <div className="employer_register-fillUp col-6">
            <form onSubmit={handleSubmit}>
              <h3>Employer Register</h3>
              <p>Please enter your details</p>

              <label>Full Name</label>
              <div className="employer_registerinput-container">
                <SvgIcon component={PersonIcon} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <label>Email Id</label>
              <div className="employer_registerinput-container">
                <SvgIcon component={LocalPostOfficeIcon} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email id"
                  required
                />
              </div>

              <label>Mobile Number</label>
              <div className="employer_registerinput-container">
                <SvgIcon component={PhoneIcon} />
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                />
              </div>

              <label>Create Password</label>
              <div className="employer_registerinput-container">
                <SvgIcon component={LockIcon} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a Password"
                  required
                />
              </div>

              <label>Confirm Password</label>
              <div className="employer_registerinput-container">
                <SvgIcon component={LockIcon} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your Password"
                  required
                />
              </div>

              <button className="employer_registerbtn-primary" type="submit">Register</button>
            </form>
           {/* {showVerificationPopup && (
  <div className="employer_popup-backdrop">
    <EmailVerificationPopup 
      email={formData.email}  
      onVerify={handleOtpVerified}  // Correct function name
    />
  </div>
)} */}


            {/* {isVerified && <p style={{ color: "green" }}>Email Verified Successfully!</p>} */}
            <div className="employer_optionregister">
              <p>Already have an account? <a href="/login">Log In</a></p>
            </div>
          </div>
        </div>
      </main>
     
    </div>
  );
};

export default EmployerRegistration;
