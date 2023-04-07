import React from "react";
import { Col, Row } from "react-bootstrap";
import { ProductContextApi } from "../../../context/ProductContext";
import FilterSidebar from "../util/FilterSidebar";
import ProductCard from "../util/ProductCard";

const ProductGallery = () => {
  const { products } = ProductContextApi();

  return (
    <Row className="m-0" style={{ minHeight: "100vh" }}>
      <Col className="d-flex gap-2 p-0">
        <FilterSidebar />
        <Row md={3} className="my-2 mx-0 w-100">
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
