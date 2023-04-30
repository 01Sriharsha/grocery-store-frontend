import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Row } from "react-bootstrap";
import { downloadProductImage } from "../../../api/AdminService";
import DefaultImage from "../../../assets/bg-1.jpg";
import {
  AiFillDelete,
  AiFillMinusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import { CustomContext } from "../../../context/AuthContext";
import { ProductContextApi } from "../../../context/ProductContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { pathname } = useLocation();

  const context = CustomContext();

  const navigate = useNavigate();

  const {
    handleDelete,
    IncrementItemQuantity,
    decrementItemQuantity,
    removeCartItem,
  } = ProductContextApi();

  const [images, setImages] = useState([]);

  useEffect(() => {
    downloadProductImage(product.id)
      .then((res) => {
        res.data.length === 0 ? setImages([DefaultImage]) : setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [product.id]);

  return (
    <>
      {pathname !== "/cart" ? (
        <Card className="border my-2 shadow">
          <Carousel controls={images.length > 1} variant="dark" interval={700}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <Card.Img variant="top" src={image} height={230} />
              </Carousel.Item>
            ))}
          </Carousel>

          <Card.Body>
            <Link
              to={`/product/${product.id}`}
              className="text-decoration-none text-capitalize"
              style={{ color: "black" }}
            >
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                <span>
                  Price: ₹{product.pricePerKg || product.pricePerPiece}
                </span>
                <span>{product.pricePerKg ? " / Kg " : " / Piece "}</span>
              </Card.Text>
            </Link>
            <div className="d-flex justify-content-between align-items-center my-2">
              <Button
                variant="primary"
                onClick={() =>
                  IncrementItemQuantity({ ...product, quantity: 0 })
                }
              >
                Add to Cart
              </Button>
              {context.user === "admin" && (
                <AiFillDelete
                  size="1.3rem"
                  color="red"
                  role="button"
                  onClick={() => handleDelete(product.id)}
                />
              )}
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="my-2 d-flex shadow">
          <Card.Body className="d-flex text-capitalize">
            <Row className="w-100">
              <Col md={3} className="d-flex justify-content-center">
                <Card.Img
                  variant="left"
                  src={images[0]}
                  height={120}
                  width={150}
                  // style={{objectFit : 'cover'}}
                />
              </Col>
              <Col md={9}>
                <div className="d-flex flex-column align-items-start justify-content-center w-100">
                  <Card.Title className="text-primary">
                    {product.name}
                  </Card.Title>
                  <Card.Text>
                    {product.quantity} X{" ₹"}
                    {product.price ||
                      product.pricePerKg ||
                      product.pricePerPiece}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <span>
                      Sold By : <b>{product.brand}</b>
                    </span>
                    <Card.Text className="d-flex gap-2">
                      <AiFillMinusCircle
                        role="button"
                        size="1.5rem"
                        className="text-primary"
                        onClick={() => decrementItemQuantity(product)}
                      />
                      <span className="fw-bold">{product.quantity}</span>
                      <AiFillPlusCircle
                        role="button"
                        size="1.5rem"
                        className="text-primary"
                        onClick={() => IncrementItemQuantity(product)}
                      />
                    </Card.Text>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-between">
              <AiFillDelete
                role="button"
                size="1.5rem"
                color="red"
                //send product id , for user who is not logged in
                onClick={() => removeCartItem(product.cartId || product.id)}
              />
              <div className="fw-bold">
                <span>Subtotal : ₹</span>
                <span>
                  {product.quantity *
                    (product.price ||
                      product.pricePerKg ||
                      product.pricePerPiece)}
                </span>
              </div>
            </div>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};

export default ProductCard;
