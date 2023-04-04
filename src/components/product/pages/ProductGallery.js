import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteProduct, getAllProducts } from "../../../api/AdminService";
import { TOAST_PROP } from "../../../App";
import CategorySidebar from "../util/CategorySidebar";
import ProductCard from "../util/ProductCard";

const ProductGallery = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    toast
      .promise(
        deleteProduct(id),
        {
          pending: "Removing...",
          success: "Product removed successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to remove the product!!", TOAST_PROP);
      });
  };

  return (
    <Row className="m-0" style={{ minHeight: "100vh" }}>
      <Col className="d-flex p-0">
        <CategorySidebar />
        <Row md={3} className="m-0 w-100">
          {products.map((product, index) => (
            <Col key={index}>
              <ProductCard
                key={product.id}
                product={product}
                handleDelete={handleDelete}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default ProductGallery;
