import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";

const MainRouts = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
};

export default MainRouts;
