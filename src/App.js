import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ManageCategory from "./components/admin/pages/ManageCategory";
import ManageSubCategory from "./components/admin/pages/ManageSubCategory.js";
import AdminDashboard from "./components/admin/pages/AdminDashboard";
import ManageCustomers from "./components/admin/pages/ManageCustomers";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/home/Home";
import Header from "./components/layout/Header";
import AuthContext, { CustomContext } from "./context/AuthContext";
import AddProduct from "./components/admin/pages/AddProduct";
import ProductGallery from "./components/product/pages/ProductGallery";
import ProductContext from "./context/ProductContext";

export const TOAST_PROP = { position: "top-center", hideProgressBar: true };

function AuthenticatedRoute({ children }) {
  const context = CustomContext();
  if (context?.isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

const App = () => {
  return (
    <BrowserRouter>
      <ProSidebarProvider>
        <AuthContext>
          <ProductContext>
            <ToastContainer />
            <Header />
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductGallery />} />

              <Route element={<AuthenticatedRoute />}>
                <Route path="admin" element={<AdminDashboard />}>
                  <Route path="add-category" element={<ManageCategory />} />
                  <Route
                    path="add-subcategory"
                    element={<ManageSubCategory />}
                  />
                  <Route
                    path="manage-customers"
                    element={<ManageCustomers />}
                  />
                  <Route path="add-product" element={<AddProduct />} />
                </Route>
              </Route>
            </Routes>
          </ProductContext>
        </AuthContext>
      </ProSidebarProvider>
    </BrowserRouter>
  );
};

export default App;
