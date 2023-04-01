import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import {
  getAllCategories,
  getAllSubCategoriesByCategory,
} from "../../../api/AdminService";

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

  //fetch all categories
  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  //fetch all subcategories by category id
  useEffect(() => {
    getAllSubCategoriesByCategory(inputVal.categoryId)
      .then((res) => setSubCategories(res.data))
      .catch((err) => console.log(err));
  }, [inputVal.categoryId]);

  const handleChange = (e) => {
    setInputVal((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Form>
      <Form.Group className="my-2">
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
      </Form.Group>

      {inputVal.categoryId && (
        <Form.Group className="my-2">
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
        </Form.Group>
      )}

      <Form.Group className="my-2">
        <Form.Label>Product name</Form.Label>
        <Form.Control
          name="name"
          placeholder="Enter product name"
          value={inputVal.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label htmlFor="mfdDate">Manufactured date</Form.Label>
        <Form.Control id="mfdDate"
          type="month"
          name="mfdDate"
          value={inputVal.mfdDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="my-2">
        <Form.Label htmlFor="expDate">Expiration date</Form.Label>
        <input id="expDate"
          type="month"
          name="expDate"
          placeholder="Enter expiration date"
          value={inputVal.expDate}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  );
};

export default AddProduct;
