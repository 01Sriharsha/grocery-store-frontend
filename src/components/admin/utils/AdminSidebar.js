import { useEffect, useState } from "react";
import { BiCategory, BiLogOut, BiMenu } from "react-icons/bi";
import { MdCategory, MdOutlineManageAccounts } from "react-icons/md";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Logout from "../../authentication/Logout";
import { CgProductHunt } from "react-icons/cg";

const AdminSidebar = () => {
  const { collapsed, collapseSidebar } = useProSidebar();

  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  console.log(collapsed);

  return (
    <div
      id="sidebar"
      style={{
        display: "flex",
        height: "100vh",
        zIndex: 1,
      }}
    >
      <Sidebar style={{ display: "flex" }} breakPoint="xs">
        <Menu className="" style={{ height: "100%" }}>
          <MenuItem
            icon={<BiMenu size="1.6rem" />}
            onClick={() => collapseSidebar()}
            className="text-center"
          >
            <h3 className="text-primary">Admin</h3>
          </MenuItem>
          <MenuItem
            icon={<BiCategory />}
            component={<Link to="/admin/add-category" />}
          >
            Manage Category
          </MenuItem>
          <MenuItem
            icon={<MdCategory />}
            component={<Link to="/admin/add-subcategory" />}
          >
            Manage Sub Category
          </MenuItem>
          <MenuItem
            icon={<MdOutlineManageAccounts />}
            component={<Link to="/admin/manage-customers" />}
          >
            Manage Customers
          </MenuItem>
          <MenuItem
            icon={<CgProductHunt />}
            component={<Link to="/admin/add-product" />}
          >
            Add Product
          </MenuItem>
          <MenuItem icon={<BiLogOut />} onClick={toggle}>
            <span>Logout</span>
            <Logout show={show} toggle={toggle} />
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
