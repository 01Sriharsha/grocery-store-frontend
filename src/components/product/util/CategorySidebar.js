import { useEffect } from "react";
import { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { AiOutlineMenu } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  getAllCategories,
  getAllProductsBySubCategory,
  getAllSubCategoriesByCategory,
} from "../../../api/AdminService";

export default function FilterSidebar({ setProducts }){
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
        {categories.map((category, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-center gap-2 mt-1"
          >
            <Link to="/">
              {open && <BiCategoryAlt size="1.3rem" color="black" />}
            </Link>

            {!open && (
              <Accordion defaultActiveKey={""} className="w-100">
                <Accordion.Item eventKey={index}>
                  <Accordion.Header>
                    <span className="text-capitalize">{category.name}</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <SubCategory
                      categoryId={category.id}
                      setProducts={setProducts}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </div>
        ))}
      </Card.Body>

      <Card.Footer></Card.Footer>
    </Card>
  );
};

function SubCategory({ categoryId, setProducts }) {
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
          style={{cursor: "pointer" }}
          onClick={() => setSubcategoryId(subcategory.id)}
        >
          {subcategory.name}
        </p>
      ))}
    </>
  );
}
