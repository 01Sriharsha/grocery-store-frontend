import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddCategory from "./components/admin/pages/AddCategory";
import AdminDashboard from "./components/admin/pages/AdminDashboard";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/home/Home";
import Header from "./components/layout/Header";
import AuthContext from "./context/AuthContext";

export const TOAST_PROP = { position: "top-center", hideProgressBar: true };

const App = () => {
  return (
    <BrowserRouter>
      <AuthContext>
        <ToastContainer />
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="add-category" element={<AddCategory />} />
          </Route>

        </Routes>
      </AuthContext>
    </BrowserRouter>
  );
};

export default App;
