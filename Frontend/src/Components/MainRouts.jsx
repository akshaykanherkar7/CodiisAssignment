import React from "react";
import { Route, Routes } from "react-router-dom";
import RequiredAuth from "../hoc/RequiredAuth";
import Admin from "../Pages/Admin";
import Customer from "../Pages/Customer";
import CVideo from "../Pages/CVideo";
import HomePage from "../Pages/HomePage";
import Plan from "../Pages/Plan";

const MainRouts = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/admin"
          element={
            <RequiredAuth>
              <Admin></Admin>
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/customer"
          element={
            <RequiredAuth>
              <Customer></Customer>
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/plan"
          element={
            <RequiredAuth>
              <Plan />
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/cvideo"
          element={
            <RequiredAuth>
              <CVideo />
            </RequiredAuth>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default MainRouts;
