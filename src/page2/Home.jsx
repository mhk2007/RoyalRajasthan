import React from "react";


const Home = () => {

  return (
    

    

    <div
      className="h-screen bg-cover bg-center flex items-center justify-center text-white relative"
      style={{
        backgroundImage: "url('/hero.webp')",
      }}
    >

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CONTENT */}
      <div className="relative text-center px-6">

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Taste the Royal Flavours
          <br />
          of Rajasthan
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-8">
          Experience authentic Rajasthani food
          with royal hospitality and traditional
          flavors served with love.
        </p>

      </div>

    </div>
  );
};

export default Home;