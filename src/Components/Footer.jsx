import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            🍽️ Royal Restaurant
          </h2>
          <p className="text-gray-400 text-sm">
            Serving delicious food with love and passion.  
            Experience the best taste and cozy dining atmosphere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#about" className="hover:text-yellow-400">About</a></li>
            <li><a href="#booking" className="hover:text-yellow-400">Booking</a></li>
            <li><a href="#contact" className="hover:text-yellow-400">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-gray-400 text-sm">📞 +91 98765 43210</p>
          <p className="text-gray-400 text-sm">📧 info@restaurant.com</p>
          <p className="text-gray-400 text-sm">📍 Delhi, India</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Royal Restaurant. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;