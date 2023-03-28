import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const products = [
  { id: 1, name: "Apples", price: 0.99, image: "https://picsum.photos/200" },
  { id: 2, name: "Bananas", price: 0.59, image: "https://picsum.photos/200" },
  { id: 3, name: "Bread", price: 2.99, image: "https://picsum.photos/200" },
  { id: 4, name: "Milk", price: 1.99, image: "https://picsum.photos/200" },
];

function HomePage() {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="d-flex flex-column align-items-center">
            <h1 className="text-center mt-5 mb-3">
              Welcome to Our Grocery Store
            </h1>
            <p className="text-center mb-5">
              Find all your grocery needs in one convenient place.
            </p>
            <Button variant="primary" href="/shop">
              Shop Now
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center bg-light">
        <Col md={10} lg={8}>
          <Row className="mt-5">
            {products.map((product) => (
              <Col md={3} key={product.id}>
                <Card>
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>${product.price.toFixed(2)}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Row className="mt-5">
            <Col md={6}>
              <h2>About Us</h2>
              <p>
                We are a family-owned grocery store that has been serving the
                community for over 50 years. Our mission is to provide
                high-quality, fresh food at affordable prices. Come visit us
                today!
              </p>
            </Col>
            <Col md={6}>
              <h2>Contact Us</h2>
              <p>
                123 Main St
                <br />
                Anytown, USA
                <br />
                Phone: (123) 456-7890
                <br />
                Email: info@grocerystore.com
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
