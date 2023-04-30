import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { postARequest } from "../../../api/customerService";
import { CustomContext } from "../../../context/AuthContext";
import { TOAST_PROP } from "../../../App";

const PostRequest = () => {
  const { user } = CustomContext();

  const [input, setInput] = useState({
    name: "",
    message: "",
    brand: "",
  });

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = () => {
    toast
      .promise(
        postARequest(input, user.id),
        {
          pending: "Posting...",
        },
        TOAST_PROP
      )
      .then((res) => {
        toast.success("Request posted successfully!!", TOAST_PROP);
        handleReset();
      })
      .catch((err) => {
        toast.error("Failed to post product request!!", TOAST_PROP);
      });
  };

  const handleReset = () => {
    setInput({
      name: "",
      brand: "",
      message: "",
    });
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card className="shadow my-3 w-100">
        <Card.Header className="bg-primary text-light py-2 fs-3 text-center">
          Request A Product
        </Card.Header>
        <Card.Body>
          <Form.Group className="my-2">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              name="name"
              placeholder="Enter product name"
              value={input.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              name="brand"
              placeholder="Enter product brand name"
              value={input.brand}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="my-2">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              placeholder="Type here..."
              value={input.message}
              onChange={handleChange}
            />
          </Form.Group>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end align-items-center">
          <Button onClick={handleClick}>Post Request</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default PostRequest;
