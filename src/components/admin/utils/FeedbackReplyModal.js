import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { upadteFeedback } from "../../../api/customerService";
import { TOAST_PROP } from "../../../App";

const FeedbackReplyModal = ({ feedback, show, toggle, loadAllFeedbacks }) => {
  const [reply, setReply] = useState("");

  const handleClick = () => {
    toast
      .promise(
        upadteFeedback(feedback.id, { ...feedback, reply: reply }),
        {
          pending: "Updating...",
          success: "replied successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        loadAllFeedbacks();
        toggle();
        setReply("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          `Failed to reply for the feedback with id ${feedback.id}`,
          TOAST_PROP
        );
      });
  };

  return (
    <Modal show={show} onHide={toggle}>
      <Modal.Header className="text-primary fs-4" closeButton>
        Reply to #{feedback.id}
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

export default FeedbackReplyModal;
