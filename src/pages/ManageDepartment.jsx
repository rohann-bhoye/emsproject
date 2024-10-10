
import React, { useState } from "react";
import AdminNavBar from "../components/AdminNavbar"; 
import AdminFooter from "../components/AdminFooter"; 
import "./ManageDepartment.css"; 

const ManageDepartment = () => {
  const [departments, setDepartments] = useState([]); // State to hold department list
  const [newDepartment, setNewDepartment] = useState(""); // State for new department input
  const [editingDepartment, setEditingDepartment] = useState(null); // State for editing

  // Function to handle adding a new department
  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      setDepartments([...departments, newDepartment]);
      setNewDepartment("");
    }
  };

  // Function to handle editing a department
  const handleEditDepartment = (index) => {
    setEditingDepartment(index);
    setNewDepartment(departments[index]);
  };

  // Function to save the edited department
  const handleSaveEdit = () => {
    if (editingDepartment !== null) {
      const updatedDepartments = [...departments];
      updatedDepartments[editingDepartment] = newDepartment;
      setDepartments(updatedDepartments);
      setNewDepartment("");
      setEditingDepartment(null);
    }
  };

  // Function to handle deleting a department
  const handleDeleteDepartment = (index) => {
    const updatedDepartments = departments.filter((_, i) => i !== index);
    setDepartments(updatedDepartments);
  };

  return (
    <>
      <AdminNavBar />
      <div className="manage-departments-section">
        <h3 className="manage-departments-title">Manage Departments</h3>

        <div className="department-input-section">
          <input
            type="text"
            placeholder="Enter Department Name"
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            className="department-input"
          />
          {editingDepartment !== null ? (
            <button onClick={handleSaveEdit} className="save-button">
              Save
            </button>
          ) : (
            <button onClick={handleAddDepartment} className="add-button">
              Add Department
            </button>
          )}
        </div>

        {/* Departments List */}
        <table className="department-table">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={index}>
                <td>{department}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditDepartment(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteDepartment(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AdminFooter />
    </>
  );
};

export default ManageDepartment;
