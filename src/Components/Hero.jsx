import React from "react";

const Hero = () => {

  const scrollToMenu = () => {

    document
      .getElementById("menu")
      ?.scrollIntoView({
        behavior: "smooth",
      });

  };

  return (

    <div id="home"
      className="h-screen bg-cover bg-center flex items-center justify-center text-white relative"
      style={{
        backgroundImage: "url('/hero.webp')",
      }}
    >

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CONTENT */}
      <div className="relative text-center px-6">

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Taste the Royal Flavours
          <br />
          of Rajasthan
        </h1>

        <p className="text-lg md:text-xl mb-6 text-gray-200">
          Experience authentic Rajasthani food with royal hospitality
        </p>

        <button
          onClick={scrollToMenu}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-bold transition duration-300 shadow-lg"
        >
          Explore Menu
        </button>

      </div>

    </div>
  );
};

export default Hero;