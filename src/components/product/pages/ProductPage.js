import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Carousel,
  CardImg,
  Badge,
  Collapse,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  downloadProductImage,
  getSingleProduct,
} from "../../../api/AdminService";
import { ProductContextApi } from "../../../context/ProductContext";
import Feedback from "../util/Feedback";

const ProductPage = () => {
  const { IncrementItemQuantity } = ProductContextApi();

  const { slug } = useParams();

  const [product, setProduct] = useState({});

  const [images, setImages] = useState([]);

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  useEffect(() => {
    getSingleProduct(slug)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));

    downloadProductImage(slug)
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, [slug]);

  return (
    <Container>
      <Row className="my-3">
        <Col md={6}>
          <Carousel controls={images.length > 1} variant="dark">
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <CardImg
                  src={image}
                  height={400}
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
          <Button
            variant="primary"
            className="my-3"
            onClick={() => IncrementItemQuantity(product)}
          >
            Add to Cart
          </Button>
          <hr />
          <div>
            <h4 className="text-primary">Description : </h4>
            <p>{product.description}</p>
          </div>
          <hr />
          <div className="text-capitalize">
            <h4 className="text-primary">Product Details : </h4>
            <p>
              <b>Name : </b>
              {product?.name}
            </p>
            <p>
              <b>Brand : </b>
              {product?.brand}
            </p>
            <Collapse in={show}>
              <div>
                <p>
                  <b>Price : </b>₹{product?.pricePerKg || product.pricePerPiece}
                  {product.pricePerKg ? " / Kg" : " / Piece"}
                </p>
                <p>
                  <b>Category : </b>
                  {product?.category?.name}
                </p>
                <p>
                  <b>Sub-Category : </b>
                  {product?.subCategory?.name}
                </p>
                <p>
                  <b>Sold By : </b>Grocery Store
                </p>
              </div>
            </Collapse>
            <Button
              variant="secondary"
              size="sm"
              className="bg-info rounded"
              onClick={toggle}
            >
              {show ? "Collapse" : "View More"}
            </Button>
          </div>
        </Col>
      </Row>
      <hr />
      <Feedback product={product} />
    </Container>
  );
};

export default ProductPage;
