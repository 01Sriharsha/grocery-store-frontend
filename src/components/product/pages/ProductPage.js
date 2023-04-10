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
  Badge,
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
                <CardImg
                  src={image}
                  height={300}
                  style={{ objectFit: "contain" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6} className="">
          <h5 className="text-capitalize fw-semibold">{product.brand}</h5>
          <h2 className="my-3 text-primary">{product.name}</h2>
          <div className="d-flex align-items-center gap-2">
            <span className="fs-5">
              MRP : ₹{product.pricePerKg || product.pricePerPiece}
            </span>
            <span className="fs-5">
              {product.pricePerKg ? " / Kg" : " / Piece"}
            </span>
            <Badge pill className="bg-success" style={{ fontSize: "0.7rem" }}>
              {product.discount}% Off
            </Badge>
          </div>
          <Button variant="primary" className="my-3">
            Add to Cart
          </Button>
          <hr />
          <div>
            <h4 className="text-primary">Description : </h4>
            <p>{product.description}</p>
          </div>
        </Col>
      </Row>
      <hr />
      <h3 className="text-primary">Customer Feedback</h3>
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
