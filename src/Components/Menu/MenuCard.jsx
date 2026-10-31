import React from "react";
import { Star } from "lucide-react";

const MenuCard = ({ dish, addToCart }) => {
  return (
    <div className="flex h-[340px] w-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl transition duration-300 hover:shadow-2xl sm:h-[370px]">
      <button
        type="button"
        aria-label={`Preview ${dish.name} image on hover`}
        className="group h-44 w-full shrink-0 overflow-hidden sm:h-52"
      >
        <img
          src={dish.img}
          alt={dish.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </button>

      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h2 className="line-clamp-2 text-lg font-bold sm:text-xl">
            {dish.name}
          </h2>

          <div className="flex shrink-0 items-center gap-1 text-yellow-500">
            <Star size={18} fill="gold" />
            {dish.rating}
          </div>
        </div>

        <p className="mb-3 text-red-700 font-semibold">
          {dish.category}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-xl font-bold text-red-700 sm:text-2xl">
            ₹{dish.price}
          </span>

          <button
            onClick={() => addToCart(dish)}
            className="rounded-full bg-red-700 px-4 py-2 text-white hover:bg-red-800 sm:px-5"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;