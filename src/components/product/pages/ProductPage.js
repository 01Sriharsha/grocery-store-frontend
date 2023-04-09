import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  ListGroup,
  Carousel,
  CardImg,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  downloadProductImage,
  getSingleProduct,
} from "../../../api/AdminService";

const ProductPage = () => {
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const [product, setProduct] = useState({});

  const [images, setImages] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    getSingleProduct(slug)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));

    downloadProductImage(slug)
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, [slug]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedbacks([...feedbacks, feedback]);
    setFeedback("");
  };

  return (
    <Container>
      <Row className="my-3">
        <Col md={6}>
          <Carousel controls={images.length > 1} variant="dark">
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <CardImg src={image} height={300} style={{objectFit : 'contain'}} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6} className="">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>
            <span>₹{product.pricePerKg || product.pricePerPiece}</span>
            <span>{product.pricePerKg ? " / Kg" : " / Piece"}</span>
          </h4>
          <Button variant="primary" className="my-3">Add to Cart</Button>
        </Col>
      </Row>
      <hr />
      <h3>Customer Feedback</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="feedbackForm">
          <Form.Control
            as="textarea"
            rows={3}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-2">
          Submit
        </Button>
      </Form>
      <br />
      <ListGroup>
        {feedbacks.map((feedback, index) => (
          <ListGroup.Item key={index}>{feedback}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ProductPage;
