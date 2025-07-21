import React, { useEffect, useState, useRef } from "react";
import "../../Styles/JobSeeker/EmailVerfication.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../axiosInstance"; // Import your axios instance

const JEmailVerificationPopup = ({ email, onVerify }) => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // State for 6-digit OTP
  const [timer, setTimer] = useState(30); // Countdown timer state
  const [resendDisabled, setResendDisabled] = useState(true); // To control resend button
  const [error, setError] = useState(""); // Validation error message
  const intervalRef = useRef(null); // For storing interval ID
  const inputRefs = useRef([]); // For managing focus between OTP inputs
  const navigate = useNavigate();

  //const url = "http://localhost:9191";

  // Start countdown when component mounts
  useEffect(() => {
    startCountdown();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Function to start 30-second resend countdown
  const startCountdown = () => {
    clearInterval(intervalRef.current);
    setResendDisabled(true);
    setTimer(30);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP input change and focus
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits

    if (value.length > 1) return; // Only one digit allowed in each box

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setError(""); // Clear error on valid input

    if (value && index < 5) {
      inputRefs.current[index + 1].focus(); // Move focus to next box
    }

    if (!value && index > 0 && e.nativeEvent.inputType === "deleteContentBackward") {
      inputRefs.current[index - 1].focus(); // Move focus back on backspace
    }
  };

  // Validate OTP and send to backend
  const verifyOtp = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6 || otp.some((digit) => digit === "")) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/jobseekers/verify-otp`,
        { email, otp: otpValue },
        { headers: { "Content-Type": "application/json" } }
      );

      // Store JWT token
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Decode token to get role info
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role[0].authority;
      console.log("Role from token:", role);

      const { success, message } = response.data;
      alert(message);

      if (success) {
        onVerify(otpValue); // Trigger callback to parent
        navigate("/JobSeeker-Subscription");
      }
    } catch (error) {
      alert(error.response?.data || "Verification failed");
    }
  };

  return (
    <div className="email-verification-popup">
      <div className="email-verification-container">
        <h3>Verify Your Email ID</h3>
        <p>
          We've sent a 6-digit OTP to <b>{email}</b>. Please enter the code below.
        </p>

        {/* OTP Input Fields */}
        <div className="email-verification-otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              maxLength="1"
              className={`email-verification-otp-input ${
                error && digit === "" ? "input-error" : ""
              }`}
            />
          ))}
        </div>

        {/* Error message */}
        {error && <p className="email-verification-error">{error}</p>}

        {/* Verify button */}
        <button
          onClick={verifyOtp}
          className="email-verification-verify-button"
          disabled={otp.join("").length !== 6}
        >
          Verify
        </button>

        {/* Resend OTP option */}
        <div className="email-verification-resend-otp">
          <span>Didn't receive the email?</span>
          <button onClick={startCountdown} disabled={resendDisabled}>
            Resend OTP {resendDisabled && `in ${timer}s`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JEmailVerificationPopup;
