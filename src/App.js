import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/authentication/Login";
import Home from "./components/home/Home";
import Header from "./components/layout/Header";
import AuthContext from "./context/AuthContext";

export const TOAST_PROP = { position: "top-center", hideProgressBar: true };

const App = () => {
  return (
    <BrowserRouter>
      <AuthContext>
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContext>
    </BrowserRouter>
  );
};

export default App;
