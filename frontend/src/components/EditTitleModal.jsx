import React, { useState, useEffect } from 'react';

const EditTitleModal = ({ isOpen, onClose, onSave, initialTitle }) => {
  const [title, setTitle] = useState(initialTitle);

  // Update local state when initialTitle changes
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload
    onSave(title);
    onClose(); // Optionally close the modal on save
  };

  return (
    <div style={modalStyle}>
      <form onSubmit={handleSave} style={modalContentStyle}>
        <h2>Edit Presentation Title</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          autoFocus // Automatically focus this input when the modal is opened
        />
        <div style={buttonContainerStyle}>
          <button type="submit" style={buttonStyle}>Save</button>
          <button type="button" onClick={onClose} style={buttonStyle}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

// Styles for the modal, you can adjust or enhance them as needed
const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '400px' // Adjust the width as needed
};

const inputStyle = {
  marginBottom: '20px',
  width: '100%',
  padding: '10px',
  fontSize: '16px'
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

const buttonStyle = {
  padding: '10px 20px',
  cursor: 'pointer'
};

export default EditTitleModal;
