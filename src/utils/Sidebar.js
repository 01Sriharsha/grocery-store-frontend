import { useEffect } from "react";
import { BiCategory, BiMenu } from "react-icons/bi";
import { MdCategory, MdOutlineManageAccounts } from "react-icons/md";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const SidebarLayout = () => {
  const { collapsed ,  collapseSidebar } = useProSidebar();

  useEffect(()=>{
    !collapsed && collapseSidebar()
  },[])

  console.log(collapsed);

  return (
    <div id="sidebar" style={{ display: "flex", height: "90vh"  , zIndex : 1}}>
      <Sidebar
        style={{ display: "flex", flexDirection: "row-reverse" }}
        breakPoint="xs"
      >
        <Menu>
          <MenuItem
            icon={<BiMenu size="1.6rem" />}
            onClick={() => collapseSidebar()}
            className="text-center"
          >
            <h3>Admin</h3>
          </MenuItem>
          <MenuItem
            icon={<BiCategory />}
            component={<Link to="/admin/add-category" />}
          >
            Add Category
          </MenuItem>
          <MenuItem
            icon={<MdCategory />}
            component={<Link to="/admin/add-subcategory" />}
          >
            Add Sub Category
          </MenuItem>
          <MenuItem
            icon={<MdOutlineManageAccounts />}
            component={<Link to="/admin/manage-customers" />}
          >
            Manage Customers
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarLayout;
