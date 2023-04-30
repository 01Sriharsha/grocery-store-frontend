import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { offerImages } from "../../assets/assets";
import { ProductContextApi } from "../../context/ProductContext";
import ProductCard from "../product/util/ProductCard";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function HomePage() {
  const { products } = ProductContextApi();
  return (
    <div className="">
    <Container className="p-2">
      <Carousel
        variant="light"
        controls={false}
        interval={800}
        className="shadow"
      >
        {offerImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              style={{ height: "60vh" }}
              src={image}
              alt={`offer ` + index}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/**Featured products */}
      <h2 className="text-primary my-4">Featured Products</h2>
      <div className="d-flex flex-wrap flex-md-nowrap justify-content-center justify-content-md-between align-items-center gap-md-4">
        {products.slice(0, 3).map((product, index) => (
          <div key={index} style={{ width: "20rem" }}>
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
        <Link
          style={{ width: "13rem" }}
          to="/products"
          className="d-flex flex-column justify-content-center align-items-center my-2"
        >
          <BsFillArrowRightCircleFill
            role="button"
            size="3.5rem"
            className="text-primary"
          />
          <p>View More</p>
        </Link>
      </div>

      {/**Footer section */}
      <footer className="text-center py-3 fs-5">
        <span>&copy; {new Date().getFullYear()} Grocery Store</span>
      </footer>
    </Container>
    </div>
  );
}

export default HomePage;
