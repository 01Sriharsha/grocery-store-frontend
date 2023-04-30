import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import { CustomContext } from "../../context/AuthContext";
import { BiLogIn } from "react-icons/bi";
import { Badge } from "react-bootstrap";
import { ProductContextApi } from "../../context/ProductContext";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const context = CustomContext();

  const { cartItems } = ProductContextApi();

  const totalQuantity = cartItems?.reduce((quantity, item) => {
    return item.quantity + quantity;
  }, 0);

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
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/cart">
              <IoCartSharp
                role="button"
                size={"1.8rem"}
                className="text-primary"
              />
              <Badge pill bg="primary" size="sm">
                {totalQuantity}
              </Badge>
            </Nav.Link>
            {context.isAuthenticated ? (
              <Nav.Link
                as={Link}
                to={context.user === "admin" ? "/admin" : "/customer"}
                className="d-flex justify-content-center align-items-center gap-1"
              >
                <CgProfile size="1.5rem" className="text-primary" />
                <span className="text-capitalize">
                  {context.user.name || context.user}
                </span>
              </Nav.Link>
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
