import React from "react";
import Shein from "../_components/Shein";
import Items from "../_components/Items";
import Footer from "../_components/Footer";
import Nav from "../_components/Nav";
import Cards from "../_components/Cards";

const shop = () => {
  return (
    <div className="bg-seventy to-seventy min-h-screen">
      <Nav />
      <div>
        <Shein />
        <Cards />
        <Items home={false} category="Top Picks" />
        <Items home={false} category="Accessories" />
        <Items home={false} category="Clothes" />
        <Items home={false} category="Shoes" />
        <Items home={false} category="Tops" />
        <Items home={false} category="Cosomos" />
        <Items home={false} category="Bags" />
        <Items home={false} category="Othes" />
      </div>
      <Footer />
    </div>
  );
};

export default shop;
