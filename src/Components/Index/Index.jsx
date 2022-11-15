import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "../Login/Login";
import FirstPage from "../Index/FirstPage"
import Cart from "../Cart/Cart";
import { useAuthState } from "../../Context/auth-context";
import Single from "../Single/Single";
import Shop from "../Shop/Shop";
import { useEffect } from "react";
import { useLocation } from "react-router"


export default function Index() {
  const { token } = useAuthState();

  return (
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to={"/dashboard"} />}
        />
        <Route
          path="/dashboard"
          element={token ? <Cart /> : <Navigate to={"/login"} />}
        />
        <Route path="/products/:id" element={<Single  />} />
        <Route path="/shop" element={<Shop  />} />
        <Route path="/" element={<FirstPage />} />
      </Routes>
  );
}
