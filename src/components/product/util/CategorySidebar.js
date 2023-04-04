import { useState } from "react";
import { Card } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";

const CategorySidebar = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <Card className={`rounded-0 ${!open ? "sidebar" : "close-sidebar"}`}>
      <Card.Header
        className={`rounded-0 d-flex align-items-center
        ${!open ? "justify-content-between" : "justify-content-center"}`}
      >
        <span className={`${!open ? "active" : "disable"}`}>Category</span>
        <AiOutlineMenu
          role="button"
          size={"1.3rem"}
          color="red"
          onClick={toggle}
        />
      </Card.Header>
      <Card.Body>
        <div>
          
        </div>
      </Card.Body>

      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default CategorySidebar;
