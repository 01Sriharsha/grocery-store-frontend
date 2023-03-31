import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SidebarLayout from "../../../utils/Sidebar";

const AdminDashboard = () => {
  return (
    <Row className="m-0">
      <Col md={12} className="d-flex">
        <SidebarLayout />
        <Container>
          <Outlet />
        </Container>
      </Col>
    </Row>
  );
};

export default AdminDashboard;
