// src/components/ConfirmationPopup.jsx
import React from 'react';
import './ConfirmationDialog.css'; // Import the CSS for styling

const ConfirmationPopup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h3>Confirmation</h3>
        <p>{message}</p>
        <button className="close-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
