import React, { useEffect, useState } from "react";
import { Button, Card, Col, Collapse, Form, Row } from "react-bootstrap";
import {
  createFeedback,
  getAllFeedbacksByProduct,
} from "../../../api/customerService";
import { VscFeedback } from "react-icons/vsc";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../../App";
import { CustomContext } from "../../../context/AuthContext";
import { AiFillEye } from "react-icons/ai";

const Feedback = ({ product }) => {
  const { user } = CustomContext();

  console.log(user);

  const [feedback, setFeedback] = useState("");

  const [feedbacks, setFeedbacks] = useState([]);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  useEffect(() => {
    getAllFeedbacksByProduct(product.id)
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.log(err));
  }, [product]);

  const handleClick = () => {
    if (user === "admin") {
      toast.error("Admin cannot give feedback!!", TOAST_PROP);
      return;
    }
    if (feedback.length === 0) {
      toast.error("Feedback cannot be empty!!", TOAST_PROP);
      return;
    }
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
                  <p className="d-flex align-items-center justify-content-between">
                    <span>{feedback.message}</span>
                    {feedback.reply && (
                      <Button
                        variant="link"
                        className="d-flex align-items-center gap-1"
                        onClick={toggle}
                        size="sm"
                      >
                        <AiFillEye size={"1.1rem"} className="text-primary" />
                        <span>Reply</span>
                      </Button>
                    )}
                  </p>
                  <Collapse in={show}>
                    <div>{feedback.reply}</div>
                  </Collapse>
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
