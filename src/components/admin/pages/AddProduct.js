import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import {
  createProduct,
  getAllCategories,
  getAllSubCategoriesByCategory,
  uploadProductImages,
} from "../../../api/AdminService";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../../App";

const AddProduct = () => {
  const [inputVal, setInputVal] = useState({
    categoryId: "",
    subCategoryId: "",
    name: "",
    mfdDate: "",
    expDate: "",
    price: "",
    quantity: "",
    brand: "",
    description: "",
    discount: "",
    type: "",
  });

  const [categories, setCategories] = useState([]);

  const [subCategories, setSubCategories] = useState([]);

  const [images, setImages] = useState([]);

  const [price, setPrice] = useState("");

  //fetch all categories
  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  //fetch all subcategories by category id
  useEffect(() => {
    inputVal.categoryId &&
      getAllSubCategoriesByCategory(inputVal.categoryId)
        .then((res) => setSubCategories(res.data))
        .catch((err) => console.log(err));
  }, [inputVal.categoryId]);

  const handleChange = (e) => {
    setInputVal((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const validate = () => {
    if (
      inputVal.categoryId.length === 0 ||
      inputVal.subCategoryId.length === 0 ||
      inputVal.name.length === 0 ||
      inputVal.brand.length === 0 ||
      inputVal.quantity.length === 0 ||
      inputVal.description.length === 0 ||
      inputVal.type.length === 0 ||
      inputVal.mfdDate.length === 0 ||
      inputVal.expDate.length === 0 ||
      inputVal.discount.length === 0 ||
      inputVal.price.length === 0
    ) {
      toast.error("Fields cannot be empty!!", TOAST_PROP);
      return false;
    }
    return true;
  };

  const uploadImages = (productId) => {
    uploadProductImages(productId, images)
      .then((res) => {
        console.log(res);
        handleReset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const backendPrice =
      price === "Kg"
        ? { pricePerKg: inputVal.price }
        : { pricePerPiece: inputVal.price };
    toast
      .promise(
        createProduct(inputVal.categoryId, inputVal.subCategoryId, {
          ...inputVal,
          ...backendPrice,
        }),
        {
          pending: "Adding....",
          success: "Product added successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        uploadImages(res.data);
        document.getElementById("images").value = "";
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add product!!", TOAST_PROP);
      });
  };

  const handleReset = () => {
    setInputVal({
      categoryId: "",
      subCategoryId: "",
      name: "",
      mfdDate: "",
      expDate: "",
      price: "",
      quantity: "",
      brand: "",
      description: "",
      discount: "",
      type: "",
    });
  };

  console.log(inputVal);

  return (
    <Row className="m-0">
      <Col md={{ offset: "3", span: 8 }} className="p-0">
        <h2 className="my-3 text-primary text-center">Add Product</h2>
        <Form className="add-product-form" onSubmit={handleSubmit}>
          <Row md={2} xs={1}>
            <Col className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                className="text-center text-capitalize"
                value={inputVal.categoryId}
                onChange={handleChange}
              >
                <option hidden>--select category--</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Col>

            {inputVal.categoryId && (
              <Col className="my-2">
                <Form.Label>Sub Category</Form.Label>
                <Form.Control
                  as="select"
                  name="subCategoryId"
                  className="text-center text-capitalize"
                  value={inputVal.subCategoryId}
                  onChange={handleChange}
                >
                  <option hidden>--select sub category--</option>
                  {subCategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            )}

            <Col className="my-2">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={inputVal.type}
                onChange={handleChange}
                className="text-center text-capitalize"
              >
                <option hidden>--select product type--</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
              </Form.Control>
            </Col>

            <Col className="my-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                name="brand"
                placeholder="Enter brand"
                value={inputVal.brand}
                onChange={handleChange}
              />
            </Col>

            <Col className="my-2">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Enter product name"
                value={inputVal.name}
                onChange={handleChange}
              />
            </Col>

            <Col className="my-2">
              <Form.Label className="d-flex gap-2">
                <span>Price / </span>
                <div className="d-flex justify-content-between gap-2">
                  <Form.Check
                    type={"radio"}
                    name="unit"
                    label={"Kg"}
                    value={"Kg"}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    name="unit"
                    label={"Piece"}
                    value={"Piece"}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </Form.Label>
              <Form.Control
                name="price"
                type="number"
                placeholder="Enter product price in ₹"
                value={inputVal.price}
                onChange={handleChange}
              />
            </Col>

            <Col className="my-2">
              <Form.Label>
                Total {price === "Kg" ? "Quantity" : "Count"}
              </Form.Label>
              <Form.Control
                name="quantity"
                type="number"
                placeholder={`Enter product quantity in ` + price}
                value={inputVal.quantity}
                onChange={handleChange}
              />
            </Col>

            <Col className="my-2">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                placeholder="Enter discount in %"
                value={inputVal.discount}
                onChange={handleChange}
              />
            </Col>

            <Col className="my-2">
              <Form.Label htmlFor="mfdDate">Manufactured date</Form.Label>
              <Form.Control
                id="mfdDate"
                type="date"
                name="mfdDate"
                value={inputVal.mfdDate}
                onChange={handleChange}
              />
            </Col>

            <Col className="my-2">
              <Form.Label htmlFor="expDate">Expiration date</Form.Label>
              <Form.Control
                id="expDate"
                type="date"
                name="expDate"
                placeholder="Enter expiration date"
                value={inputVal.expDate}
                onChange={handleChange}
              />
            </Col>

            <Col md={inputVal.categoryId && 12} className="my-2">
              <Form.Label>Product Images</Form.Label>
              <Form.Control
                id="images"
                multiple
                type="file"
                placeholder="Enter discount"
                onChange={(e) => setImages(e.target.files)}
              />
            </Col>

            <Col md={12} className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Enter product description"
                value={inputVal.description}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-center align-items-center gap-3 my-3">
            <Button variant="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit">Add Product</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default AddProduct;
