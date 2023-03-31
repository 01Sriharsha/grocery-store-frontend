import React from "react";
import { Col, Row } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const { pathname } = useLocation();

  return (
    <Row className="m-0">
      {pathname === "/admin" ? (
        <Col md={12}>
          <h1>hello</h1>
        </Col>
      ) : (
        <Col md={12}>
          <Outlet />
        </Col>
      )}
    </Row>
  );
};

export default AdminDashboard;
