import React from "react";

const Contact = () => {
  return (
    <div
      id="contact"
      className="py-20 flex justify-center items-center relative bg-pink-50"
    >

      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-pink-100 text-gray-800">

        <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">
          📞 Contact Us
        </h2>

        <div className="space-y-4 text-center text-lg">

          {/* Call */}
          <p>
            📞 Call:{" "}
            <a
              href="tel:+919876543210"
              className="text-pink-500 hover:underline"
            >
              +91 98765 43210
            </a>
          </p>

          {/* WhatsApp */}
          <p>
            💬 WhatsApp:{" "}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="text-green-500 hover:underline"
            >
              Chat with us
            </a>
          </p>

          {/* Location */}
          <p>
            📍 Location:{" "}
            <a
              href="https://www.google.com/maps/search/Your+Restaurant+Name+Delhi"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline"
            >
              View on Google Maps
            </a>
          </p>

        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          We are available from 10 AM to 11 PM
        </p>

      </div>
    </div>
  );
};

export default Contact;