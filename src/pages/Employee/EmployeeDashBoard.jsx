import React, { useState, useEffect } from 'react';
import './EmployeeDashboard.css';

import AdminNavBar from '../../components/AdminNavbar';
import AdminFooter from '../../components/AdminFooter';

const ManageEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 5; // Number of employees per page

    // Mock data for employees. Replace with API call to fetch real data
    const mockEmployees = [
        { id: 1, name: 'John Doe', department: 'HR', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', department: 'Finance', email: 'jane@example.com' },
        { id: 3, name: 'Peter Parker', department: 'IT', email: 'peter@example.com' },
        { id: 4, name: 'Bruce Wayne', department: 'Admin', email: 'bruce@example.com' },
        { id: 5, name: 'Jaohn Doe', department: 'HR', email: 'john@example.com' },
        { id: 6, name: 'Jsane Smith', department: 'Finance', email: 'jane@example.com' },
        { id: 7, name: 'Pdeter Parker', department: 'IT', email: 'peter@example.com' },
        { id: 8, name: 'aman kk', department: 'Admin', email: 'bruce@example.com' }
    ];

    useEffect(() => {
        setEmployees(mockEmployees);
        setFilteredEmployees(mockEmployees);
    }, []);

    // Search function
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterAndSearchEmployees(e.target.value, filterDepartment);
    };

    // Filter function
    const handleFilter = (e) => {
        setFilterDepartment(e.target.value);
        filterAndSearchEmployees(searchTerm, e.target.value);
    };

    // Filter and search employees
    const filterAndSearchEmployees = (searchTerm, filterDepartment) => {
        let filtered = mockEmployees.filter((employee) =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!filterDepartment || employee.department === filterDepartment)
        );
        setFilteredEmployees(filtered);
        setCurrentPage(1); // Reset to page 1 after filtering
    };

    // Get current employees for the page
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    // Pagination handlers
    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <>
        <AdminNavBar/>
        <div className="employeedashboard">
            <h2>Manage Employees Section </h2>
<div className='addempbtn'>

<button className='addemp'><a href="/addemployee"> Add Employee </a> </button>
<button><a href="/managedepartment"> Add Department </a> </button>
            
</div>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar"
                />

            {/* Filter by Department */}
            <select value={filterDepartment} onChange={handleFilter} className="filter-select">
                <option value="">All Departments</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Admin">Admin</option>
            </select>

            {/* Employee Table */}
            <table className="employees-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{employee.email}</td>
                            <td  className='editbtn'>
                                <button onClick={() => console.log('    v   iew', employee.id)}>View</button>
                                <button onClick={() => console.log('Edit', employee.id)}>Edit</button>
                                <button  className='editbtn1' onClick={() => console.log('Delete', employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            
        </div>
        <AdminFooter/>
                    </>
    );
};

export default ManageEmployee;
