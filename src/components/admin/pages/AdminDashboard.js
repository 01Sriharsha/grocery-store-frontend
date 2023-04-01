import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useProSidebar } from "react-pro-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../utils/AdminSidebar";

const AdminDashboard = () => {
  const { pathname } = useLocation();

  const { collapsed, collapseSidebar } = useProSidebar();

  useEffect(() => {
    collapsed && collapseSidebar();
  }, [pathname === "/admin"]);

  return (
    <Row className={`m-0 ${pathname === "/admin" ? "admin-bg" : "admin-bg1"}`}>
      <Col md={12} className="d-flex p-0">
        <AdminSidebar />
        <Container>
          <Outlet />
        </Container>
      </Col>
    </Row>
  );
};

export default AdminDashboard;
