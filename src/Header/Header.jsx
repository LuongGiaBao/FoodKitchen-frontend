import React from "react";
import logo from "../assets/logo.png";
import { FiShoppingCart } from "react-icons/fi";
const title = {
  name: "UNU KITCHEN",
};
const Header = ({ cart, onCartClick, onSearch }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
      <header className="bg-red-600 py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo + Brand */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <img
              src={logo}
              alt="logo"
              className="w-8 h-8 rounded-full bg-white p-1"
            />
            <span className="text-white font-bold text-lg">{title.name}</span>
          </div>

          {/* Search + Cart */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search dishes..."
              onChange={(e) => onSearch(e.target.value)}
              className="rounded-full px-4 py-2 text-sm focus:outline-none md:block hidden"
            />
            <button
              onClick={onCartClick}
              className="relative flex items-center gap-1 bg-white rounded-full px-4 py-2 text-red-600 font-semibold hover:bg-red-100 transition"
            >
              Cart
              <FiShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
