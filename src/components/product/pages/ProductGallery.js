import React from "react";
import { Col, Row } from "react-bootstrap";
import CategorySidebar from "../util/CategorySidebar";
import ProductCard from "../util/ProductCard";

const products = [
  {
    id: 1,
    name: "Apple",
    description: "Fresh and juicy apples.",
    price: 0.99,
    image: "https://via.placeholder.com/150x150.png?text=Apple",
  },
  {
    id: 2,
    name: "Banana",
    description: "Sweet and delicious bananas.",
    price: 0.69,
    image: "https://via.placeholder.com/150x150.png?text=Banana",
  },
  {
    id: 3,
    name: "Orange",
    description: "Healthy and refreshing oranges.",
    price: 1.29,
    image: "https://via.placeholder.com/150x150.png?text=Orange",
  },
];

const ProductGallery = () => {
  return (
    <Row className="m-0" style={{ minHeight: "100vh" }}>
      <Col className="d-flex p-0">
        <CategorySidebar />
        <Row md={3} className="m-0 w-100">
          {products.map((product, index) => (
            <Col key={index}>
              <ProductCard key={product.id} product={product} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default ProductGallery;
