import React, { useEffect, useState } from "react";
import { Button, Card, Col, Collapse, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateCustomer } from "../../../api/customerService";
import { TOAST_PROP } from "../../../App";
import { CustomContext } from "../../../context/AuthContext";

const MyAccount = () => {
  const { user } = CustomContext();

  const [input, setInput] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setInput({ ...user });
  }, [user]);

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = () => {
    toast
      .promise(
        updateCustomer(user.id, input),
        {
          pending: "Updating...",
          success: "Profile updated successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setInput({ ...res.data });
        setDisabled(true);
      })
      .catch((err) => {
        toast.error("Failed to update details", TOAST_PROP);
      });
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="my-2 w-75 shadow border-0">
        <Card.Header className="fs-3 bg-primary text-light text-center">
          Account Information
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="my-2">
              <Form.Group className="my-2">
                <Form.Label>Email</Form.Label>
                <Form.Control disabled value={input.email} />
              </Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                disabled={disabled}
                value={input.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                disabled={disabled}
                type="number"
                value={input.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Collapse in={!disabled}>
              <div>
                <Form.Group className="my-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name="address"
                    disabled={disabled}
                    value={input.address}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="my-2">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    disabled={disabled}
                    value={input.city}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </Collapse>
          </Form>
        </Card.Body>
        <Card.Footer>
          {disabled ? (
            <Button
              variant="primary"
              className="w-100"
              onClick={() => setDisabled(false)}
            >
              Edit
            </Button>
          ) : (
            <Button variant="primary" className="w-100" onClick={handleClick}>
              Update
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default MyAccount;
