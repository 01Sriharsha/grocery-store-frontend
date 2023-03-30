import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { createCustomer } from "../../api/customerService";
import { TOAST_PROP } from "../../App";

const Register = () => {
  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputVal((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const validate = () => {
    if (
      inputVal.user?.length === 0 ||
      inputVal.name?.length === 0 ||
      inputVal.email?.length === 0 ||
      inputVal.phone?.length === 0 ||
      inputVal.address?.length === 0 ||
      inputVal.city?.length === 0 ||
      inputVal.password?.length === 0
    ) {
      toast.error("Fields cannot be empty!!", TOAST_PROP);
      return false;
    }

    if (!inputVal.email.includes("@")) {
      toast.error("Enter valid email!!", TOAST_PROP);
      return false;
    }
    if (inputVal.phone?.length !== 10) {
      toast.error("Enter valid phone number!!", TOAST_PROP);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    toast
      .promise(
        createCustomer(inputVal),
        {
          pending: "Registering....",
          success: "Registration successfull!! , Login to continue..!",
        },
        TOAST_PROP
      )
      .then((res) => {
        console.log(res);
        handleReset();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data ? err.response.data : "Failed to register!!",
          TOAST_PROP
        );
      });
  };

  const handleReset = () => {
    setInputVal({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      password: "",
    });
  };

  return (
    <div className="register-bg">
      <Row className="m-0">
        <Col md={6} xs={12} className="">
          <Form onSubmit={handleSubmit} className="w-100 p-3">
            <h1 className="text-center text-light fw-bold">REGISTER</h1>
            <Form.Group className="my-2">
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={inputVal.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="my-2">
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
            <Form.Group className="my-2">
              <Form.Label htmlFor="phone">Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter your phone"
                value={inputVal.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label htmlFor="address">Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                id="address"
                placeholder="Enter your address"
                value={inputVal.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label htmlFor="city">City</Form.Label>
              <Form.Control
                as="select"
                name="city"
                id="city"
                value={inputVal.city}
                onChange={handleChange}
                className="text-center text-capitalize"
              >
                <option hidden>--select city--</option>
                <option value="mysuru">Mysuru</option>
                <option value="bengaluru">Bengaluru</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={inputVal.password}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-center my-3 gap-3">
              <Button variant="secondary" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit" variant="primary">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
