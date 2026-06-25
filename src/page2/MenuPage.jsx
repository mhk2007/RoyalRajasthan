import React from "react";
import Menu from "../Components/Menu/Menu";
import Navbar from "../Components/Navbar";

const MenuPage = () => {
  return (
    <>
      <Navbar />

      <div className="pt-24">
        <Menu />
      </div>
    </>
  );
};

export default MenuPage;

