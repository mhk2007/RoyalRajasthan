import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Culture from "./Components/Culture";
import Gallery from "./Components/Gallery";
import Booking from "./Components/Booking/Booking";
import About from "./Components/About";
import Footer from "./Components/Footer";

import MenuPage from "./page2/MenuPage";

function HomePage() {

  return (
    <>
      <Navbar />

      <div id="home">
        <Hero />
      </div>

      {/* MENU SECTION */}
      <div className="py-20 text-center bg-orange-50">

        <h2 className="text-5xl font-extrabold text-red-800 mb-6">
          🍽️ Explore Our Royal Menu
        </h2>

        <p className="text-lg text-gray-700 mb-8">
          Discover Delicious Rajasthani Dishes
        </p>

        {/* <a
          href="/menu"
          className="bg-red-700 hover:bg-red-800 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl transition duration-300"
        >
          View Full Menu
        </a> */}

<Link
  to="/menu"
  className="bg-red-700 hover:bg-red-800 text-white px-10 py-4 rounded-full text-xl font-bold shadow-xl transition duration-300"
>
  View Full Menu
</Link>


      </div>

      <div id="culture">
        <Culture />
      </div>

      <div id="gallery">
        <Gallery />
      </div>

      <div id="booking">
        <Booking />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="contact">
        <Footer />
      </div>
    </>
  );
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/menu"
          element={<MenuPage />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;