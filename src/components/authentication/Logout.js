import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomContext } from "../../context/AuthContext";

const Logout = ({ show, toggle }) => {
  const context = CustomContext();

  return (
    <>
      <Modal show={show} onHide={toggle}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              context.logout();
              toggle();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Logout;
