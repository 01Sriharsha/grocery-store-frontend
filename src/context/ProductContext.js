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
    getAllCartItemsByCustomerId(context.user?.id)
      .then((res) => setCartItems(res.data))
      .catch((err) => console.log(err));
    return () => setLoad(false);
  }, [context.user?.id, load]);

  const IncrementItemQuantity = (product) => {
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
    addOrUpdateCart(context.user?.id, product.id);
    setLoad(true);
  };

  const decrementItemQuantity = (product) => {
    if (product.quantity <= 1) removeCartItem(product.cartId);

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

  const removeCartItem = (cartItemID) => {
    deleteCartItem(cartItemID)
      .then((res) => {
        const newArr = cartItems.filter((item) => {
          console.log(item);
          return item.cartId !== cartItemID;
        });
        setCartItems(newArr);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to remove cart item");
      });
  };

  const clearCart = () => {
    toast
      .promise(
        deleteAllCartItemsOfCustomer(context.user?.id),
        {
          pending: "Clearing....",
          success: "Cart cleared successfully!!",
          error: "Failed to clear cart!!",
        },
        TOAST_PROP
      )
      .then(() => setCartItems([]));
  };

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
