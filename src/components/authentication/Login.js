import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CustomContext } from "../../context/AuthContext";

export default function Login() {
  const context = CustomContext();

  const [inputVal, setInputVal] = useState({
    userType: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputVal((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    context?.login(inputVal);
  };

  return (
    <Row className="border-0">
      <Col md={7} className="login-bg p-0"></Col>
      <Col
        md={5}
        className="p-0 d-flex justify-content-center align-items-center border-0"
      >
        <Form className="shadow p-3 mx-4 w-100" onSubmit={handleSubmit}>
          <h2 className="text-center text-primary">Login</h2>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>User</Form.Label>
            <Form.Select
              name="userType"
              value={inputVal.userType}
              onChange={handleChange}
              className="text-center"
            >
              <option hidden>--Select user type--</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={inputVal.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={inputVal.password}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-center align-items-center my-3">
            <Button type="submit" variant="primary" className="">
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
