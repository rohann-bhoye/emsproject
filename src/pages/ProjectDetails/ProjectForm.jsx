/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./ProjectForm.css";
import AdminNavBar from "../../components/AdminNavbar";
import EmployeeNavBar from "../../components/EmployeeNavBar";
import EmployeeFooter from "../../components/EmployeeFooter";

const ProjectDetailsForm = ({ onSubmit, closeForm }) => {
  const [formValues, setFormValues] = useState({
    projectCode: "",
    startDate: "",
    endDate: "",
    clientName: "",
    managerEmail: "",
    employeeName: "",
    employeeID: "",
    isCurrentProject: true, // New state for checkbox
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setFormValues({
      ...formValues,
      isCurrentProject: e.target.checked,
      endDate: e.target.checked ? "" : formValues.endDate, // Reset end date if checkbox is checked
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formValues.projectCode) newErrors.projectCode = "Project code is required";
    if (!formValues.startDate) newErrors.startDate = "Start date is required";
    if (!formValues.clientName) newErrors.clientName = "Client/Project name is required";
    if (!formValues.managerEmail) newErrors.managerEmail = "Manager's email or employee code is required";
    if (!formValues.employeeName) newErrors.employeeName = "Employee name is required";
    if (!formValues.employeeID) newErrors.employeeID = "Employee ID is required";

    // End date validation only if it's not a current project
    if (!formValues.isCurrentProject && !formValues.endDate) {
      newErrors.endDate = "End date is required for completed projects";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formValues);
      setFormValues({
        projectCode: "",
        startDate: "",
        endDate: "",
        clientName: "",
        managerEmail: "",
        employeeName: "",
        employeeID: "",
        isCurrentProject: true, // Reset checkbox state
      });
      closeForm(); // Hide the form after submission
    }
  };
  
  return (
    <>
    
    <form onSubmit={handleSubmit} className="project-form">
      <div>
        <label>Employees Name:</label>
        <input
          type="text"
          name="employeeName"
          value={formValues.employeeName}
          onChange={handleChange}
          />
        {errors.employeeName && <span className="error">{errors.employeeName}</span>}
      </div>

      <div>
        <label>Employees ID:</label>
        <input
          type="text"
          name="employeeID"
          value={formValues.employeeID}
          onChange={handleChange}
          />
        {errors.employeeID && <span className="error">{errors.employeeID}</span>}
      </div>

      <div>
        <label>Project Code:</label>
        <input
          type="text"
          name="projectCode"
          value={formValues.projectCode}
          onChange={handleChange}
          />
        {errors.projectCode && <span className="error">{errors.projectCode}</span>}
      </div>

      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formValues.startDate}
          onChange={handleChange}
          />
        {errors.startDate && <span className="error">{errors.startDate}</span>}
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formValues.isCurrentProject ? "" : formValues.endDate}
          onChange={handleChange}
          disabled={formValues.isCurrentProject} // Disable if current project is checked
          />
        {errors.endDate && <span className="error">{errors.endDate}</span>}
      </div>

      <div className='checkbox-container'>
        <input
          className="chk-input"
          type="checkbox"
          name="isCurrentProject"
          checked={formValues.isCurrentProject}
          onChange={handleCheckboxChange}
          />
        <label>Current Working Project</label>
      </div>

      <div>
        <label>Client/Project Name:</label>
        <input
          type="text"
          name="clientName"
          value={formValues.clientName}
          onChange={handleChange}
          />
        {errors.clientName && <span className="error">{errors.clientName}</span>}
      </div>

      <div>
        <label>Reporting Manager’s Code / Email:</label>
        <input
          type="text"
          name="managerEmail"
          value={formValues.managerEmail}
          onChange={handleChange}
          />
        {errors.managerEmail && <span className="error">{errors.managerEmail}</span>}
      </div>

      <button type="submit">Add Project</button>
    </form>
  
          </>
  );
};

const ProjectHistory = ({ projectList }) => {
  return (
    <>
  
    <div className="project-history">
      <h2>Project History</h2>
      {projectList.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Project Code</th>
              <th>Client/Project Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Manager Email</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((project, index) => (
              <tr key={index}>
                <td>{project.employeeName}</td>
                <td>{project.employeeID}</td>
                <td>{project.projectCode}</td>
                <td>{project.clientName}</td>
                <td>{project.startDate}</td>
                <td>{project.isCurrentProject ? "Ongoing" : project.endDate}</td> {/* Display "Ongoing" for current projects */}
                <td>{project.managerEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No project history available.</p>
      )}
    </div>
   
</>
  );
};

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };
  
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };
  
  return (
    <>
    <EmployeeNavBar/>
    <div className="app-container">
      <h1>Employee Project Details</h1>

      {!showForm && (
        <button onClick={toggleFormVisibility} className="show-form-btn">
          Add Project
        </button>
      )}

      {showForm && (
        <ProjectDetailsForm
        onSubmit={handleAddProject}
        closeForm={toggleFormVisibility}
        />
      )}

      <ProjectHistory projectList={projects} />
    </div>
    <EmployeeFooter/>
      </>
  );
};

export default Project;
