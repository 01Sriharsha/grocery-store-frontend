import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../../App";
import { updateProductRequest } from "../../../api/AdminService";

const ProductRequestReplyModal = ({
  request,
  show,
  toggle,
  loadAllProductRequests,
}) => {
  const [reply, setReply] = useState("");

  const handleClick = () => {
    toast
      .promise(
        updateProductRequest(request.id, { ...request, reply: reply }),
        {
          pending: "Updating...",
          success: "replied successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        toggle();
        setReply("");
        loadAllProductRequests();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          `Failed to reply for the request with id ${request.id}`,
          TOAST_PROP
        );
      });
  };

  return (
    <Modal show={show} onHide={toggle}>
      <Modal.Header className="text-primary fs-4" closeButton>
        Reply to #{request.id}
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as="textarea"
          placeholder="Reply here..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Reply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductRequestReplyModal;
