import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {
  createFeedback,
  getAllFeedbacksByProduct,
} from "../../../api/customerService";
import { VscFeedback } from "react-icons/vsc";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../../App";
import { CustomContext } from "../../../context/AuthContext";

const Feedback = ({ product }) => {
  const { user } = CustomContext();

  const [feedback, setFeedback] = useState("");

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getAllFeedbacksByProduct(product.id)
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.log(err));
  }, [product]);

  const handleClick = () => {
    toast
      .promise(
        createFeedback(user.id, product.id, { message: feedback }),
        {
          pending: "Posting....",
          success: "Thank you for your feedback!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        setFeedbacks([...feedbacks, res.data]);
        setFeedback("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to post the feedback!!", TOAST_PROP);
      });
  };

  return (
    <>
      <h3 className="text-primary">Customer Feedback</h3>
      <Row md={2} xs={1}>
        {feedbacks.map((feedback) => (
          <Col key={feedback.id} className="my-2">
            <Card className="shadow">
              <Card.Body className="d-flex align-items-center gap-3 text-capitalize w-100">
                <VscFeedback size="1.8rem" className="text-info" />
                <div className="w-100">
                  <p className="d-flex align-items-center justify-content-between text-primary">
                    <span className="fs-5">{feedback.customer.name}</span>
                    <span className="text-muted">{feedback.date}</span>
                  </p>
                  <p>{feedback.message}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Form>
        <h5 className="my-3">Your Feedback</h5>
        <Form.Group controlId="feedbackForm">
          <Form.Control
            as="textarea"
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here"
          />
        </Form.Group>
        <Button variant="primary" className="my-2" onClick={handleClick}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Feedback;
