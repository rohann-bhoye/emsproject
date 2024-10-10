// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Use Axios or fetch API to get employee data
import './Profile.css';  // Optional: Add styling for the profile page
import EmployeeFooter from '../components/EmployeeFooter';
import EmployeeNavBar from '../components/EmployeeNavBar';

const Profile = () => {
    const [employeeData, setEmployeeData] = useState(null);  // To store employee data
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
        // Mock API call or actual API call to get employee data
        const fetchEmployeeData = async () => {
            try {
                // Assuming the backend API returns employee data based on ID
                const response = await axios.get('https://api.example.com/employee/1'); // Replace with real API
                setEmployeeData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching employee data", error);
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // Display loading text while data is being fetched
    }

    return (
        <>
        <EmployeeNavBar/>
        <div className="profile-container">
        <a href=''> <button className='profileedit'>Profile Edit</button></a>
            <h2>Employee Profile</h2>
            {employeeData ? (
                <div className="profile-section">
                <p><strong className="profile-item">Full Name:</strong> {employeeData.fullName}</p>
                <p><strong className="profile-item">Date of Birth:</strong> {employeeData.dateOfBirth}</p>
                <p><strong className="profile-item">Gender:</strong> {employeeData.gender}</p>
                <p><strong className="profile-item">Age:</strong> {employeeData.age}</p>
                <p><strong className="profile-item">Current Address:</strong> {employeeData.currentAddress}</p>
                <p><strong className="profile-item">Permanent Address:</strong> {employeeData.permanentAddress}</p>
                <p><strong className="profile-item">City:</strong> {employeeData.city}</p>
                <p><strong className="profile-item">Pin Code:</strong> {employeeData.pinCode}</p>
                <p><strong className="profile-item">Mobile:</strong> {employeeData.mobile}</p>
                <p><strong className="profile-item">Personal Email:</strong> {employeeData.personalEmail}</p>
                <p><strong className="profile-item">Company Email:</strong> {employeeData.companyEmail}</p>
                <p><strong className="profile-item">Emergency Contact:</strong> {employeeData.emergencyContactName} ({employeeData.emergencyContactMobile})</p>
                <p><strong className="profile-item">Employment Code:</strong> {employeeData.employmentCode}</p>
                <p><strong className="profile-item">Office Phone:</strong> {employeeData.officePhone}</p>
                <p><strong className="profile-item">Office Address:</strong> {employeeData.officeAddress}</p>
                <p><strong className="profile-item">Reporting Manager:</strong> {employeeData.reportingManager}</p>
                <p><strong className="profile-item">HR Name:</strong> {employeeData.hrName}</p>
                <p><strong className="profile-item">Previous Company:</strong> {employeeData.previousCompany}</p>
                <p><strong className="profile-item">Joining Date:</strong> {employeeData.previousJoinDate}</p>
                <p><strong className="profile-item">End Date:</strong> {employeeData.previousEndDate}</p>
              </div>
            
            ) : (
                <p>No employee data found.</p>
            )}
        </div>
       
            
          
       
        <EmployeeFooter/>
            </>
    );
};

export default Profile;
