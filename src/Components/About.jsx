import React from "react";

const About = () => {
  return (
    <div id="about" className="bg-gray-100 py-12 md:py-16">

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 md:grid-cols-2">

        {/* Image */}
        <div>
          <img
            // src="public/about.jpg"
            src="/about.jpg"
            alt="restaurant"
            className="h-[300px] w-full rounded-2xl object-cover shadow-xl"
          />
        </div>

        {/* Content */}
        <div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🍽️ About Our Restaurant
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Welcome to our restaurant, where every dish is crafted with passion
            and served with love. We bring you a perfect blend of traditional
            flavors and modern taste, creating an unforgettable dining experience.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Our chefs use only the freshest ingredients to prepare delicious meals
            that satisfy your cravings. From rich Indian spices to continental
            delights, every bite tells a story of quality and excellence.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Whether you're here for a family dinner, a romantic date, or a quick
            meal with friends, we promise a warm ambiance and exceptional service.
          </p>

          {/* Highlights */}
          <div className="mt-6 flex flex-wrap gap-4">

            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">
              Fresh Ingredients
            </span>

            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">
              Hygienic Kitchen
            </span>

            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">
              Fast Service
            </span>

            <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">
              Cozy Ambience
            </span>

          </div>

        </div>

      </div>
    </div>
  );
};

export default About;
