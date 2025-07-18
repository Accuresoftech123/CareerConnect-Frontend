// Admin-Dashboard
import React ,{ useState }from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../../../Styles/Admin/Dashcomponents/AdminDashboard.css";
import newJobPosted from "../../../Images/newJobPosted.svg";
import newCandidate from "../../../Images/newCandidate.svg";
import newCompanies from "../../../Images/newCompanies.svg";
import indianRupee from "../../../Images/indianRupee.svg";
import activeUser from "../../../Images/activeUser.svg";
import Candidates from "../../../Images/Candidates.svg";
import newRecruiter from "../../../Images/newRecruiter.svg";
import activeUsersSection from "../../../Images/activeUsersSection.svg";
 
const AdminDashboard = () => {
  // Stats data
  const stats = {
    newJobPosted: 45,
    newCandidates: 175,
    newCompanies: 15,
    totalSubscriptions: 7054,
    totalActiveUsers: 8796
  };
 
  // New Recruiters data
  const newRecruiters = [
    { companyName: 'Proven Solutions Pvt. Ltd', location: 'Pune', subscription: 'Platinum', time: '2 hours ago' },
    { companyName: 'Senator Technologies', location: 'Bangalore', subscription: 'Golden', time: '5 hours ago' },
    { companyName: 'Quantum Solutions', location: 'Bangalore', subscription: 'Free', time: '14 hours ago' },
    { companyName: 'Systems Tech Pvt Ltd', location: 'Gurugram', subscription: 'Golden', time: '16 hours ago' },
    { companyName: 'Itechno Solutions', location: 'Bangalore', subscription: 'Platinum', time: '01 day ago' }
  ];
 
  // New Candidates data
  const newCandidates = [
    { name: 'Asmita Rai', jobTitle: 'Java Developer', subscription: 'Platinum', time: '2 hours ago' },
    { name: 'Vaishnavi Singh', jobTitle: 'Senior HR', subscription: 'Golden', time: '5 hours ago' },
    { name: 'Shree Pione', jobTitle: 'Full-stack developer', subscription: 'Free', time: '14 hours ago' },
    { name: 'Amar Taneja', jobTitle: 'UIUX Designer', subscription: 'Golden', time: '16 hours ago' },
    { name: 'Rajat Tiwari', jobTitle: 'Business Developer', subscription: 'Platinum', time: '01 day ago' }
  ];
 
  // Active Users data with action icons
    const [selectedFilter, setSelectedFilter] = useState('Last 7 days');
  const [isOpen, setIsOpen] = useState(false);
 
  const filterOptions = [
    'Last 24 hours',
    'Last 7 days',
    'Last 14 days',
    'Last 30 days',
    'Last 90 days',
    'Last 12 months',
    'Custom range'
  ];
 
 
  const activeUsers = [
    {
      name: 'Vnay Pawar',
      userType: 'Candidate',
      jobTitle: 'Full-stack Developer',
      status: 'Active',
      action: (
        <div className="AdminDashboard-action-icons">
          <VisibilityIcon className="AdminDashboard-action-icon" />
          <MessageIcon className="AdminDashboard-action-icon" />
          <MoreVertIcon className="AdminDashboard-action-icon" />
        </div>
      )
    },
    {
      name: 'Itechno Solutions',
      userType: 'Recruiter',
      jobTitle: 'IMD engineer',
      status: 'Active',
      action: (
        <div className="AdminDashboard-action-icons">
          <VisibilityIcon className="AdminDashboard-action-icon" />
          <MessageIcon className="AdminDashboard-action-icon" />
          <MoreVertIcon className="AdminDashboard-action-icon" />
        </div>
      )
    },
    {
      name: 'Technofast Solutions',
      userType: 'Recruiter',
      jobTitle: 'UIUX Designer',
      status: 'Active',
      action: (
        <div className="AdminDashboard-action-icons">
          <VisibilityIcon className="AdminDashboard-action-icon" />
          <MessageIcon className="AdminDashboard-action-icon" />
          <MoreVertIcon className="AdminDashboard-action-icon" />
        </div>
      )
    },
    {
      name: 'Mayur Shinde',
      userType: 'Candidate',
      jobTitle: 'Senior HR Executive',
      status: 'Active',
      action: (
        <div className="AdminDashboard-action-icons">
          <VisibilityIcon className="AdminDashboard-action-icon" />
          <MessageIcon className="AdminDashboard-action-icon" />
          <MoreVertIcon className="AdminDashboard-action-icon" />
        </div>
      )
    },
    {
      name: 'Vaishali Gupta',
      userType: 'Candidate',
      jobTitle: 'Java Developer',
      status: 'Active',
      action: (
        <div className="AdminDashboard-action-icons">
          <VisibilityIcon className="AdminDashboard-action-icon" />
          <MessageIcon className="AdminDashboard-action-icon" />
          <MoreVertIcon className="AdminDashboard-action-icon" />
        </div>
      )
    },
    {
      name: 'Shree Pione',
      userType: 'Candidate',
      jobTitle: 'Senior HR',
      status: 'Active',
      action: (
        <div className="AdminDashboard-action-icons">
          <VisibilityIcon className="AdminDashboard-action-icon" />
          <MessageIcon className="AdminDashboard-action-icon" />
          <MoreVertIcon className="AdminDashboard-action-icon" />
        </div>
      )
    }
  ];
 
  return (
    <div className="AdminDashboard-container">
      {/* Stats Cards */}
      <div className="AdminDashboard-summary-cards">
        <div className="AdminDashboard-card">
          <span class="AdminDashboard-summary-icon"><img src={newJobPosted} alt="New Job Posted" /></span>
          <h3>{stats.newJobPosted}</h3>
          <p>New Job Posted</p>
        </div>
        <div className="AdminDashboard-card">
          <span class="AdminDashboard-summary-icon"><img src={newCandidate} alt="New Candidates" /></span>          
          <h3>{stats.newCandidates}</h3>
          <p>New Candidates</p>
        </div>
        <div className="AdminDashboard-card">
          <span class="AdminDashboard-summary-icon"><img src={newCompanies} alt="New Companies" /></span>          
          <h3>{stats.newCompanies}</h3>
          <p>New Companies</p>
        </div>
        <div className="AdminDashboard-card">
          <span class="AdminDashboard-summary-icon"><img src={indianRupee} alt="Total Subscriptions" /></span>          
          <h3>{stats.totalSubscriptions}</h3>
          <p>Total Subscriptions</p>
        </div>
        <div className="AdminDashboard-card">
          <span class="AdminDashboard-summary-icon"><img src={activeUser} alt="Total active users" /></span>          
          <h3>{stats.totalActiveUsers}</h3>
          <p>Total active users</p>
        </div>
      </div>
 
      {/* New Recruiters Section */}
      <div className="AdminDashboard-dashboard-section-tables">
        <div className="AdminDashboard-dashboard-section">
          <span class="AdminDashboard-section-icon"><img src={newRecruiter} alt="New Job Posted" /></span>                    
          <h2>New Recruiters</h2>
          <span className="AdminDashboard-dashboard-section-viewAll">view all</span>
          <div className="AdminDashboard-recruiters-grid">
            <div className="AdminDashboard-grid-column">
              <h3>Company Name</h3>
              {newRecruiters.map((recruiter, index) => (
                <div key={index} className="AdminDashboard-grid-item">{recruiter.companyName}</div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Location</h3>
              {newRecruiters.map((recruiter, index) => (
                <div key={index} className="AdminDashboard-grid-item">{recruiter.location}</div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Subscription</h3>
              {newRecruiters.map((recruiter, index) => (
                <div key={index} className="AdminDashboard-grid-item">{recruiter.subscription}</div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Time</h3>
              {newRecruiters.map((recruiter, index) => (
                <div key={index} className="AdminDashboard-grid-item">{recruiter.time}</div>
              ))}
            </div>
          </div>
        </div>
 
        {/* New Candidates Section */}
        <div className="AdminDashboard-dashboard-section">
          <span class="AdminDashboard-section-icon"><img src={Candidates} alt="New Candidates" /></span>                    
          <h2>New Candidates</h2><span className="AdminDashboard-dashboard-section-viewAll">view all</span>
 
          <div className="AdminDashboard-candidates-grid">
            <div className="AdminDashboard-grid-column">
              <h3>Candidate Name</h3>
              {newCandidates.map((candidate, index) => (
                <div key={index} className="AdminDashboard-grid-item">{candidate.name}</div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Job Title</h3>
              {newCandidates.map((candidate, index) => (
                <div key={index} className="AdminDashboard-grid-item">{candidate.jobTitle}</div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Subscription</h3>
              {newCandidates.map((candidate, index) => (
                <div key={index} className="AdminDashboard-grid-item">{candidate.subscription}</div>
              ))}
            </div>
            <div className="AdminDashboard-grid-column">
              <h3>Time</h3>
              {newCandidates.map((candidate, index) => (
                <div key={index} className="AdminDashboard-grid-item">{candidate.time}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
 
      {/* Active Users Section */}
      <div className="AdminDashboard-dashboard-section-user">
          <span class="AdminDashboard-section-icon"><img src={activeUsersSection} alt="Active Users" /></span>                    
 
        <h2>Active users</h2>
 
 
        {/* Days Filter */}
      <div className="AdminDashboard-days-filter-container">
      <div
        className="AdminDashboard-days-filter-selected"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedFilter}
        <span className={`dropdown-icon ${isOpen ? 'open' : ''}`}>▾</span>
      </div>
     
      {isOpen && (
        <div className="AdminDashboard-days-filter-options">
          {filterOptions.map(option => (
            <div
              key={option}
              className={`filter-option ${selectedFilter === option ? 'selected' : ''}`}
              onClick={() => {
                setSelectedFilter(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
 
 
        <table className="AdminDashboard-active-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>User type</th>
              <th>Job Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.userType}</td>
                <td>{user.jobTitle}</td>
                <td>{user.status}</td>
                <td>{user.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
 
export default AdminDashboard;