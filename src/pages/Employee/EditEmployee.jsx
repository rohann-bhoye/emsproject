/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './EditEmployee.css';
import EmployeeFooter from '../../components/EmployeeFooter';
import EmployeeNavBar from '../../components/EmployeeNavBar';

const EmployeeForm = ({ isAdmin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    age: '',
    currentAddress: '',
    permanentAddress: '',
    city: '',
    pinCode: '',
    mobile: '',
    personalEmail: '',
    companyEmail: '',
    emergencyContactName: '',
    emergencyContactMobile: '',
    employmentCode: '', // New Field
    officePhone: '',
    officeAddress: '',
    officePinCode: '',
    reportingManager: '',
    hrName: '',
    previousCompany: '',
    previousJoinDate: '',
    previousEndDate: '',
    panCard: '',
    aadharCard: '',
    bankAccountNumber: '',
    bankName: '',
    branchName: '',
    ifscCode: '',
    ctcBreakup: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const mobilePattern = /^[0-9]{10}$/;
    const pinCodePattern = /^[0-9]{6}$/;
    const employmentCodePattern = /^[0-9]{6}$/;
    const officePhonePattern = /^[0-9]{8,12}$/;

    if (!mobilePattern.test(formData.mobile)) {
      alert('Mobile number must be 10 digits.');
      return false;
    }
    if (!pinCodePattern.test(formData.pinCode) || !pinCodePattern.test(formData.officePinCode)) {
      alert('Pin code must be 6 digits.');
      return false;
    }
    if (!employmentCodePattern.test(formData.employmentCode)) {
      alert('Employment code must be 6 digits.');
      return false;
    }
    if (!officePhonePattern.test(formData.officePhone)) {
      alert('Office phone must be between 8 and 12 digits.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted', formData);
      // Here you can add your API call to save the employee data
    }
  };

  return (
    <>
      <EmployeeNavBar />
      <Form onSubmit={handleSubmit}>
        <h2>Personal Details</h2>

        {/* Personal Details Section */}
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
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Date of Birth</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              readOnly={!isAdmin}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Gender</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              readOnly={!isAdmin}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Col>
        </Form.Group>

        {/* New Registration Fields */}
        <h2>Registration Details</h2>

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
          </Col>
        </Form.Group>

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
          </Col>
        </Form.Group>

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
          </Col>
        </Form.Group>

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
          </Col>
        </Form.Group>

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
          </Col>
        </Form.Group>

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
          </Col>
        </Form.Group>

        <h2>Professional Details</h2>

        {/* Professional Details Section */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Employment Code</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="employmentCode"
              value={formData.employmentCode}
              onChange={handleChange}
              required
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Company Email</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              required
             
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Office Phone</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="officePhone"
              value={formData.officePhone}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Office Address</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Office Pin Code</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="officePinCode"
              value={formData.officePinCode}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Reporting Manager</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="reportingManager"
              value={formData.reportingManager}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>HR Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="hrName"
              value={formData.hrName}
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Previous Company</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="previousCompany"
              value={formData.previousCompany}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Joining Date</Form.Label>
          <Col sm={5}>
            <Form.Control
              type="date"
              name="previousJoinDate"
              value={formData.previousJoinDate}
              onChange={handleChange}
              readOnly
            />
          </Col>
          <Form.Label column sm={2}>End Date</Form.Label>
          <Col sm={5}>
            <Form.Control
              type="date"
              name="previousEndDate"
              value={formData.previousEndDate}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
      <EmployeeFooter />
    </>
  );
};

export default EmployeeForm;
