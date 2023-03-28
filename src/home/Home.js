import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Img variant="top" src="/images/grocery-store.jpg" />
            <Card.Body>
              <Card.Title>Welcome to our Grocery Store!</Card.Title>
              <Card.Text>
                We offer a wide range of fresh produce, meats, dairy products,
                and more. Check out our weekly specials and save big on your
                grocery bill.
              </Card.Text>
              <Button variant="primary">Shop Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Weekly Specials</Card.Title>
              <Card.Text>
                Save big on these items this week:
                <ul>
                  <li>Apples - $1.99/lb</li>
                  <li>Ground Beef - $3.99/lb</li>
                  <li>Yogurt - $0.99/each</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
