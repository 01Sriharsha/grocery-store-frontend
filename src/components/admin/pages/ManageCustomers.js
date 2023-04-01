import { Card, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAllCustomers } from "../../../api/customerService";

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getAllCustomers()
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, []);

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
              {/**
                   * <Card.Footer className="d-flex justify-content-end">
                  <Button variant="primary" size="sm" onClick={exportCustomers}>
                    Export CSV
                  </Button>
                </Card.Footer>
                   */}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ManageCustomers;
