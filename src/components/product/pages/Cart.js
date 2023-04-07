import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ProductContextApi } from "../../../context/ProductContext";
import ProductCard from "../util/ProductCard";

const Cart = () => {
  const { cartItems  , clearCart} = ProductContextApi();

  const flexStyle = "d-flex justify-content-between align-items-center";

  const subTotals = cartItems.map((item) => {
    return item.quantity * (item.pricePerKg || item.pricePerPiece);
  });

  const totalPrice = subTotals.reduce((acc, curr) => {
    return acc + curr;
  }, 0);

  return (
    <Container>
      <Row className="my-3">
        <div className="d-flex justify-content-between w-100">
          <h2>My Cart</h2>
          <div>
            <Button size="sm" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>
        <Col md={7}>
          {cartItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </Col>
        <Col md={5}>
          <Card className="my-2">
            <Card.Header className="fs-3 text-primary text-center">
              Payment Details
            </Card.Header>
            <Card.Body>
              <Card.Text className={flexStyle}>
                <span className="fw-bold">Delivery Fee : </span>
                <span>
                  Free Delivery{" "}
                  <i className="text-muted text-decoration-line-through">₹40</i>
                </span>
              </Card.Text>
              <Card.Text className={flexStyle}>
                <span className="fw-bold">Total : </span>
                <span>₹{totalPrice}</span>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button className="w-100">Place Order</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
