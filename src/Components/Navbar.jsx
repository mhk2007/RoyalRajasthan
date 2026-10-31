
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUser");
    navigate("/");
  };

  const scrollToSection = (id) => {
    setMenuOpen(false);

    // Agar Home Page par hain
    if (location.pathname === "/home") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    // Agar Menu Page ya kisi aur page par hain
    navigate("/home");

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-red-900/80 backdrop-blur-md shadow-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">

        {/* LOGO */}
        <h1
          onClick={() => scrollToSection("home")}
          className="text-xl sm:text-2xl font-extrabold text-yellow-300 cursor-pointer"
        >
          Royal Rajasthan
        </h1>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden md:flex gap-8 text-white font-medium">

          <li
            onClick={() => scrollToSection("home")}
            className="cursor-pointer hover:text-yellow-300 transition"
          >
            Home
          </li>

          <li
            onClick={() => navigate("/menu")}
            className="cursor-pointer hover:text-yellow-300 transition"
          >
            Menu
          </li>

          <li
            onClick={() => navigate("/history")}
            className="cursor-pointer hover:text-yellow-300 transition"
          >
            History
          </li>

          <li
            onClick={() => scrollToSection("culture")}
            className="cursor-pointer hover:text-yellow-300 transition"
          >
            Culture
          </li>

          <li
            onClick={() => scrollToSection("gallery")}
            className="cursor-pointer hover:text-yellow-300 transition"
          >
            Gallery
          </li>

          <li
            onClick={() => scrollToSection("about")}
            className="cursor-pointer hover:text-yellow-300 transition"
          >
            About
          </li>

          <li
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer hover:text-yellow-300 transition"
          >
            Contact
          </li>

        </ul>

        {/* DESKTOP BOOK TABLE */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="rounded-full border border-yellow-400/70 px-4 py-2 text-sm font-semibold text-yellow-200 transition hover:bg-white/10"
          >
            Log out
          </button>
          <button
            onClick={() => scrollToSection("booking")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-full font-semibold transition"
          >
            Book Table
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl font-bold"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-red-900/95 border-t border-red-700">

          <ul className="flex flex-col gap-5 px-6 py-5 text-white font-medium">

            <li
              onClick={() => scrollToSection("home")}
              className="cursor-pointer hover:text-yellow-300 transition"
            >
              Home
            </li>

            <li
              onClick={() => {
                setMenuOpen(false);
                navigate("/menu");
              }}
              className="cursor-pointer hover:text-yellow-300 transition"
            >
              Menu
            </li>

            <li
              onClick={() => {
                setMenuOpen(false);
                navigate("/history");
              }}
              className="cursor-pointer hover:text-yellow-300 transition"
            >
              History
            </li>

            <li
              onClick={() => scrollToSection("culture")}
              className="cursor-pointer hover:text-yellow-300 transition"
            >
              Culture
            </li>

            <li
              onClick={() => scrollToSection("gallery")}
              className="cursor-pointer hover:text-yellow-300 transition"
            >
              Gallery
            </li>

            <li
              onClick={() => scrollToSection("about")}
              className="cursor-pointer hover:text-yellow-300 transition"
            >
              About
            </li>

            <li
              onClick={() => scrollToSection("contact")}
              className="cursor-pointer hover:text-yellow-300 transition"
            >
              Contact
            </li>

            <li>
              <button
                onClick={() => scrollToSection("booking")}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-3 rounded-full font-semibold transition"
              >
                Book Table
              </button>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="w-full rounded-full border border-yellow-400/70 px-5 py-3 font-semibold text-yellow-200 transition hover:bg-white/10"
              >
                Log out
              </button>
            </li>

          </ul>

        </div>
      )}

    </nav>
  );
};

export default Navbar;
