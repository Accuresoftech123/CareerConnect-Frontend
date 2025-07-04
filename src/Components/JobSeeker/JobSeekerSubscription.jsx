import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Image imports
import Notification from "../../Images/Notification.svg";
import user from "../../Images/user.svg";
import RightMark from "../../Images/RightMark.svg";
import mostPopular from "../../Images/mostPopular.svg";
import checkicon from "../../Images/checkicon.svg";
import facebook from "../../Images/facebook.svg";
import instagram from "../../Images/instagram.svg";
import linkedin from "../../Images/linkedin.svg";
import x from "../../Images/x.svg";

// CSS
import "../../Styles/JobSeeker/JobSeekerSubscription.css";

const JobSeekerSubscription = () => {
  const navigate = useNavigate();
  const [isMonthly, setIsMonthly] = useState(true);

  
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  
  const handleSubmit = () => {
    navigate("/JobSeeker-Create-Profile");
  };

 const handlePayment = async (amount) => {
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:9191/payment/create-order?amount=${amount}`, {
      method: "POST"
    });

    const orderData = await response.json(); // ✅ properly parse JSON here
    const orderId = orderData.id;

    const options = {
      key: "rzp_test_jML5Wc4X8t5FHP",
      amount: amount * 100,
      currency: "INR",
      name: "Career Connect",
      description: "Subscription Payment",
      order_id: orderId,
      handler: function (response) {
        alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
       
        // 👉 Automatically call /confirm-payment backend API here
        fetch("http://localhost:9191/payment/confirm-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: 5, // replace this with logged-in JobSeeker’s id dynamically
           
            amount: amount
          })
        })
          .then(res => res.text())
          .then(result => {
            console.log("✅ Receipt send to registered email:", result);
            // Now navigate to profile page
            navigate("/JobSeeker-Create-Profile");
          })
          .catch(err => {
            console.error("❌ Error calling confirm-payment:", err);
            // Optionally navigate back to subscription page on failure
            navigate("/JobSeeker-Subscription");
          });
      

      },
      modal: {
        ondismiss: function () {
          alert("❌ Payment was cancelled.");
          navigate("/JobSeeker-Subscription");
        }
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment failed", error);
    navigate("/JobSeeker-Subscription");
  }
};


  const starterFeatures = [
    "Upload your CV",
    "Apply to unlimited jobs",
    "Create and update profile any time",
    "Email update for job matches",
  ];

  const proFeatures = [
    "Upload your CV",
    "Apply to unlimited jobs",
    "Create and update profile any time",
    "Email update for job matches",
    "Guaranteed interview calls with verified recruiters",
    "SWORT Analysis report from industry expert",
    "Priority application placement",
    "Career Connect badge on your profile",
  ];

  const eliteFeatures = [
    "Upload your CV",
    "Apply to unlimited jobs",
    "Create and update profile any time",
    "Email update for job matches",
    "Guaranteed interview calls with verified recruiters",
    "SWORT Analysis report from industry expert",
    "Priority application placement",
    "Career Connect badge on your profile",
  ];

  const renderFeatures = (features) =>
    features.map((feature, index) => (
      <li key={index}>
        <img src={RightMark} alt="RightMark" className="js_subscription_PlanCard-RightMark" />
        {feature}
      </li>
    ));

  return (
    <div className="js_subscription_container">
      {/* Header */}
      <header className="js_subscription_header">
        <div className="js_subscription_logo">
          <span>Career</span> Connect
        </div>
        <nav className="js_subscription_nav">
          <Link to="/jobs">Jobs</Link>
          <Link to="/companies">Companies</Link>
          <Link>
            <img src={Notification} alt="Notification" className="js_subscription_navbar-nav-icon" />
          </Link>
          <Link>
            <img src={user} alt="user" className="js_subscription_navbar-nav-icon" />
          </Link>
        </nav>
      </header>

      {/* Middle Section */}
      <section className="js_subscription_middle-section">
        <h1>
          Get More Than Just Job Listings <br /> with <span>Career Connect</span>
        </h1>
        <p>
          Whether you're just starting out or ready to level up, choose a plan that helps you reach your job goals faster.
        </p>
      </section>

      {/* Toggle Buttons */}
      <section className="js_subscription_plan-toggle">
        <h2>Choose your plan</h2>
        <div className="js_subscription_toggle-buttons">
          <button
            className={isMonthly ? "js_subscription_active" : ""}
            onClick={() => setIsMonthly(true)}
          >
            Monthly
          </button>
          <button
            className={!isMonthly ? "js_subscription_active" : ""}
            onClick={() => setIsMonthly(false)}
          >
            Yearly
          </button>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="js_subscription_pricing-cards">
        {/* Starter */}
        <div className="js_subscription_pricing-card starter">
          <div className="js_subscription_plan-header">
            <p className="js_subscription_plan-name">Starter Plan</p>
            <p className="js_subscription_plan-price">Free</p>
          </div>
          <div className="js_subscription_features-list">
            <p className="js_subscription_features-title">Features includes:</p>
            <ul>{renderFeatures(starterFeatures)}</ul>
          </div>
          <button onClick={handleSubmit} className="js_subscription_continue-button starter-btn">
            Continue with Free plan
          </button>
        </div>

        {/* Pro */}
        <div className="js_subscription_pricing-card pro most-popular">
          <img src={mostPopular} alt="Most Popular" className="js_subscription_most-popular-tag" />
          <div className="js_subscription_plan-header">
            <p className="js_subscription_plan-name">Pro Plan</p>
            <p className="js_subscription_plan-price">
              ₹ {isMonthly ? "999" : "9999"}/-
            </p>
          </div>
          <div className="js_subscription_features-list">
            <p className="js_subscription_features-title">Features includes:</p>
            <ul>{renderFeatures(proFeatures)}</ul>
          </div>
          <button onClick={() => handlePayment(isMonthly ? 999 : 9999)} className="js_subscription_continue-button pro-btn">
            Continue with Pro plan
          </button>
        </div>

        {/* Elite */}
        <div className="js_subscription_pricing-card elite">
          <div className="js_subscription_plan-header">
            <p className="js_subscription_plan-name">Elite Plan</p>
            <p className="js_subscription_plan-price">
              ₹ {isMonthly ? "4999" : "24999"}/-
            </p>
          </div>
          <div className="js_subscription_features-list">
            <p className="js_subscription_features-title">Features includes:</p>
            <ul>{renderFeatures(eliteFeatures)}</ul>
          </div>
          <button onClick={()=>handlePayment(isMonthly?4999 : 24999)} className="js_subscription_continue-button elite-btn">
            Continue with Elite plan
          </button>
        </div>
      </section>

      {/* Compare Table */}
      <section className="js_subscription_compare-plans-section">
        <h2 className="js_subscription_compare-plans-section-title">Compare All Plans</h2>
        <table className="js_subscription_compare-table">
          <thead className="js_subscription_compare-table-head">
            <tr>
              <th>Features</th>
              <th>Starter</th>
              <th>Pro</th>
              <th>Elite</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Upload your CV", true, true, true],
              ["Apply to unlimited jobs", "unlimited", "unlimited", "unlimited"],
              ["Create and update profile any time", true, true, true],
              ["Email update for job matches", true, true, true],
              ["Guaranteed interview calls with verified recruiters", false, true, true],
              ["Priority application placement", false, true, true],
              ["Career Connect badge on your profile", false, true, true],
              ["SWORT Analysis report from industry expert", false, false, true],
            ].map(([feature, starter, pro, elite], idx) => (
              <tr key={idx}>
                <td>{feature}</td>
                <td>
                  {starter === true && <img src={checkicon} alt="check" className="js_subscription_PlanCard-check-icon" />}
                  {starter === "unlimited" && <span>Unlimited</span>}
                  {starter === false && "—"}
                </td>
                <td>
                  {pro === true && <img src={checkicon} alt="check" className="js_subscription_PlanCard-check-icon" />}
                  {pro === "unlimited" && <span>Unlimited</span>}
                  {pro === false && "—"}
                </td>
                <td>
                  {elite === true && <img src={checkicon} alt="check" className="js_subscription_PlanCard-check-icon" />}
                  {elite === "unlimited" && <span>Unlimited</span>}
                  {elite === false && "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <footer className="js_subscription_footer">
        <div className="js_subscription_footer-grid">
          <div>
            <h6 className="js_subscription_logo">
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
            <div className="js_subscription_social-icons">
              {[facebook, instagram, linkedin, x].map((icon, idx) => (
                <span key={idx}>
                  <img src={icon} alt="social" />
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="js_subscription_footer-note">
          @2025 AccureSofTech. All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default JobSeekerSubscription;
