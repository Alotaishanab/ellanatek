import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css'; // Ensure you have this CSS file
import Lottie from 'lottie-react';
import checkAnimation from '../assets/animations/check.json';
import loadingAnimation from '../assets/animations/loading.json';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sendEmailData, setSendEmailData] = useState({
    clientIds: [], // Array to hold selected client IDs
    emails: '',    // String of manual emails separated by commas
    subject: '',
    customMessage: '',
    isProposal: false,    // Indicates if the email is a proposal
    isClientEmail: false, // Indicates if the email should use the client template
  });
  const [sendEmailStatus, setSendEmailStatus] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [filters, setFilters] = useState({
    inquiryType: '',
    businessName: '',
  });

  // Fetch contacts on component mount and when filters change
  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, [filters]);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams();

      if (filters.inquiryType) {
        queryParams.append('inquiryType', filters.inquiryType);
      }

      if (filters.businessName) {
        queryParams.append('businessName', filters.businessName);
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contacts?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data); // Set contacts directly if backend returns an array
      } else {
        if (response.status === 401 || response.status === 403) {
          alert('Session expired. Please log in again.');
          handleLogout();
        } else {
          alert('Failed to fetch contacts.');
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching contacts:', error);
      alert('An error occurred while fetching contacts.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const handleCheckboxChange = (e, clientId) => {
    const { checked } = e.target;
    if (checked) {
      setSendEmailData(prevState => ({
        ...prevState,
        clientIds: [...prevState.clientIds, clientId],
      }));
    } else {
      setSendEmailData(prevState => ({
        ...prevState,
        clientIds: prevState.clientIds.filter(id => id !== clientId),
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSendEmailData({ ...sendEmailData, [name]: value });
  };

  // Modified handler for the proposal checkbox:
  // When "Is Proposal" is checked, automatically uncheck "Is Client Email".
  const handleProposalCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSendEmailData(prevState => ({
      ...prevState,
      isProposal: checked,
      isClientEmail: checked ? false : prevState.isClientEmail, // Uncheck client email if proposal is selected
    }));
  };

  // Modified handler for the client email checkbox:
  // When "Is Client Email" is checked, automatically uncheck "Is Proposal".
  const handleClientEmailCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSendEmailData(prevState => ({
      ...prevState,
      isClientEmail: checked,
      isProposal: checked ? false : prevState.isProposal, // Uncheck proposal if client email is selected
    }));
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    const { clientIds, emails, subject, customMessage, isProposal, isClientEmail } = sendEmailData;

    // At least one recipient is required
    if ((clientIds.length === 0) && (!emails || emails.trim() === '')) {
      alert('Please select at least one client or enter at least one email address.');
      return;
    }

    // Prepare manual emails array
    let manualEmails = [];
    if (emails && emails.trim() !== '') {
      manualEmails = emails.split(',').map(email => email.trim()).filter(email => email !== '');
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const invalidEmails = manualEmails.filter(email => !emailRegex.test(email));
      if (invalidEmails.length > 0) {
        alert(`Invalid email addresses: ${invalidEmails.join(', ')}`);
        return;
      }
    }

    try {
      setIsSending(true);
      setSendEmailStatus('');

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clientIds, emails: manualEmails, subject, customMessage, isProposal, isClientEmail }),
      });

      if (response.ok) {
        setSendEmailStatus('Emails sent successfully!');
        // Reset the form and checkboxes
        setSendEmailData({ clientIds: [], emails: '', subject: '', customMessage: '', isProposal: false, isClientEmail: false });
        fetchContacts(); // Refresh contacts
        setTimeout(() => setSendEmailStatus(''), 3000);
      } else {
        if (response.status === 401 || response.status === 403) {
          alert('Session expired. Please log in again.');
          handleLogout();
        } else {
          const errorText = await response.text();
          alert(errorText || 'Failed to send emails.');
        }
      }
      setIsSending(false);
    } catch (error) {
      setIsSending(false);
      console.error('Error sending emails:', error);
      alert('An error occurred while sending the emails.');
    }
  };

  const handleUnsubscribe = async (clientId) => {
    if (!window.confirm('Are you sure you want to unsubscribe this client from emails?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clientId }),
      });

      if (response.ok) {
        alert('Client unsubscribed successfully.');
        fetchContacts(); // Refresh contacts
      } else {
        if (response.status === 401 || response.status === 403) {
          alert('Session expired. Please log in again.');
          handleLogout();
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to unsubscribe client.');
        }
      }
    } catch (error) {
      console.error('Error unsubscribing client:', error);
      alert('An error occurred while unsubscribing the client.');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const resetFilters = () => {
    setFilters({ inquiryType: '', businessName: '' });
  };

  return (
    <div className="admin-dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <section className="contacts-section">
          <h2>Client Contacts</h2>

          {/* Filter Section */}
          <div className="filter-section">
            <label>
              Inquiry Type:
              <select name="inquiryType" value={filters.inquiryType} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="general">General Inquiry</option>
                <option value="ad">Ad Inquiry</option>
              </select>
            </label>

            <label>
              Business Name:
              <input
                type="text"
                name="businessName"
                value={filters.businessName}
                onChange={handleFilterChange}
                placeholder="Search by Business Name"
              />
            </label>

            <button onClick={resetFilters} className="reset-filters-button">
              Reset Filters
            </button>
          </div>

          {isLoading ? (
            <div className="loading-animation">
              <Lottie animationData={loadingAnimation} loop={true} style={{ width: 150, height: 150 }} />
              <p>Loading contacts...</p>
            </div>
          ) : (
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Business</th>
                  <th>Inquiry</th>
                  <th>Message</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <tr key={contact.id} className={sendEmailData.clientIds.includes(contact.id) ? 'selected-row' : ''}>
                      <td>
                        <input
                          type="checkbox"
                          checked={sendEmailData.clientIds.includes(contact.id)}
                          onChange={(e) => handleCheckboxChange(e, contact.id)}
                        />
                      </td>
                      <td>{contact.id}</td>
                      <td>{contact.firstName}</td>
                      <td>{contact.lastName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phoneNumber}</td>
                      <td>{contact.businessName}</td>
                      <td>{contact.inquiryType === 'general' ? 'General Inquiry' : 'Ad Inquiry'}</td>
                      <td>{contact.message}</td>
                      <td>
                        <button
                          onClick={() => handleUnsubscribe(contact.id)}
                          className="unsubscribe-button"
                          disabled={contact.isUnsubscribed}
                        >
                          {contact.isUnsubscribed ? 'Unsubscribed' : 'Unsubscribe'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">No contacts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>

        <section className="send-email-section">
          <h2>Send Email</h2>
          <form onSubmit={handleSendEmail} className="send-email-form">
            {/* Instructional Message */}
            <div className="form-group">
              <p>Write email or select emails from the table above.</p>
            </div>

            {/* Proposal Checkbox */}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isProposal"
                  checked={sendEmailData.isProposal}
                  onChange={handleProposalCheckboxChange}
                />
                &nbsp; Is Proposal?
              </label>
            </div>

            {/* Client Email Checkbox */}
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isClientEmail"
                  checked={sendEmailData.isClientEmail}
                  onChange={handleClientEmailCheckboxChange}
                />
                &nbsp; Is Client Email?
              </label>
            </div>

            {/* Manual Email Entry */}
            <div className="form-group">
              <label>Enter Email Addresses (separated by commas)</label>
              <input
                type="text"
                name="emails"
                value={sendEmailData.emails}
                onChange={handleInputChange}
                placeholder="e.g., user1@example.com, user2@example.com"
              />
            </div>

            {/* Subject */}
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={sendEmailData.subject}
                onChange={handleInputChange}
                required
                placeholder="Enter Email Subject"
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="customMessage"
                value={sendEmailData.customMessage}
                onChange={handleInputChange}
                required
                placeholder="Enter your message"
                rows="5"
              />
            </div>

            {/* Send Email Button */}
            <button type="submit" className="send-email-button" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Email'}
            </button>
          </form>

          {/* Success Message */}
          {sendEmailStatus && (
            <div className="send-email-status">
              <Lottie animationData={checkAnimation} loop={false} style={{ width: 100, height: 100 }} />
              <p>{sendEmailStatus}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
