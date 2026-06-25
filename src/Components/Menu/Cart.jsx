import React, { useState } from "react";
import axios from "axios";

const Cart = ({
  cart,
  increaseQty,
  decreaseQty,
  removeItem,
}) => {

  const [customerName, setCustomerName] =
    useState("");

  const [tableNumber, setTableNumber] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [successPopup, setSuccessPopup] =
    useState(false);

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // PLACE ORDER
  const placeOrder = async () => {

    if (!customerName || !tableNumber) {

      alert(
        "Please Enter Name & Table"
      );

      return;
    }

    if (cart.length === 0) {

      alert("Cart Empty");

      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/order",
        {
          customerName,
          tableNumber,
          items: cart,
          totalPrice,
        }
      );

      console.log(response.data);

      // SHOW POPUP
      setSuccessPopup(true);

      // CLEAR INPUTS
      setCustomerName("");
      setTableNumber("");

    } catch (error) {

      console.log(error);

      alert("Order Failed");

    } finally {

      setLoading(false);
    }
  };

  // CLOSE POPUP
  const closePopup = () => {

    setSuccessPopup(false);

    window.location.reload();
  };

  return (

    <>

      <div className="bg-white p-6 rounded-3xl shadow-2xl">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-red-700 mb-6">
          🛒 Your Cart
        </h2>

        {/* CUSTOMER DETAILS */}
        <div className="space-y-4 mb-6">

          <input
            type="text"
            placeholder="Enter Your Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            className="w-full border-2 border-red-200 rounded-xl px-4 py-3 outline-none focus:border-red-700"
          />

          <select
            value={tableNumber}
            onChange={(e) =>
              setTableNumber(e.target.value)
            }
            className="w-full border-2 border-red-200 rounded-xl px-4 py-3 outline-none focus:border-red-700"
          >

            <option value="">
              Select Table
            </option>

            <option value="T1">
              Table 1
            </option>

            <option value="T2">
              Table 2
            </option>

            <option value="T3">
              Table 3
            </option>

            <option value="T4">
              Table 4
            </option>

            <option value="T5">
              Table 5
            </option>

            <option value="VIP">
              VIP Table
            </option>

          </select>

        </div>

        {/* CART ITEMS */}
        {cart.length === 0 ? (

          <p className="text-gray-500">
            No Items Added
          </p>

        ) : (

          <>

            {cart.map((item) => (

              <div
                key={item.id}
                className="border-b py-4"
              >

                <div className="flex justify-between items-center">

                  {/* LEFT */}
                  <div>

                    <h3 className="font-bold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>

                  </div>

                  {/* RIGHT */}
                  <div className="flex gap-2 items-center">

                    <button
                      onClick={() =>
                        decreaseQty(item.id)
                      }
                      className="bg-gray-200 px-3 py-1 rounded-lg font-bold"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item.id)
                      }
                      className="bg-gray-200 px-3 py-1 rounded-lg font-bold"
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* REMOVE */}
                <button
                  onClick={() =>
                    removeItem(item.id)
                  }
                  className="text-red-600 mt-2 hover:underline"
                >
                  Remove
                </button>

              </div>
            ))}

            {/* TOTAL */}
            <div className="mt-6">

              <h2 className="text-2xl font-bold mb-4">
                Total: ₹{totalPrice}
              </h2>

              {/* ORDER BUTTON */}
              <button
                onClick={placeOrder}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-lg font-bold transition duration-300"
              >

                {loading
                  ? "Booking..."
                  : "Place Order"}

              </button>

            </div>

          </>
        )}

      </div>

      {/* SUCCESS POPUP */}
      {successPopup && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">

          <div className="bg-white w-[90%] max-w-md rounded-3xl p-8 text-center shadow-2xl scale-100 transition duration-300">

            {/* ICON */}
            <div className="text-7xl mb-4">
              🎉
            </div>

            {/* TITLE */}
            <h2 className="text-4xl font-extrabold text-green-600 mb-4">
              Order Confirmed!
            </h2>

            {/* MESSAGE */}
            <p className="text-gray-700 text-lg leading-8">

              Thank You For Ordering ❤️

              <br />

              Our Chef Is Preparing
              Your Delicious Food 🍽️

            </p>

            {/* WAIT TIME */}
            <div className="bg-orange-100 mt-6 p-5 rounded-2xl">

              <h3 className="text-2xl font-bold text-orange-700 mb-2">
                ⏳ Estimated Wait Time
              </h3>

              <p className="text-4xl font-extrabold text-red-700">
                15 - 20 Min
              </p>

            </div>

            {/* FOOTER */}
            <p className="mt-6 text-gray-500 text-sm mb-6">

              Please Relax & Enjoy
              Your Royal Experience ✨

            </p>

            {/* OK BUTTON */}
            <button
              onClick={closePopup}
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-2xl text-lg font-bold transition duration-300 shadow-lg"
            >
              OK
            </button>

          </div>

        </div>
      )}

    </>
  );
};

export default Cart;