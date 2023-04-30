import React, { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  Table,
  Card,
  Button,
  Row,
  Col,
  Collapse,
} from "react-bootstrap";
import {
  getAllOrdersByCustomer,
  updateOrderByCustomer,
} from "../../../api/customerService";
import { CustomContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../../App";

const MyOrders = () => {
  const { user } = CustomContext();

  const [orders, setOrders] = useState([]);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  const loadAllOrdersByCustomer = () => {
    getAllOrdersByCustomer(user.id)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllOrdersByCustomer();
  }, []);

  const handleCancellation = (order) => {
    updateOrderByCustomer(order.orderId, { ...order, cancel: "pending" })
      .then((res) => {
        toast.success("Cancellation request has been sent!!", TOAST_PROP);
        loadAllOrdersByCustomer();
      })
      .catch((err) => {
        toast.error("Failed to send cancellation request", TOAST_PROP);
      });
  };

  if (orders.length === 0) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <h3>No Orders</h3>
        <p>
          <Link to="/products">Click Here</Link> to shop...!
        </p>
      </div>
    );
  }
  return (
    <Container className="p-1">
      <Card className="border-0" style={{ backgroundColor: "transparent" }}>
        <Card.Header className="bg-primary rounded">
          <h2 className="text-light text-center">My Orders</h2>
        </Card.Header>
        <Card.Body className="p-0">
          {orders.map((order) => (
            <Card key={order.orderId} className="my-3 shadow">
              <Card.Body>
                <Card.Title className="fw-bold d-flex justify-content-between">
                  <span>Order #{order.orderId}</span>
                  {order.cancel && (
                    <span className="fs-6">
                      <b>Cancel status : </b>
                      <span className="text-info">{order.cancel.toUpperCase()}</span>
                    </span>
                  )}
                </Card.Title>
                <div>
                  <Row className="my-2">
                    <Col md={3}>Ordered Date:</Col>
                    <Col>{order.date}</Col>
                  </Row>
                  <Collapse in={show}>
                    <div>
                      <Row className="my-2">
                        <Col md={3}>Total Price:</Col>
                        <Col>₹{order.totalPrice}</Col>
                      </Row>
                      <Row className="my-2">
                        <Col md={3}>Total Quantity :</Col>
                        <Col>{order.products.length} items</Col>
                      </Row>
                      <Row className="my-2">
                        <Col md={3}>Dispatch Status:</Col>
                        <Col>
                          {order.dispatched ? "Dispatched" : "Not Dispatched"}
                        </Col>
                      </Row>
                      <Row className="my-2">
                        <Col md={3}>Delivered Status:</Col>
                        <Col>
                          {order.delivered ? "Delivered" : "Not Delivered"}
                        </Col>
                      </Row>
                    </div>
                  </Collapse>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr className="text-center text-capitalized">
                      <th>Name</th>
                      <th>Price</th>
                      <th>Brand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((item) => (
                      <tr
                        key={item.id}
                        className="text-center text-capitalized"
                      >
                        <td>{item.name}</td>
                        <td>₹{item.price}</td>
                        <td>{item.brand}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button variant="primary" size="sm" onClick={toggle}>
                  View Order Details
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleCancellation(order)}
                >
                  Request Cancellation
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyOrders;
