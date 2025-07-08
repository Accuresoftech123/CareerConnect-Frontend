import React from "react";
import "../Styles/HomePagestyle.css";
import facebook from "../Images/facebook.svg";
import instagram from "../Images/instagram.svg";
import linkedin from "../Images/linkedin.svg";
import x from "../Images/x.svg";
import TCS from "../Images/TCS.svg";
import google from "../Images/google.svg";
import microsoft from "../Images/microsoft.svg";
import wipro from "../Images/wipro.svg";
import accenture from "../Images/accenture.svg";
import amazon from "../Images/amazon.svg";
import JobPortalHome from "../Images/JobPortalHome.webp";
import { Card, SvgIcon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { MapPin } from "lucide-react";
import Techno_home from "../Images/Techno_home.svg";
import Marketing_home from "../Images/Marketing_home.svg";
import Finance_home from "../Images/Finance_home.svg";
import HealthCare_home from "../Images/HealthCare_home.svg";

const HomePage = () => {
 
  return (
    <div className="Homepage_page-container">
      {/* Header */}
      <nav className="Homepage_header">
        <div className="Homepage_logo">
          <span>Career</span> Connect
        </div>
        <div className="Homepage_nav-links">
          <Link to="/" className="Homepage_nav-link Homepage_active">
            Home
          </Link>
          <Link to="/jobs" className="Homepage_nav-link">
            Jobs
          </Link>
          <Link to="/companies" className="Homepage_nav-link">
            Companies
          </Link>
          <Link to="/Login">
            <button className="Homepage_btn-outline">Job Seeker</button>
          </Link>
          <Link to="/EmployerLogin">
            <button className="Homepage_btn-primary">Employer</button>
          </Link>
        </div>
      </nav>

      {/* Middle Section */}
      <main className="Homepage_main-section">
        <div className="Homepage_main-content">
          <div className="Homepage_main-text">
            <h1 className="Homepage_logo">
              <span>Find Your</span> Dream Job <span>Faster</span>
            </h1>
            <p>
              Discover top opportunities from leading companies. Personalized
              job matches, easy applications, real-time updates —{" "}
              <span className="Homepage_span-logo">all in one place</span>
            </p>
          </div>

          <Card className="Homepage_search-bar">
            <div className="Homepage_searchinput-container">
              <SvgIcon component={SearchIcon} />
              <input
                type="text"
                name="search"
                placeholder="Job title, keywords or company"
                style={{ maxWidth: "700px" }}
              />
            </div>
            <div className="Homepage_searchinput-container">
              <SvgIcon component={MapPin} style={{ fill: "none" }} />
              <input
                type="text"
                placeholder="Location"
                style={{ maxWidth: "250px" }}
              />
            </div>
            <button className="Homepage_btn-primary">Explore Jobs</button>
          </Card>

          <div className="Homepage_main-image">
            <img src={JobPortalHome} alt="HandShake" />
          </div>
        </div>
      </main>

      {/* Companies Section */}
      <section className="Homepage_company-section">
        <h2>Top Companies hiring currently</h2>
        <div className="Homepage_company-list">
          <img src={google} alt="Google" />
          <img src={microsoft} alt="Microsoft" />
          <img src={wipro} alt="Wipro" />
          <img src={TCS} alt="TCS" />
          <img src={accenture} alt="Accenture" />
          <img src={amazon} alt="Amazon" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="Homepage_categories-section">
        <h2>Popular job categories</h2>
        <div className="Homepage_categories-grid">
          <div className="Homepage_category-card">
            <h1><img src={Techno_home} alt="Laptop image" style={{ width: "3rem", height: "3rem" }} /></h1>
            <h3>Technology & IT</h3>
            <p>1350 Jobs available</p>
          </div>
          <div className="Homepage_category-card">
            <h1><img src={HealthCare_home} alt="Healthcare image" style={{ width: "3rem", height: "3rem" }} /></h1>
            <h3>Healthcare</h3>
            <p>578 Jobs available</p>
          </div>
          <div className="Homepage_category-card">
            <h1><img src={Finance_home} alt="Finance graph image" style={{ width: "3rem", height: "3rem" }} /></h1>
            <h3>Finance & Banking</h3>
            <p>842 Jobs available</p>
          </div>
          <div className="Homepage_category-card">
            <h1><img src={Marketing_home} alt="Marketing image" style={{ width: "3rem", height: "3rem" }} /></h1>
            <h3>Marketing & Sales</h3>
            <p>573 Jobs available</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="Homepage_stats-section">
        <div>
          <p className="Homepage_stat-number">103K+</p>
          <p>Jobs available</p>
        </div>
        <div>
          <p className="Homepage_stat-number">50K+</p>
          <p>Companies</p>
        </div>
        <div>
          <p className="Homepage_stat-number">1M+</p>
          <p>Job seekers</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="Homepage_footer">
        <div className="Homepage_footer-grid">
          <div>
            <h6 className="Homepage_logo">
              <span>Career</span> Connect
            </h6>
            <p>Connecting talented professionals with amazing opportunities</p>
          </div>
          <div>
            <h4>For Job Seekers</h4>
            <ul>
              <li>Browse jobs</li>
              <li>Companies</li>
              <li>Career advice</li>
              <li>Premium</li>
            </ul>
          </div>
          <div>
            <h4>For Employers</h4>
            <ul>
              <li>Post a job</li>
              <li>Browse candidates</li>
              <li>Subscription plans</li>
              <li>Recruitment solutions</li>
            </ul>
          </div>
          <div>
            <h4>Follow Us on</h4>
            <div className="Homepage_social-icons">
              <span><img src={facebook} alt="Facebook" /></span>
              <span><img src={instagram} alt="Instagram" /></span>
              <span><img src={linkedin} alt="LinkedIn" /></span>
              <span><img src={x} alt="Twitter" /></span>
            </div>
          </div>
        </div>
        <p className="Homepage_footer-note">@2025 AccureSofTech. All rights reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
