import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { deleteProduct, getAllProducts } from "../api/AdminService";
import { TOAST_PROP } from "../App";

const Context = createContext();

export const ProductContextApi = () => useContext(Context);

export default function ProductContext({ children }) {
  const [products, setProducts] = useState([]);

  const [reset, setReset] = useState(false);

  const [itemCount , setItemCount] = useState(0);

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
    return () => setReset(false);
  }, [reset]);

  const handleDelete = (id) => {
    toast
      .promise(
        deleteProduct(id),
        {
          pending: "Removing...",
          success: "Product removed successfully!!",
        },
        TOAST_PROP
      )
      .then((res) => {
        const newArr = products.filter((product) => product.id !== id);
        setProducts(newArr);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to remove the product!!", TOAST_PROP);
      });
  };

  return (
    <Context.Provider value={{ products, setProducts, handleDelete, setReset , itemCount , setItemCount }}>
      {children}
    </Context.Provider>
  );
}
