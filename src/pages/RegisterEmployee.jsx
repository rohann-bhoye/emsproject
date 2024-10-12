// src/pages/Employee/RegisterEmployee.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import AdminFooter from '../components/AdminFooter';
import './RegisterEmployee.css';
import AdminNavBar from '../components/AdminNavbar';

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    joiningDate: '',
    employeeID: '',
    password: '',
    role: '', // Role field added
    panCard: '',              // PAN Card
    aadharCard: '',           // Aadhar Card
    bankAccountNumber: '',    // Bank Account Number
    ifscCode: '',             // IFSC Code
    branchName: '',           // Branch Name
    bankName: '',             // Bank Name
    ctcBreakup: '',           // CTC Breakup
  });

  const [errors, setErrors] = useState({});
  const [nextEmployeeID, setNextEmployeeID] = useState(1); // Automatically incrementing Employee ID

  useEffect(() => {
    // Simulate fetching the latest employee ID from backend
    fetchNextEmployeeID();
  }, []);

  // Simulate fetching next Employee ID from the backend or database
  const fetchNextEmployeeID = () => {
    const lastEmployeeID = 5; // This would come from your backend/database
    setNextEmployeeID(lastEmployeeID + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const panCardPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharCardPattern = /^\d{12}$/;
    const ifscCodePattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining Date is required';
    if (!formData.panCard) newErrors.panCard = 'PAN Card is required';
    else if (!panCardPattern.test(formData.panCard)) newErrors.panCard = 'Invalid PAN Card format';
    if (!formData.aadharCard) newErrors.aadharCard = 'Aadhar Card is required';
    else if (!aadharCardPattern.test(formData.aadharCard)) newErrors.aadharCard = 'Aadhar Card must be 12 digits';
    if (!formData.bankAccountNumber) newErrors.bankAccountNumber = 'Bank Account Number is required';
    if (!formData.ifscCode) newErrors.ifscCode = 'IFSC Code is required';
    else if (!ifscCodePattern.test(formData.ifscCode)) newErrors.ifscCode = 'Invalid IFSC Code format';
    if (!formData.branchName) newErrors.branchName = 'Branch Name is required';
    if (!formData.bankName) newErrors.bankName = 'Bank Name is required';
    if (!formData.ctcBreakup) newErrors.ctcBreakup = 'CTC Breakup is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedFormData = {
        ...formData,
        employeeID: nextEmployeeID, // Set automatically generated employee ID
        password: generatePassword(), // Auto-generate a password
      };

      console.log('Employee Registered:', updatedFormData);
      sendEmailWithCredentials(updatedFormData); // Send email after registration

      // Reset the form and increment the next Employee ID
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        joiningDate: '',
        employeeID: '',
        password: '',
        role: '', // Reset role
        panCard: '',
        aadharCard: '',
        bankAccountNumber: '',
        ifscCode: '',
        branchName: '',        // Reset branch name
        bankName: '',          // Reset bank name
        ctcBreakup: '',        // Reset CTC breakup
      });
      setNextEmployeeID(nextEmployeeID + 1); // Increment the Employee ID for the next registration
    }
  };

  // Function to generate a random password
  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Function to send email with credentials (Simulated)
  const sendEmailWithCredentials = (employee) => {
    console.log(`Sending email to ${employee.email} with credentials:`);
    console.log(`Employee ID: ${employee.employeeID}`);
    console.log(`Password: ${employee.password}`);
    alert(`Email sent to ${employee.email} with credentials!`);
  };

  return (
    <>
      <AdminNavBar />
      <div className="register-employee">
        <h2>Register New Employee</h2>
        <Form onSubmit={handleSubmit}>
          {/* Full Name */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Full Name</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              {errors.fullName && <span className="error">{errors.fullName}</span>}
            </Col>
          </Form.Group>

          {/* Email */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Email</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </Col>
          </Form.Group>

          {/* Phone */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Phone</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </Col>
          </Form.Group>

          {/* Department Dropdown */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Department</Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Operations">Operations</option>
                {/* Add more departments as needed */}
              </Form.Control>
              {errors.department && <span className="error">{errors.department}</span>}
            </Col>
          </Form.Group>

          {/* Role Dropdown */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Role</Form.Label>
            <Col sm={10}>
              <Form.Control
                as="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Form.Control>
              {errors.role && <span className="error">{errors.role}</span>}
            </Col>
          </Form.Group>

          {/* Designation */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Designation</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
              {errors.designation && <span className="error">{errors.designation}</span>}
            </Col>
          </Form.Group>

          {/* Joining Date */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Joining Date</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />
              {errors.joiningDate && <span className="error">{errors.joiningDate}</span>}
            </Col>
          </Form.Group>

          {/* PAN Card */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>PAN Card</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="panCard"
                value={formData.panCard}
                onChange={handleChange}
                required
              />
              {errors.panCard && <span className="error">{errors.panCard}</span>}
            </Col>
          </Form.Group>

          {/* Aadhar Card */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Aadhar Card</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="aadharCard"
                value={formData.aadharCard}
                onChange={handleChange}
                required
              />
              {errors.aadharCard && <span className="error">{errors.aadharCard}</span>}
            </Col>
          </Form.Group>

          {/* Bank Account Number */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Bank Account Number</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="bankAccountNumber"
                value={formData.bankAccountNumber}
                onChange={handleChange}
                required
              />
              {errors.bankAccountNumber && <span className="error">{errors.bankAccountNumber}</span>}
            </Col>
          </Form.Group>

          {/* IFSC Code */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>IFSC Code</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                required
              />
              {errors.ifscCode && <span className="error">{errors.ifscCode}</span>}
            </Col>
          </Form.Group>

          {/* Branch Name */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Branch Name</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                required
              />
              {errors.branchName && <span className="error">{errors.branchName}</span>}
            </Col>
          </Form.Group>

          {/* Bank Name */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>Bank Name</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                required
              />
              {errors.bankName && <span className="error">{errors.bankName}</span>}
            </Col>
          </Form.Group>

          {/* CTC Breakup */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>CTC Breakup</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                name="ctcBreakup"
                value={formData.ctcBreakup}
                onChange={handleChange}
                required
              />
              {errors.ctcBreakup && <span className="error">{errors.ctcBreakup}</span>}
            </Col>
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit">Register Employee</Button>
        </Form>
      </div>
      <AdminFooter />
    </>
  );
};

export default RegisterEmployee;
