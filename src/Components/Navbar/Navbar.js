import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal, Button } from 'react-bootstrap';
import './Navbar.css';

function Navbar({ onResetTasks }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleResetClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmReset = () => {
    onResetTasks();
    setShowConfirmation(false);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-black">
        <div className="container-fluid">
          <div className="navbar-header">
            {/* Logo and Heading on the left side */}
            <div className="navbar-brand d-flex align-items-center">
              <img
                src="https://tailnode.com/images/TAILNODE.png"
                alt="Logo"
                width="auto"
                height="50"
                backgroundColor="black"
                className="d-inline-block align-text-top"
              />
              <span className="text-white ml-2"><h3>Front-end Assignment</h3></span>
            </div>
          </div>
          <div className="navbar-right">
            <button onClick={handleResetClick} className="resetBtn">
              Reset
            </button>
          </div>
        </div>
      </nav>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete all tasks?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmReset}>
            Yes, Delete All
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Navbar;
