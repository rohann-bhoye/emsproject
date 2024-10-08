
import React, { useState } from 'react';
import './HelpSupport.css'; 
import EmployeeNavBar from '../components/EmployeeNavBar';
import EmployeeFooter from '../components/EmployeeFooter';

const HelpSupport = () => {
  const [faqVisible, setFaqVisible] = useState(false);
  const [contactForm, setContactForm] = useState({
    
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false); // For form submission status

  const toggleFaq = () => {
    setFaqVisible(!faqVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setContactForm({
      name: '',
      email: '',
      message: '',
    });
    // You can integrate an API or backend service here to handle the form submission
  };

  return (
    <>
    <EmployeeNavBar/>
    <div className="help-support">
      <h1>Help & Support</h1>
      
      <div className="faq-section">
        <h2 onClick={toggleFaq} style={{ cursor: 'pointer' }}>
          {faqVisible ? 'Hide FAQs' : 'Show FAQs'}
        </h2>
        {faqVisible && (
            <div className="faq-list">
            <ul>
              <li><strong>How do I apply for leave?</strong> - Go to the Attendance & Leave section, click 'Apply for Leave', fill the form, and submit.</li>
              <li><strong>How do I download my payslip?</strong> - Navigate to the Salary & Payslips section and click 'Download Payslip' for the month you want.</li>
              <li><strong>Can I edit my personal details?</strong> - Yes, you can update your details under the Personal Information section.</li>
              <li><strong>Who can I contact for salary-related queries?</strong> - Please fill out the form below to contact HR for any salary-related queries.</li>
            </ul>
          </div>
        )}
      </div>

      <div className="contact-hr-section">
        <h2>Contact HR</h2>
        {submitted ? (
            <p className="success-message">Your message has been sent successfully. HR will contact you soon.</p>
        ) : (
            <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactForm.name}
                onChange={handleInputChange}
                required
                />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactForm.email}
                onChange={handleInputChange}
                required
                />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={contactForm.message}
                onChange={handleInputChange}
                required
                ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        )}
      </div>
    </div>
    <EmployeeFooter/>
        </>
  );
};

export default HelpSupport;
