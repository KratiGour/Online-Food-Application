import React, { createContext, useState, useEffect } from "react";
import { addToCart, removeQtyFromCart, getCartData } from "../../Service/CartService";
import axios from "axios";


export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodList, setFoodList] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      loadCartData();
    } else {
      setQuantities({});
    }
  }, [token]);

  const handleAuthError = () => {
    alert("Session expired or invalid. Please login again.");
    setToken("");
    localStorage.removeItem("token");
  };

  const increaseQty = async (foodId) => {
    try {
      await addToCart(foodId, token);
      setQuantities((prev) => ({
        ...prev,
        [foodId]: (prev[foodId] || 0) + 1,
      }));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        handleAuthError();
      } else {
        console.error("Failed to increase quantity:", error);
      }
    }
  };

  const decreaseQty = async (foodId) => {
    try {
      const updatedItems = await removeQtyFromCart(foodId, token);
      setQuantities(updatedItems);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        handleAuthError();
      } else {
        console.error("Failed to decrease quantity:", error);
      }
    }
  };

  const loadCartData = async () => {
    try {
      const items = await getCartData(token);
      setQuantities(items);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        handleAuthError();
      } else {
        console.error("Failed to load cart data:", error);
      }
    }
  };

  const removeFromCart = async (foodId) => {
    try {
      await axios.post(
        "http://localhost:8080/api/cart/remove",
        { foodId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      await loadCartData();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        handleAuthError();
      } else {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/foods");
      setFoodList(response.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  const contextValue = {
    foodList,
    quantities,
    increaseQty,
    decreaseQty,
    removeFromCart,
    token,
    setToken,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};