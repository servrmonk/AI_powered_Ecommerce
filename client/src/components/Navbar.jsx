import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { IoMdContact } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { CgSearch } from "react-icons/cg";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query
  const modalRef = useRef(null); // Create ref for modal to detect clicks outside
  const buttonRef = useRef(null); // Create ref for contact button

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-slate-300 py-3  fixed top-0 w-full shadow-md z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* 0. Hamburger Icon for Mobile */}
        <button className="lg:hidden flex items-center" onClick={toggleMenu}>
          <FaBars className="text-2xl" />
        </button>
        {/* 1. Ecommerce Heading */}
        <div className="flex items-center">
          <NavLink className="text-2xl font-bold px-2" to="/">
            Ecommerce
          </NavLink>
        </div>

        {/* 2. Search Input & Button */}
        <div className="flex items-center flex-grow mx-4">
          <form className="flex items-center min-w-fit w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full min-w-40 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="button" // Since we're not submitting the form, we use type="button"
              className="ml-1 min-w-fit p-2.5 text-xl bg-indigo-500 text-white rounded-lg"
            >
              <CgSearch />
            </button>
          </form>
        </div>

        {/* 3. Navigation Links */}
        <div className="lg:flex hidden items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                className="text-lg font-semibold hover:text-indigo-600"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-lg font-semibold hover:text-indigo-600"
                to="/product"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-lg font-semibold hover:text-indigo-600"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-lg font-semibold hover:text-indigo-600"
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* 4. User/Cart Section */}
        <div className="flex items-center space-x-2">
          {/* Cart Icon */}
          <NavLink
            to="/cart"
            className="text-2xl ml-5 py-2 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center"
          >
            <BsCart3 className="ml-2" />
            <span className="mr-1 w-4 h-4 mb-2 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              5
            </span>
          </NavLink>
          {/* contact icon */}
          <button
            onClick={toggleModal}
            className="text-2xl   ml-5 py-2  px-1 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center"
          >
            <IoMdContact />
          </button>
        </div>
      </div>

      {/* Mobile Menu Modal (Full-screen or centered modal) */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-16 w-[40%] h-[35%] min-h-fit bg-opacity-100 z-50">
          <div
            ref={modalRef}
            className="w-full h-fit bg-slate-100 rounded-xl shadow-lg p-2 flex flex-col items-center justify-center"
          >
            <button
              onClick={toggleMenu}
              className="absolute top-1 right-4 text-pretty text-3xl text-amber-700"
            >
              &times;
            </button>
            {/* Menu links */}
            <ul className="flex flex-col items-center space-y-6">
              <li className="nav-item">
                <NavLink
                  className="text-lg font-semibold hover:text-indigo-600"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="text-lg font-semibold hover:text-indigo-600"
                  to="/product"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="text-lg font-semibold hover:text-indigo-600"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="text-lg font-semibold hover:text-indigo-600"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Modal for login/register/logout positioned just below the Contact icon */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className="absolute right-3 top-16 bg-slate-50 p-6 rounded-md w-44 shadow-md z-50"
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-lg text-gray-500"
          >
            &times;
          </button>
          <h3 className="text-center text-lg font-semibold mb-4">Options</h3>
          <div className="flex flex-col space-y-4">
            <NavLink
              to="/login"
              className="text-center text-blue-500 font-semibold"
              onClick={toggleModal}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="text-center text-blue-500 font-semibold"
              onClick={toggleModal}
            >
              Register
            </NavLink>
            <NavLink
              to="/logout"
              className="text-center text-red-500 font-semibold"
              onClick={toggleModal}
            >
              Logout
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
