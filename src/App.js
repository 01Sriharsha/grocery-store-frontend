import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddCategory from "./components/admin/pages/AddCategory";
import AddSubCategory from "./components/admin/pages/AddSubCategory";
import AdminDashboard from "./components/admin/pages/AdminDashboard";
import ManageCustomers from "./components/admin/pages/ManageCustomers";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/home/Home";
import Header from "./components/layout/Header";
import AuthContext from "./context/AuthContext";

export const TOAST_PROP = { position: "top-center", hideProgressBar: true };

const App = () => {
  return (
    <BrowserRouter>
    <ProSidebarProvider>
      <AuthContext>
        <ToastContainer />
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="add-category" element={<AddCategory />} />
            <Route path="add-subcategory" element={<AddSubCategory />} />
            <Route path="manage-customers" element={<ManageCustomers />} />
          </Route>

        </Routes>
      </AuthContext>
      </ProSidebarProvider>
    </BrowserRouter>
  );
};

export default App;
