import React from "react";

const Culture = () => {
  return (
    <div className="bg-white px-6 py-10">

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row">

        {/* IMAGE */}
        <img
          src="/culture.png"
          alt="Rajasthani Culture"
          className="h-auto w-full rounded-2xl shadow-lg md:w-1/2"
        />

        {/* TEXT */}
        <div className="text-center md:text-left">

          <h2 className="text-4xl font-extrabold mb-4 text-red-900">
            🎭 Rajasthani Culture
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Rajasthan is known for its vibrant culture, traditional dances,
            colorful festivals, and royal heritage. From the deserts of Jaisalmer
            to the palaces of Jaipur, every corner tells a royal story.
          </p>

          <p className="text-gray-600">
            Experience folk music, Ghoomar dance, and rich traditions that make
            Rajasthan truly magical.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Culture;
