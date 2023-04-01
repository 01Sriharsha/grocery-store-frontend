import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/customerService";
import { TOAST_PROP } from "../App";

const Context = createContext();

export const CustomContext = () => useContext(Context);

const AuthContext = ({ children }) => {
  const navigate = useNavigate();

  const {pathname} = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    onPageRefresh();
  }, []);

  const onPageRefresh = () => {
    if (!localStorage.getItem("user")) {
      setIsAuthenticated(false);
      setUser(null);
    } else {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem("user")));
      navigate(pathname)
    }
  };

  const login = (userData) => {
    toast
      .promise(
        loginUser(userData),
        {
          pending: "Logging in...",
          success: "Logged in successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setIsAuthenticated(true);
        setUser(JSON.parse(localStorage.getItem("user")));
        navigate(res.data === "admin" ? "/admin" : "/customer");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err.response.data ? err.response.data : "Failed to login",
          TOAST_PROP
        );
      });
  };

  const logout = () => {
    console.log("logout");
    localStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/");
    toast.info("You are logged out!!", TOAST_PROP);
  };

  return (
    <Context.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </Context.Provider>
  );
};

export default AuthContext;
