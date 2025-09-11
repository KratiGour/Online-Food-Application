import React from "react";
import { Routes, Route } from "react-router-dom";

import Menubar from "./Components/Menubar/Menubar.jsx";
import Home from "./Pages/Home/Home.jsx";
import ContactUs from "./Pages/Context/Contact.jsx";
import ExploreFood from "./Pages/ExploreFood/ExploreFood.jsx";
import FoodDetails from "./Pages/FoodDetails/FoodDetails.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import { ToastContainer} from 'react-toastify';

const App = () => {
  return (
    <>
      <Menubar />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/explore" element={<ExploreFood />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
