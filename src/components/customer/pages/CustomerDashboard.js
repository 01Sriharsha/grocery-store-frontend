import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import MyAccount from "./MyAccount";
import { CustomContext } from "../../../context/AuthContext";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Logout from "../../authentication/Logout";

const CustomerDashboard = () => {
  const { user } = CustomContext();

  const { pathname } = useLocation();

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <div className="account-bg">
      <Container fluid>
        <Row className="mx-0">
          <Col md={4} className="h-100">
            <Card style={{ minHeight: "100vh" }} className="">
              <Card.Header className="text-capitalize fs-4 text-center text-primary">
                Welcome {user.name}
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroupItem
                    as={Link}
                    to="/customer/account"
                    active={
                      pathname === "/customer/account" ||
                      pathname === "/customer"
                    }
                  >
                    My Account
                  </ListGroupItem>

                  <ListGroupItem
                    as={Link}
                    to="/customer/orders"
                    active={pathname === "/customer/orders"}
                  >
                    My Orders
                  </ListGroupItem>

                  <ListGroupItem
                    role="button"
                    className="d-flex align-items-center gap-1"
                    onClick={toggle}
                  >
                    <BiLogOut />
                    <span>Logout</span>
                  </ListGroupItem>
                  <Logout show={show} toggle={toggle} />
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            {pathname === "/customer" ? <MyAccount /> : <Outlet />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerDashboard;
