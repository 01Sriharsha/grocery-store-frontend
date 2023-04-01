import React from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { offerImages } from "../../assets/assets";

function HomePage() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Carousel variant="dark">
              {offerImages.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    style={{height : '60vh'}}
                    src={image}
                    alt={`offer ` + index}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>Featured Products</h2>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src="https://picsum.photos/300/200?random=1"
              />
              <Card.Body>
                <Card.Title>Product 1</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  commodo felis vitae dapibus bibendum.
                </Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src="https://picsum.photos/300/200?random=2"
              />
              <Card.Body>
                <Card.Title>Product 2</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  commodo felis vitae dapibus bibendum.
                </Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src="https://picsum.photos/300/200?random=3"
              />
              <Card.Body>
                <Card.Title>Product 3</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  commodo felis vitae dapibus bibendum.
                </Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <footer className="bg-light">
        <Container>
          <Row>
            <Col>
              <p>&copy; 2023 Grocery Store</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default HomePage;
