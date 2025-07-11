// Admin Login

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import "../../Styles/Admin/AdminLogin.css"


import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import SvgIcon from "@mui/icons-material/LocalPostOffice";
import axios from "axios";


 const AdminLogin = () => {


      const navigate = useNavigate();


   
  // Navigate to Registration page
  const goToAdminHome = () => {
    navigate("/AdminHome");
  };


  // Handle login form submission

  const handleSubmit = async(e) => {

    e.preventDefault();
     navigate("/AdminHome");
    // Basic validation
    // if (!email || !password) {
    //   alert("Please fill in all fields");
    //   return;
    // }

  }
    return (
        <>

            <div className="AdminLogin_page-container">
                {/* Header */}
                <nav className="AdminLogin_header">
                    <div className="AdminLogin_logo">
                        <span>Career</span> Connect
                    </div>
                    <div className="AdminLogin_nav-links">
                        <Link to="/" className="AdminLogin_nav-link">
                            Home
                        </Link>
                        <Link to="/jobs" className="AdminLogin_nav-link">
                            Jobs
                        </Link>
                        <Link to="/companies" className="AdminLogin_nav-link">
                            Companies
                        </Link>
                        <Link to="/Login">
                            <button className="AdminLogin_btn-outline">Job Seeker</button>
                        </Link>
                        <Link to="/EmployerLogin">
                            <button className="AdminLogin_btn-outline">Employer</button>
                        </Link>
                    </div>
                </nav>

                {/* Login Form */}

                
                <div className="AdminLogin_login-fillUp">
                    <div className="AdminLogin-loginBox">
                        <h3>Log In</h3>
                        <p>Please enter your details</p>

                        <div>
                            <label className="AdminLogin_label">Email Id:</label>
                            <div className="AdminLogin_Logininput-container">
                                <SvgIcon component={LocalPostOfficeIcon} />
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="AdminLogin_label">Password:</label>
                            <div className="AdminLogin_Logininput-container">
                                <SvgIcon component={LockIcon} />
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            className="AdminLogin_loginbtn-primary"
                            onClick={handleSubmit}
                            type="submit"
                        >
                            Log in
                        </button>
                    </div>
                </div>



            </div>
        </>

    )

 };


export default AdminLogin;