import React from "react";

const Story = () => {
  return (
    <div className="py-20 px-6 bg-gradient-to-r from-yellow-50 to-orange-100">

      <div className="max-w-3xl mx-auto text-center">

        <h2 className="text-4xl font-extrabold mb-6 text-red-900">
          📖 Our Story
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Born in the heart of Rajasthan, our journey started with a simple
          dream — to bring the royal flavors of traditional Rajasthani cuisine
          to every plate.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Every dish we serve carries the essence of heritage, love, and
          authenticity. From slow-cooked curries to rich spices, we preserve
          the true royal taste of Rajasthan.
        </p>

        {/* Decorative line */}
        <div className="w-24 h-1 bg-red-900 mx-auto mt-6 rounded"></div>

      </div>

    </div>
  );
};

export default Story;