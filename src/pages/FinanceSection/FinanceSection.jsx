import React, { useEffect, useState } from "react";
import jsPDF from "jspdf"; 
import "jspdf-autotable"; 
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import "./FinanceSection.css";
import EmployeeNavBar from "../../components/EmployeeNavBar";
import EmployeeFooter from "../../components/EmployeeFooter";


const FinanceSection = ({ onEditClick }) => {
  const [financeDetails, setFinanceDetails] = useState(null); // State for finance details
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Fetch finance details from your API
    const fetchFinanceDetails = async () => {
      try {
        const response = await fetch('YOUR_API_URL'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFinanceDetails(data); // Set the fetched data
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchFinanceDetails();
  }, []);

  const handleDownloadPayslip = () => {
    // Validate that either a duration or a date range is selected
    if (!duration && (!startDate || !endDate)) {
      alert("Please select either a duration or a date range.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Rohan Company", 20, 10);
    doc.setFontSize(12);
    doc.text("Company Address, City, State, ZIP", 20, 15);
    doc.text("Phone: 9488452565 | Email: reko@company.com", 20, 20);
    doc.text("Date of Issue: " + new Date().toLocaleDateString(), 20, 25);
    
    // Add Employee Information
    doc.text("Employee Payslip", 20, 35);
    if (financeDetails) {
      doc.text(`Name: ${financeDetails.employeeName}`, 20, 45);
      doc.text(`Employee ID: ${financeDetails.employeeID}`, 20, 50);
      doc.text(`Department: ${financeDetails.department}`, 20, 55);
      doc.text(`Designation: ${financeDetails.designation}`, 20, 60);
      doc.text(`Date of Joining: ${financeDetails.dateOfJoining}`, 20, 65);
    }

    let payPeriod;
    if (startDate && endDate) {
      payPeriod = `Pay Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    } else {
      payPeriod = `Pay Period: Last ${duration} Months`;
    }
    doc.text(payPeriod, 20, 75);
    doc.text("Pay Date: August 1, 2023", 20, 80);

    const earningsData = [
      ["Basic Salary", "₹40,000"],
      ["House Rent Allowance", "₹10,000"],
      ["Conveyance Allowance", "₹2,500"],
      ["Medical Allowance", "₹1,500"],
      ["Special Allowance", "₹5,000"],
      ["Total Earnings", "₹59,000"]
    ];

    doc.autoTable({
      startY: 90,
      head: [["Earnings", "Amount"]],
      body: earningsData,
    });

    const deductionsData = [
      ["Provident Fund", "₹1,800"],
      ["Professional Tax", "₹500"],
      ["Income Tax", "₹2,500"],
      ["Total Deductions", "₹4,800"]
    ];

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Deductions", "Amount"]],
      body: deductionsData,
    });

    doc.setFontSize(11);
    doc.text("Net Salary: ₹54,200 (Fifty-four thousand two hundred rupees only)", 20, doc.lastAutoTable.finalY + 10);
    doc.text("Authorized Signature: P-17 EMS", 20, doc.lastAutoTable.finalY + 30);
    doc.text('Confidentiality Notice: "This payslip is confidential and intended solely for the recipient."', 20, doc.lastAutoTable.finalY + 40);
    
    doc.save("Payslip.pdf");
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
    if (e.target.value) {
      setStartDate(null);
      setEndDate(null);
    }
  };

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state

  return (
    <>
      <EmployeeNavBar />
      <div className="finance-section">
        <h3 className="finance-title">Finance Details</h3>
        <div className="finance-details">
          <div className="finance-detail">
            <strong>PAN Card:</strong> <span>{financeDetails.panCard}</span>
          </div>
          <div className="finance-detail">
            <strong>Aadhar Card:</strong> <span>{financeDetails.aadharCard}</span>
          </div>
          <div className="finance-detail">
            <strong>Bank Name:</strong> <span>{financeDetails.bankName}</span>
          </div>
          <div className="finance-detail">
            <strong>Branch:</strong> <span>{financeDetails.branch}</span>
          </div>
          <div className="finance-detail">
            <strong>IFSC Code:</strong> <span>{financeDetails.ifscCode}</span>
          </div>
          <div className="finance-detail">
            <strong>CTC Breakup:</strong> <span>{financeDetails.ctcBreakup}</span>
          </div>
        </div>

        <div className="duration-selector">
          <label>Select Duration:</label>
          <select onChange={handleDurationChange} value={duration}>
            <option value="">Select Option</option>
            <option value={6}>Last 6 Months</option>
            <option value={10}>Last 10 Months</option>
            <option value={12}>Last 12 Months</option>
          </select>
        </div>

        <div className="date-picker-group">
          <label>Select Start Date:</label>
          <DatePicker selected={startDate} onChange={date => {
            setStartDate(date);
            setDuration("");
          }} />
          <label>Select End Date:</label>
          <DatePicker selected={endDate} onChange={date => {
            setEndDate(date);
            setDuration("");
          }} />
        </div>

        <div className="button-group">
          <button onClick={onEditClick} className="edit-button">
            Edit Details
          </button>
          <button className="download-payslip" onClick={handleDownloadPayslip}>
            Download Payslip
          </button>
        </div>
      </div>
      <EmployeeFooter />
    </>
  );
};

export default FinanceSection;
