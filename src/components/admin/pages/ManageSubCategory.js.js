import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  createSubCategory,
  deleteCategory,
  deleteSubCategory,
  getAllCategories,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
} from "../../../api/AdminService";
import { TOAST_PROP } from "../../../App";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const ManageSubCategory = () => {
  const [inputVal, setIputVal] = useState({
    categoryId: "",
    name: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);

  const [subCategories, setSubCategories] = useState([]);

  const [subCategoryId, setSubCategoryId] = useState("");

  const loadAllCategories = () =>
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));

  const loadAllSubCategories = () =>
    getAllSubCategories()
      .then((res) => setSubCategories(res.data))
      .catch((err) => console.log(err));

  const loadSingleSubCategory = (id) => {
    setSubCategoryId(id);
    getSingleSubCategory(id).then((res) => {
      setIputVal({
        categoryId: res.data.category.name,
        name: res.data.name,
        description: res.data.description,
      });
    });
  };

  useEffect(() => {
    loadAllCategories();
    loadAllSubCategories();
  }, []);

  const handleChange = (event) => {
    setIputVal((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const validate = () => {
    if (
      inputVal.categoryId.length === 0 ||
      inputVal.name.length === 0 ||
      inputVal.description.length === 0
    ) {
      toast.error("Fields cannot be empty!!", TOAST_PROP);
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    toast
      .promise(
        subCategoryId
          ? updateSubCategory(Number(subCategoryId), inputVal)
          : createSubCategory(inputVal.categoryId, inputVal),
        {
          pending: "Adding...",
          success: "Sub Category added successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        loadAllSubCategories();
        clear();
        setSubCategoryId("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add sub category!!", TOAST_PROP);
      });
  };

  const handleDelete = (id) => {
    toast
      .promise(
        deleteSubCategory(id),
        {
          pending: "Removing...",
          success: "Sub category removed successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        const newArr = subCategories.filter(
          (subcategory) => subcategory.id !== id
        );
        setSubCategories(newArr);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to remove sub category!!", TOAST_PROP);
      });
  };

  const clear = () =>
    setIputVal({
      categoryId: "",
      name: "",
      description: "",
    });

  console.log(inputVal);

  return (
    <div className="container">
      <Row className="m-0">
        <Col md={5} className="my-2">
          <Form onSubmit={handleSubmit}>
            <h4 className="text-center text-primary my-3">Add Sub Category</h4>
            <hr />
            <Form.Group className="my-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                className="text-center text-capitalize"
                as="select"
                name="categoryId"
                value={inputVal.categoryId}
                onChange={handleChange}
              >
                <option hidden>
                  {subCategoryId ? inputVal.categoryId : "--Select Category--"}
                </option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label>Sub Category Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Enter sub category name"
                value={inputVal.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="my-3">
              <Form.Label>Sub Category Description</Form.Label>
              <Form.Control
                rows="4"
                as="textarea"
                name="description"
                placeholder="Enter Sub category description"
                value={inputVal.description}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-end my-3">
              <Button variant="primary" type="submit">
                {subCategoryId ? "Update Sub Category" : "Add Sub Category"}
              </Button>
            </div>
          </Form>
        </Col>

        {/*display all categories*/}
        <Col md={7} className="my-2">
          <h4 className="text-center text-primary my-3">Added Sub Categories</h4>
          <hr />
          <Table>
            <thead>
              <tr className="text-center text-secondary">
                <th>Id</th>
                <th>Subcategory</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subCategories?.map((subcategory) => (
                <tr
                  key={subcategory.id}
                  className="text-center text-capitalize"
                >
                  <td>{subcategory.id}</td>
                  <td>{subcategory.name}</td>
                  <td>
                    <textarea
                      disabled
                      rows="1"
                      value={subcategory.description}
                      className="border-0 text-center"
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-4">
                      <FiEdit
                        role="button"
                        size="1.5rem"
                        color="green"
                        onClick={() => loadSingleSubCategory(subcategory.id)}
                      />
                      <AiFillDelete
                        role="button"
                        size="1.5rem"
                        color="red"
                        onClick={() => handleDelete(subcategory.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default ManageSubCategory;
