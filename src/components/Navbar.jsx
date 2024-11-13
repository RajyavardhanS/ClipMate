import React, { useState, useEffect } from "react";
import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onThemeToggle }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    onThemeToggle(newTheme);
  };

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/');
    setIsOpen(false);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("bg-black", "text-white");
      document.body.classList.remove("bg-white", "text-black");
    } else {
      document.body.classList.add("bg-white", "text-black");
      document.body.classList.remove("bg-black", "text-white");
    }
  }, [theme]);

  return (
    <div className="relative">
      {/* Main Navbar */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={handleClick}
            className="text-white font-medium text-xl cursor-pointer"
          >
            ClipMate
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 flex-grow justify-center">
            {NavbarData.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold text-xl"
                    : "text-white font-medium text-xl hover:text-blue-300"
                }
              >
                {link.title}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-white p-2 rounded-md"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <FaMoon className="text-xl" />
              ) : (
                <FaSun className="text-xl" />
              )}
            </button>

            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            {NavbarData.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 ${
                    isActive
                      ? "text-blue-500 font-semibold bg-gray-700"
                      : "text-white hover:bg-gray-700"
                  }`
                }
              >
                {link.title}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;