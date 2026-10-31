import React, { useState } from "react";
import axios from "axios";
import TableSelection from "./TableSelection";
import BookingForm from "./BookingForm";
import qrImg from "../../assets/pay.png";
import { apiUrl } from "../../api";

const getAccountEmail = () => {
  try {
    return JSON.parse(sessionStorage.getItem("authUser") || "null")?.email || "";
  } catch {
    return "";
  }
};

const Booking = () => {      
  const [tableType, setTableType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: getAccountEmail(),
    date: "",
    time: "",
    guests: "",
    request: "",
    mobile: ""
  });

  const [showQR, setShowQR] = useState(false);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAmount = () => {
    const guests = Number(formData.guests) || 1;
    const tables = Math.ceil(guests / 4);
    return tableType === "royal" ? tables * 100 : tables * 50;
  };

  const handleProceed = () => {
    if (!formData.name || !formData.email || !formData.mobile || !formData.date || !formData.time || !formData.guests) {
      setError("Please fill all fields ⚠️");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setError("Enter valid mobile number ❌");
      return;
    }

    setError("");
    setAmount(calculateAmount());
    setShowQR(true);
  };

  const handlePaymentDone = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(apiUrl("/api/booking"), {
        ...formData,
        tableType,
        amount,
        tables: Math.ceil((Number(formData.guests) || 1) / 4)
      });

      if (res.data.success) {
        setSuccess(true);
        setShowQR(false);

        setFormData({
          name: "",
          email: getAccountEmail(),
          date: "",
          time: "",
          guests: "",
          request: "",
          mobile: ""
        });

        setTableType("");

        setTimeout(() => setSuccess(false), 3000);
      }

    } catch (err) {
      console.log("❌ ERROR:", err);
      setError("Server Error ❌");
    }

    setLoading(false);
  };

  return (
    <div
      className="relative flex min-h-[80svh] items-center justify-center bg-cover bg-center sm:min-h-screen"
      style={{ backgroundImage: "url('/table.webp')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative mx-4 w-full max-w-[30rem] rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-lg sm:p-8">

        <h2 className="mb-4 text-center text-2xl font-bold text-yellow-400 sm:mb-6 sm:text-3xl">
          🍽️ Book a Table
        </h2>

        {success && (
          <div className="bg-green-200 text-green-800 p-2 mb-4 text-center rounded">
            Booking Confirmed 🎉
          </div>
        )}

        {error && (
          <div className="bg-red-200 text-red-800 p-2 mb-4 text-center rounded">
            {error}
          </div>
        )}

        {!tableType ? (
          <TableSelection setTableType={setTableType} />
        ) : (
          <BookingForm
            formData={formData}
            handleChange={handleChange}
            handleProceed={handleProceed}
            setFormData={setFormData}
            setTableType={setTableType}
          />
        )}

        {/* ✅ QR POPUP */}
        {showQR && (
          <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
            onClick={() => setShowQR(false)}
          >
            <div 
              className="bg-white p-5 rounded text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ❌ Close Button */}
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-2 right-2 text-black text-xl font-bold"
              >
                ✖
              </button>

              <h2 className="mb-2 font-semibold">Pay ₹{amount}</h2>

              <img
                src={qrImg}
                className="w-40 mx-auto"
                alt="QR Code"
              />

              <button
                onClick={handlePaymentDone}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 mt-3 rounded w-full"
              >
                {loading ? "Processing..." : "I Have Paid"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Booking;
