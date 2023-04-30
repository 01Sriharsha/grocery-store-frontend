import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { deleteProduct, getAllProducts } from "../api/AdminService";
import {
  addOrUpdateCart,
  decrementCartItemQuantity,
  deleteAllCartItemsOfCustomer,
  deleteCartItem,
  getAllCartItemsByCustomerId,
} from "../api/customerService";
import { TOAST_PROP } from "../App";
import { CustomContext } from "./AuthContext";

const Context = createContext();

export const ProductContextApi = () => useContext(Context);

export default function ProductContext({ children }) {
  const context = CustomContext();

  const [products, setProducts] = useState([]);

  const [reset, setReset] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
    return () => setReset(false);
  }, [reset]);

  useEffect(() => {
    context.user !== "admin" &&
      getAllCartItemsByCustomerId(context.user?.id)
        .then((res) => setCartItems(res.data))
        .catch((err) => console.log(err));
    return () => setLoad(false);
  }, [context.user, load]);

  const IncrementItemQuantity = (product) => {
    // debugger;
    const itemExisted = cartItems.find((item) => item.id == product.id);
    if (!itemExisted) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    } else {
      setCartItems(
        cartItems.map((item) => {
          if (item.id == product.id) {
            return { ...product, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
    }
    context.user !== "admin" && addOrUpdateCart(context.user?.id, product.id);
    setLoad(true);
  };

  const decrementItemQuantity = (product) => {
    if (product.quantity <= 1) {
      context.user && removeCartItem(product.cartId);

      //for not a logged in user
      const arr = cartItems.filter((item) => item.id !== product.id);
      return setCartItems([...arr]);
    }

    if (product.quantity > 1) decrementCartItemQuantity(product.cartId);

    setCartItems(
      cartItems.map((item) => {
        if (item.quantity > 0 && item.id == product.id) {
          return { ...product, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const removeCartItem = (id) => {
    if (context.isAuthenticated && context.user !== "admin") {
      deleteCartItem(id)
        .then((res) => {
          const newArr = cartItems.filter((item) => {
            console.log(item);
            return item.cartId !== id;
          });
          setCartItems(newArr);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to remove cart item");
        });
    } else {
      //for not a logged in user
      const arr = cartItems.filter((item) => item.id !== id);
      return setCartItems([...arr]);
    }
  };

  const clearCart = () => {
    //make api call , only if the user is authenticated and not an admin
    if (context.isAuthenticated && context.user !== "admin") {
      return deleteAllCartItemsOfCustomer(context.user?.id);
    } else {
      return setCartItems([]);
    }
  };

  const handleDelete = (id) => {
    context.user==="admin" &&
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
    <Context.Provider
      value={{
        products,
        setProducts,
        handleDelete,
        setReset,
        IncrementItemQuantity,
        cartItems,
        decrementItemQuantity,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}
