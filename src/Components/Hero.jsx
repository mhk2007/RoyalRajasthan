import React from "react";

const Hero = () => {

  return (

    <div
      id="home"
      className="relative mt-16 w-full overflow-hidden text-white sm:mt-20"
    >

      {/* BACKGROUND IMAGE */}
      <img
        src="/hero.webp"
        alt="Royal Rajasthan"
        className="block h-auto w-full"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
        <div className="mx-auto w-full max-w-4xl text-center">

        <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
          Taste the Royal Flavours
          <br />
          of Rajasthan
        </h1>

        <p className="mx-auto mb-6 max-w-xl text-base leading-relaxed text-gray-200 sm:text-lg md:mb-8 md:text-xl">
          Experience authentic Rajasthani food with royal hospitality
        </p>

        </div>
      </div>

    </div>
  );
};

export default Hero;
