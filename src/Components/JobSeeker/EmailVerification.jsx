import React, { useEffect, useState, useRef } from "react";
import "../../Styles/JobSeeker/EmailVerfication.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerificationPopup = ({ email, onVerify }) => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // OTP as 6 digits
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const intervalRef = useRef(null);
  const inputRefs = useRef([]); // Refs for input focus
  const navigate = useNavigate();

  // Start countdown on mount
  useEffect(() => {
    startCountdown();
    return () => clearInterval(intervalRef.current);
  }, []);

  // Start 30-second resend OTP countdown
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

  // Handle OTP input and auto-focus
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Move back on backspace
    if (!value && index > 0 && e.nativeEvent.inputType === "deleteContentBackward") {
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify OTP with server
  const verifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      try {
        const response = await axios.post(
          "http://localhost:9191/jobseekers/verifyOtp",
          { email, otp: otpValue },
          { headers: { "Content-Type": "application/json" } }
        );

        const { success, message } = response.data;
        alert(message);
        if (success) {
          onVerify(otpValue);
          navigate("/");
        }
      } catch (error) {
        alert(error.response?.data || "Verification failed");
      }
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <div className="email-verification-popup">
      <div className="email-verification-container">
        <h3>Verify Your Email ID</h3>
        <p>
          We've sent a 6-digit OTP to <b>{email}</b>. Please enter the code below.
        </p>

        <div className="email-verification-otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              maxLength="1"
              className="email-verification-otp-input"
            />
          ))}
        </div>

        <button
          onClick={verifyOtp}
          className="email-verification-verify-button"
          disabled={otp.join("").length !== 6}
        >
          Verify
        </button>

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

export default EmailVerificationPopup;
