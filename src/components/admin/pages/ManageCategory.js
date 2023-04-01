import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
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

const ManageCategory = () => {
  const [inputVal, setIputVal] = useState({
    name: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");

  const loadAllCategories = () =>
    getAllCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));

  const loadSingleCategory = (id) => {
    setCategoryId(id);
    getSingleCategory(id).then((res) => {
      setIputVal({ name: res.data.name, description: res.data.description });
    });
  };

  useEffect(() => {
    loadAllCategories();
  }, []);

  const handleChange = (event) => {
    setIputVal((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const validate = () => {
    if (inputVal.name.length === 0 || inputVal.description.length === 0) {
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
        categoryId
          ? updateCategory(categoryId, inputVal)
          : createCategory(inputVal),
        {
          pending: "Adding...",
          success: "Category added successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        loadAllCategories();
        clear();
        setCategoryId("");
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

  const clear = () =>
    setIputVal({
      name: "",
      description: "",
    });

  return (
    <div className="container">
      
      <Row className="m-0">
        <Col md={5} className="my-2">
          <Form onSubmit={handleSubmit}>
            <h4 className="text-center my-3 text-primary">Add Catgeory</h4>
            <hr />
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
                rows="4"
                as="textarea"
                name="description"
                placeholder="Enter category description"
                value={inputVal.description}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-end my-3">
              <Button variant="primary" type="submit">
                {categoryId ? "Update Category" : "Add Category"}
              </Button>
            </div>
          </Form>
        </Col>

        {/*display all categories*/}
        <Col md={7} className="my-2">
          <h4 className="text-center my-3 text-primary">Added Catgeories</h4>
          <hr />
          <Table responsive>
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
                  <td>
                    <textarea
                      disabled
                      rows="1"
                      value={category.description}
                      className="border-0 text-center"
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-4">
                      <FiEdit
                        role="button"
                        size="1.5rem"
                        color="green"
                        onClick={() => loadSingleCategory(category.id)}
                      />
                      <AiFillDelete
                        role="button"
                        size="1.5rem"
                        color="red"
                        onClick={() => handleDelete(category.id)}
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

export default ManageCategory;
