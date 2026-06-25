import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    // Agar Home Page par hain
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    // Agar Menu Page ya kisi aur page par hain
    navigate("/");

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-red-900/80 backdrop-blur-md shadow-lg">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* LOGO */}
        <h1
          onClick={() => scrollToSection("home")}
          className="text-2xl font-extrabold text-yellow-300 cursor-pointer"
        >
          Royal Rajasthan
        </h1>

        {/* NAV LINKS */}
        <ul className="flex gap-8 text-white font-medium">

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

        {/* BOOK TABLE */}
        <button
          onClick={() => scrollToSection("booking")}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-full font-semibold transition"
        >
          Book Table
        </button>

      </div>

    </nav>
  );
};

export default Navbar;