//import react from 'react';
import { useNavigate } from "react-router-dom";
import "../Styles/Registerstyle.css";
import register from "../Images/register.svg";
import PersonIcon from "@mui/icons-material/Person";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import SvgIcon from "@mui/icons-material/LocalPostOffice";

const Registration = () => {
  const navigate = useNavigate();
  const UserLogin = (e) => {
    navigate("/Login");
  };
  return (
    <div className="registerpage-container">
      {/*Header */}
      <header className="register-header">
        <div className="logo">
          <span>Career</span> Connect
        </div>
        <nav className="registernav-links">
          <a href="jobs">Jobs</a>
          <a href="companies">Companies</a>
          <button className="btn-primary" onClick={UserLogin}>
            Log In
          </button>
        </nav>
      </header>
      {/*Main Section */}
      <main className="register-section">
        <div className="register-content">
          <div className="register-text col-6">
            <h1>
              Welcome Back, to <span> Career Connect</span>
            </h1>
            <p>Your gateway to professional opportunities</p>
            <div className="illustration">
              <img src={register} alt="welcome Illustration" />
            </div>
          </div>
          {/*Form section */}
          <div className="register-fillUp col-6">
            <div>
              <h3>Register</h3>
              <p>Please enter your details</p>
              <div>
                <label className="m-1 row">Full Name</label>
                <div className="registerinput-container">
                  <SvgIcon component={PersonIcon} />
                  <input
                    type="name"
                    //   onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  ></input>
                </div>
              </div>
              <div>
                <label className="m-1 row">Email Id</label>
                <div className="registerinput-container">
                  <SvgIcon component={LocalPostOfficeIcon} />
                  <input
                    type="email"
                    //   onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your email id"
                    required
                  ></input>
                </div>
              </div>
              <div>
                <label className="m-1 row">Mobile Number</label>
                <div className="registerinput-container">
                  <SvgIcon component={PhoneIcon} />
                  <input
                    type="number"
                    //   onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter your mobile number"
                    required
                  ></input>
                </div>
              </div>
              <div>
                <label className="m-1 row">Create Password</label>
                <div className="registerinput-container">
                  <SvgIcon component={LockIcon} />
                  <input
                    type="Password"
                    //   onChange={(e) => setLPass(e.target.value)}
                    placeholder="Create a Password"
                    required
                  ></input>
                </div>
              </div>
              <div>
                <label className="m-1 row">Confirm Password</label>
                <div className="registerinput-container">
                  <SvgIcon component={LockIcon} />
                  <input
                    type="Password"
                    //   onChange={(e) => setLPass(e.target.value)}
                    placeholder="Confirm your Password"
                    required
                  ></input>
                </div>
              </div>
              {/* <div>
                <label className="m-1 row">I am a........</label>
                <div className="user-type">
                  <input
                    type="radio"
                    name="userType"
                    value="jobseeker"
                    checked={FormData.userType === "jobseeker"}
                    //   onChange={(e) => setLPass(e.target.value)}
                  ></input>
                  <label>Job Seeker</label>
                  <input
                    type="radio"
                    name="userType"
                    value="employeer"
                    checked={FormData.userType === "employer"}
                    //   onChange={(e) => setLPass(e.target.value)}
                  ></input>
                  <label>Employer</label>
                </div>
              </div> */}
              <div>
                <div>
                  <button
                    className="registerbtn-primary"
                    // onClick={loginUser}
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <div className="optionregister">
                  <p>
                    Already have an account?<a href="login"> Log In</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;
