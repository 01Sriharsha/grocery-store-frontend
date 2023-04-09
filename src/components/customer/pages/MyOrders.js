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
import { getAllOrdersByCustomer } from "../../../api/customerService";
import { CustomContext } from "../../../context/AuthContext";

const MyOrders = () => {
  const { user } = CustomContext();

  const [orders, setOrders] = useState([]);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  useEffect(() => {
    getAllOrdersByCustomer(user.id).then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, [user.id]);

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
                <Card.Title className="fw-bold">
                  Order #{order.orderId}
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
                <Button variant="danger" size="sm">
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
