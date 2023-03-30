import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../App";
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

  const validate = () => {
    if (
      inputVal.userType.length === 0 ||
      inputVal.email.length === 0 ||
      inputVal.password.length === 0
    ) {
      toast.error("Fields cannot be empty!!", TOAST_PROP);
      return false;
    }
    if (inputVal.userType === "customer" && !inputVal.email.includes("@")) {
      toast.error("Enter a valid email!!", TOAST_PROP);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const loginData = {
      userType: inputVal.userType,
      userId: inputVal.email,
      password: inputVal.password,
    };
    context?.login(loginData);
  };

  return (
    <Row className="border-0 m-0">
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
            <Form.Label htmlFor="email">User Id / Email</Form.Label>
            <Form.Control
              type={inputVal.userType === "admin" ? "text" : "email"}
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

          <p className="text-center">
            Not a member? <Link to="/register">Register Here</Link>
          </p>
        </Form>
      </Col>
    </Row>
  );
}
