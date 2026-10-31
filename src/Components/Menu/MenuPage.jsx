import React from "react";
import Menu from "./Menu";
import Navbar from "../Navbar";
import Footer from "../Footer";

const MenuPage = () => {
  return (
    <>
      <Navbar />

      <div className="pt-24">
        <Menu />
      </div>
      <Footer/>
    </>
  );
};

export default MenuPage;

