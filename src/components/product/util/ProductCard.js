import React, { useEffect, useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import { deleteProduct, downloadProductImage } from "../../../api/AdminService";
import DefaultImage from "../../../assets/bg-1.jpg";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../../App";
import { CustomContext } from "../../../context/AuthContext";

const ProductCard = ({ product, handleDelete }) => {
  const context = CustomContext();

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
    <Card className="border">
      <Carousel controls={images.length > 1} variant="dark" interval={700}>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <Card.Img variant="top" src={image} height={300} />
          </Carousel.Item>
        ))}
      </Carousel>

      <Card.Body>
        <Card.Title className="text-capitalize">{product.name}</Card.Title>
        <Card.Text>
          <span>Price: ₹{product.pricePerKg || product.pricePerPiece}</span>
          <span>{product.pricePerKg ? " / Kg " : " / Piece "}</span>
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary">Add to Cart</Button>
          {context.user === "admin" && (
            <AiFillDelete
              size="1.3rem"
              color="red"
              role="button"
              onClick={() => {
                handleDelete(product.id);
              }}
            />
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
