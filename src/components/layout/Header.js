import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import { CustomContext } from "../../context/AuthContext";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useState } from "react";
import Logout from "../authentication/Logout";
import { Badge } from "react-bootstrap";
import { ProductContextApi } from "../../context/ProductContext";

const Header = () => {
  const context = CustomContext();

  const productContext = ProductContextApi();

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <Navbar bg="light" expand="md" className="shadow" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-primary fw-semibold">
          Grocery Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Contact Us
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>
            {context.isAuthenticated && (
              <Nav.Link as={Link} to="/admin">
                Dashboard
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/cart">
              <IoCartSharp
                role="button"
                size={"1.8rem"}
                className="text-primary"
              />
              <Badge pill bg="primary" size="sm">
                {productContext.itemCount}
              </Badge>
            </Nav.Link>
            {context.isAuthenticated ? (
              <>
                <Nav.Link
                  role="button"
                  as="span"
                  onClick={toggle}
                  className="d-flex justify-content-center align-items-center"
                >
                  <span>Logout</span>
                  <BiLogOut />
                </Nav.Link>
                <Logout show={show} toggle={toggle} />
              </>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="d-flex justify-content-center align-items-center"
              >
                <span>Login</span>
                <BiLogIn size="1.2rem" />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
