import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ProductContextApi } from "../../../context/ProductContext";
import FilterSidebar from "../util/FilterSidebar";
import ProductCard from "../util/ProductCard";

const ProductGallery = () => {
  const { products } = ProductContextApi();

  return (
    <Row className="m-0" style={{ minHeight: "100vh" }}>
      <Col className="d-flex gap-2 p-0">
        <FilterSidebar />
        <Container>
          {products.length !== 0 ? (
            <Row md={3} sm={2} xs={1} className="my-2 mx-0 w-100">
              {products.map((product, index) => (
                <Col key={index}>
                  <ProductCard key={product.id} product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "70vh" }}
            >
              <h3 className="text-primary text-center">
                No Products in this <br /> category or sub-category...!
              </h3>
            </div>
          )}
        </Container>
      </Col>
    </Row>
  );
};

export default ProductGallery;
