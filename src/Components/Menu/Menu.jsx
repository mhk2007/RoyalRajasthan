import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

import MenuCard from "./MenuCard";
import Cart from "./Cart";
import menuData from "./MenuData";

const categories = [
  "All",
  "Main Course",
  "Starters",
  "Fast Food",
  "Drinks",
  "Shakes",
  "Ice Cream",
  "Cold Sweet",
  "Sweets",
];

const Menu = () => {

  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);

  // =========================
  // FILTER DISHES
  // =========================

  const filteredDishes = menuData.filter((dish) => {

    const categoryMatch =
      category === "All"
        ? true
        : dish.category
            ?.trim()
            .toLowerCase() ===
          category
            .trim()
            .toLowerCase();

    const searchMatch =
      dish.name
        ?.trim()
        .toLowerCase()
        .includes(
          search
            .trim()
            .toLowerCase()
        );

    return categoryMatch && searchMatch;

  });

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (dish) => {

    const existingItem =
      cart.find((item) => item.id === dish.id);

    if (existingItem) {

      setCart(
        cart.map((item) =>
          item.id === dish.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...dish,
          quantity: 1,
        },
      ]);

    }
  };

  // =========================
  // INCREASE QTY
  // =========================

  const increaseQty = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // =========================
  // DECREASE QTY
  // =========================

  const decreaseQty = (id) => {

    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // =========================
  // REMOVE ITEM
  // =========================

  const removeItem = (id) => {

    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 py-16 px-6">

      {/* HEADER */}
      <div className="text-center mb-10">

        <h1 className="text-5xl font-extrabold text-red-900 mb-4">
          👑 Royal Rajasthani Restaurant
        </h1>

        <p className="text-lg text-gray-700">
          Delicious Food • Drinks • Sweets • Ice Cream
        </p>

      </div>

      {/* SEARCH */}
      <div className="max-w-2xl mx-auto mb-8">

        <input
          type="text"
          placeholder="Search your favorite food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-6 py-4 rounded-2xl border-2 border-red-200 outline-none focus:border-red-600 shadow-lg"
        />

      </div>

      {/* CATEGORY BUTTONS */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">

        {categories.map((cat) => (

          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-3 rounded-full font-bold transition duration-300 shadow-md ${
              category === cat
                ? "bg-red-700 text-white scale-105"
                : "bg-white text-red-700 hover:bg-red-100"
            }`}
          >

            {cat}

          </button>

        ))}

      </div>

      {/* MENU GRID */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {filteredDishes.length > 0 ? (

          filteredDishes.map((dish) => (

            <MenuCard
              key={dish.id}
              dish={dish}
              addToCart={addToCart}
            />

          ))

        ) : (

          <div className="col-span-full text-center">

            <h2 className="text-3xl font-bold text-red-700">
              No Dish Found 🍽️
            </h2>

          </div>

        )}

      </div>

      {/* CART BUTTON */}
      <button
        onClick={() => setShowCart(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-red-700 to-orange-500 hover:scale-105 text-white px-5 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 transition duration-300"
      >

        <div className="relative">

          <ShoppingCart size={28} />

          {/* COUNT */}
          <span className="absolute -top-3 -right-3 bg-yellow-300 text-red-800 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            {cart.length}
          </span>

        </div>

        <div>

          <h3 className="font-bold">
            Cart
          </h3>

          <p className="text-xs">
            View Orders
          </p>

        </div>

      </button>

      {/* CART SIDEBAR */}
      {showCart && (

        <div className="fixed top-0 right-0 w-full sm:w-[420px] h-screen bg-white shadow-2xl z-50 overflow-y-auto p-5">

          {/* TOP */}
          <div className="flex justify-between items-center mb-6">

            <h2 className="text-3xl font-bold text-red-700">
              🛒 Your Cart
            </h2>

            <button
              onClick={() => setShowCart(false)}
              className="text-4xl font-bold text-red-700"
            >
              ×
            </button>

          </div>

          {/* CART */}
          <Cart
            cart={cart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeItem={removeItem}
          />

        </div>

      )}

    </div>
  );
};

export default Menu;