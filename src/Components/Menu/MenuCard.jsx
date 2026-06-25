import React from "react";
import { Star } from "lucide-react";

const MenuCard = ({ dish, addToCart }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <img
        src={dish.img}
        alt={dish.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <div className="flex justify-between items-center mb-2">

          <h2 className="text-xl font-bold">
            {dish.name}
          </h2>

          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={18} fill="gold" />
            {dish.rating}
          </div>

        </div>

        <p className="text-red-700 font-semibold mb-4">
          {dish.category}
        </p>

        <div className="flex justify-between items-center">

          <span className="text-2xl font-bold text-red-700">
            ₹{dish.price}
          </span>

          <button
            onClick={() => addToCart(dish)}
            className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-full"
          >
            Order
          </button>

        </div>
      </div>
    </div>
  );
};

export default MenuCard;  