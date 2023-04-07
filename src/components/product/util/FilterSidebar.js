import { useEffect } from "react";
import { useState } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import {
  getAllCategories,
  getAllProductsBySubCategory,
  getAllSubCategoriesByCategory,
} from "../../../api/AdminService";
import { ProductContextApi } from "../../../context/ProductContext";

export default function FilterSidebar() {
  const { setReset } = ProductContextApi();

  const [categories, setcategories] = useState([]);

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    getAllCategories()
      .then((res) => setcategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card className={`rounded-0 ${!open ? "sidebar" : "close-sidebar"}`}>
      <Card.Header
        className={`rounded-0 d-flex align-items-center
        ${!open ? "justify-content-between" : "justify-content-center"}`}
      >
        <span className={`fs-4 ${!open ? "active" : "disable"}`}>Filter</span>
        <AiOutlineMenu
          role="button"
          size={"1.3rem"}
          color="red"
          onClick={toggle}
        />
      </Card.Header>
      <Card.Body>
        {open && (
          <div
            className="d-flex flex-column w-100 align-items-center fw-bold"
            style={{ cursor: "pointer" }}
            onClick={toggle}
          >
            <p>F</p>
            <p>I</p>
            <p>L</p>
            <p>T</p>
            <p>E</p>
            <p>R</p>
          </div>
        )}

        {categories.map((category, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-center gap-2 mt-1"
          >
            {!open && (
              <Accordion defaultActiveKey={""} className="w-100">
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                    <span className="text-capitalize">{category.name}</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <SubCategory categoryId={category.id} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </div>
        ))}
      </Card.Body>

      <Card.Footer className="d-flex justify-content-end">
        {!open && (
          <Button
            size="sm"
            className="text-end m-0"
            // style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setReset(true)}
          >
            Reset All Filters
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}

function SubCategory({ categoryId }) {
  const { setProducts } = ProductContextApi();

  const [subCategories, setSubcategories] = useState([]);

  const [subCategoryId, setSubcategoryId] = useState("");

  useEffect(() => {
    categoryId &&
      getAllSubCategoriesByCategory(categoryId)
        .then((res) => setSubcategories(res.data))
        .catch((err) => console.log(err));
  }, [categoryId]);

  useEffect(() => {
    subCategoryId &&
      getAllProductsBySubCategory(subCategoryId)
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
  }, [subCategoryId]);

  return (
    <>
      {subCategories.map((subcategory) => (
        <p
          key={subcategory.id}
          className="text-capitalize"
          style={{ cursor: "pointer" }}
          onClick={() => setSubcategoryId(subcategory.id)}
        >
          {subcategory.name}
        </p>
      ))}
    </>
  );
}
