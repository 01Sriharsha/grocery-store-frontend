import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { CustomContext } from "../../context/AuthContext";
import Logout from "../authentication/Logout";

const ProfileDropdown = () => {
  const { user } = CustomContext();

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <Dropdown drop="center">
      <Dropdown.Toggle
        variant="light"
        className="d-flex align-items-center p-1"
      >
        <CgProfile size="1.5rem" className="text-primary" />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Item as={Link} to="/customer/account">
          My Account
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/customer/orders">
          My Orders
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/customer/orders">
         My Feedbacks
        </Dropdown.Item>
        <Dropdown.Item as="div" onClick={toggle}>
          Logout
        </Dropdown.Item>
        <Logout show={show} toggle={toggle} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
