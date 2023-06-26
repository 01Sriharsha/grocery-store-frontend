import { Button, Card, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { deleteCustomer, getAllCustomers } from "../../../api/customerService";
import { toast } from "react-toastify";
import { TOAST_PROP } from "../../../App";

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getAllCustomers()
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (customer) => {
    toast
      .promise(
        deleteCustomer(customer.id),
        {
          pending: "Deleting....",
          success: "Customer profile deleted successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        const newArr = customers.filter((c) => c.id !== customer.id);
        setCustomers(newArr);
      })
      .catch((err) => {
        toast.error("Failed to delete customer account!!", TOAST_PROP);
      });
  };

  return (
    <div className="p-3">
      <h3 className="text-center text-primary">Manage Customers</h3>
      <hr />
      <Row md={2} className="m-0 w-100">
        {customers.map((customer, index) => (
          <Col className="my-2" key={index}>
            <Card key={index} className="shadow bg-light">
              <Card.Body className="text-capitalize">
                <Row className="my-2">
                  <Col xs={3} className="fw-semibold text-warning">
                    Name :{" "}
                  </Col>
                  <Col xs={9}>{customer.name}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3} className="fw-semibold text-warning">
                    Email :{" "}
                  </Col>
                  <Col xs={9} className="text-lowercase">
                    {customer.email}
                  </Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3} className="fw-semibold text-warning">
                    Phone :{" "}
                  </Col>
                  <Col xs={9}>{customer.phone}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3} className="fw-semibold text-warning">
                    Address :{" "}
                  </Col>
                  <Col xs={9}>{customer.address}</Col>
                </Row>
                <Row className="my-2">
                  <Col xs={3} className="fw-semibold text-warning">
                    City :{" "}
                  </Col>
                  <Col xs={9}>{customer.city}</Col>
                </Row>
              </Card.Body>
              <div className="d-flex justify-content-end pb-3 px-3">
                <Button size="sm" variant="danger" onClick={() => handleDelete(customer)}>
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ManageCustomers;
