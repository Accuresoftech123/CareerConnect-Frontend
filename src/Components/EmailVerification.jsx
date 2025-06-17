import React, { useEffect, useState, useRef } from "react";
import "../Styles/EmailVerfication.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';

const EmailVerificationPopup = ({ email, onVerify }) => { // Email coming dynamically from parent
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const intervalRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    startCountdown();
    return () => clearInterval(intervalRef.current);
  }, []);

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

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

 const verifyOtp = async () => {
  const otpValue = otp.join('');

  if (otpValue.length === 6) {
    try {
      const response = await axios.post("http://localhost:9191/jobseekers/verifyOtp", {
        email: email,
        otp: otpValue
      }, {
        headers: { "Content-Type": "application/json" }
      });

      // const serverMessage = response.data.trim(); // Trim to avoid whitespace issues

      if (response.data.success) {
   alert(response.data.message);
   onVerify(otpValue);
   navigate("/");
} else {
   alert(response.data.message);
}



    } catch (error) {
      alert(error.response ? error.response.data : "Verification failed");
    }
  } else {
    alert("Please enter a valid 6-digit OTP.");
  }
};



  return (
    <div className="email-verification-popup">
      <div className="popup-container">
        <h3>Verify your Email ID</h3>
        <p>
          We've sent a 6-digit OTP to <b>{email}</b>. Please enter the code below to verify.
        </p>
        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              maxLength="1"
              className="otp-input"
            />
          ))}
        </div>
        <button
          onClick={verifyOtp}
          className="verify-button"
          disabled={otp.join('').length !== 6}
        >
          Verify
        </button>

        <div className="resend-otp">
          <span>Didn't receive the email?</span>
          <button onClick={startCountdown} disabled={resendDisabled}>
            Resend OTP {resendDisabled && `Available in ${timer}s`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPopup;
