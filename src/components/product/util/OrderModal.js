import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, Collapse, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomContext } from "../../../context/AuthContext";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { createOrder } from "../../../api/customerService";
import { TOAST_PROP } from "../../../App";
import { ProductContextApi } from "../../../context/ProductContext";
import { useNavigate } from "react-router-dom";

const OrderModal = ({ show, toggle, orderDetails }) => {
  const { user } = CustomContext();

  const { cartItems, clearCart } = ProductContextApi();

  const navigate = useNavigate();

  const [input, setInput] = useState({
    address: "",
    city: "",
    phone: "",
  });

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setInput({ ...user });
  }, [user]);

  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handlePlaceOrder = () => {
    const orderData = {
      totalPrice: orderDetails.totalPrice,
      quantity: orderDetails.totalQuantity,
      phone: input.phone,
      address: input.address,
      city: input.city,
      cartDto: cartItems,
    };
    toast
      .promise(
        createOrder(user.id, orderData),
        {
          pending: "Loading....",
          success: "Order placed successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        toggle();
        clearCart();
        navigate("/customer/orders");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to place your order!!Try agian later", TOAST_PROP);
      });
  };

  return (
    <Modal show={show} onHide={toggle}>
      <Modal.Header closeButton>
        <Modal.Title className="text-primary">Place Order</Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-0">
        <Accordion defaultActiveKey="0">
          {/**Delivery Details*/}
          <Accordion.Item eventKey="0" className="my-3">
            <Accordion.Header>
              <span className="text-warning fs-5">Delivery Details</span>
            </Accordion.Header>
            <Accordion.Body className="text-capitalize">
              <div className="d-flex w-100 justify-content-between gap-2 align-items-center mb-3">
                <span>Name : {user.name}</span>
                <FiEdit
                  role="button"
                  size={"1.2rem"}
                  className="text-success"
                  onClick={() => setEdit(true)}
                />
              </div>
              {!edit && (
                <div>
                  <p>Phone : {user.phone}</p>
                  <p>Address : {user.address}</p>
                  <p>City : {user.city}</p>
                </div>
              )}
              <Collapse in={edit}>
                <div>
                  <Form>
                    <Form.Group className="my-2">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        name="phone"
                        value={input.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="my-2">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        name="address"
                        value={input.address}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="my-2">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        name="city"
                        value={input.city}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Form>
                </div>
              </Collapse>
            </Accordion.Body>
          </Accordion.Item>

          {/**Payement Mode*/}
          <Accordion.Item eventKey="1" className="my-3">
            <Accordion.Header>
              <span className="text-warning fs-5">Payment Mode</span>
            </Accordion.Header>
            <Accordion.Body>
              <Form.Check
                type="radio"
                label="Cash on delivery"
                defaultChecked
              />
            </Accordion.Body>
          </Accordion.Item>

          {/**Order Deatils */}
          <Accordion.Item eventKey="2" className="my-3">
            <Accordion.Header>
              <span className="text-warning fs-5">Order Details</span>
            </Accordion.Header>
            <Accordion.Body>
              <p>Total Quantity : {orderDetails.totalQuantity} items</p>
              <p>Total Price : ₹{orderDetails.totalPrice}</p>
              <p>
                Delivery Charge : Free Delivery{" "}
                <i className="text-muted text-decoration-line-through">₹40</i>
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggle}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePlaceOrder}>
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
