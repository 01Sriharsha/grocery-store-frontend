import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "bootswatch/dist/simplex/bootstrap.min.css";
import "../node_modules/react-toastify/dist/ReactToastify.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
