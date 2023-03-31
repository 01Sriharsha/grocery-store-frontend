import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Table, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../../../api/AdminService";
import { TOAST_PROP } from "../../../App";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

const AddCategory = () => {
  const [inputVal, setIputVal] = useState({
    name: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);

  const loadAllCategories = () =>
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));

  useEffect(() => {
    loadAllCategories();
  }, []);

  const handleChange = (event) => {
    setIputVal((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast
      .promise(
        createCategory(inputVal),
        {
          pending: "Adding...",
          success: "Category added successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        loadAllCategories();
        clear();
      })
      .catch((err) => {
        toast.error("Failed to add category!!", TOAST_PROP);
      });
  };

  const handleDelete = (id) => {
    toast
      .promise(
        deleteCategory(id),
        {
          pending: "Removing...",
          success: "Category removed successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        const newArr = categories.filter((category) => category.id !== id);
        setCategories(newArr);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to remove category!!", TOAST_PROP);
      });
  };

  const handleEdit = (id) => {
    getSingleCategory(id).then((res) => {
      setIputVal({ name: res.data.name, description: res.data.description });
    });
    toast
      .promise(
        updateCategory(id, inputVal),
        {
          pending: "Updating...",
          success: "Category updated successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        loadAllCategories();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update category!!", TOAST_PROP);
      });
  };

  const clear = () =>
    setIputVal({
      name: "",
      description: "",
    });

  return (
    <div className="container">
      <h2 className="text-center text-primary my-3 fw-semibold text-uppercase">
        Add Category
      </h2>
      <Row className="m-0">
        <Col md={5} className="my-2">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Enter category name"
                value={inputVal.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Category Description</Form.Label>
              <Form.Control
                rows="6"
                as="textarea"
                name="description"
                placeholder="Enter category description"
                value={inputVal.description}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-end my-3">
              <Button variant="primary" type="submit">
                Add Category
              </Button>
            </div>
          </Form>
        </Col>

        {/*display all categories*/}
        <Col md={7} className="my-3">
          <Table>
            <thead>
              <tr className="text-center text-secondary">
                <th>Id</th>
                <th>Category</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="text-center text-capitalize">
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td className="d-flex justify-content-center gap-3">
                    <FiEdit
                      role="button"
                      size="1.4rem"
                      color="green"
                      onClick={() => handleEdit(category.id)}
                    />
                    <AiFillDelete
                      role="button"
                      size="1.4rem"
                      color="red"
                      onClick={() => handleDelete(category.id)}
                    />
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

export default AddCategory;
