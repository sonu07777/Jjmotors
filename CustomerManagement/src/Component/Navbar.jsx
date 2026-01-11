import React from "react";

const Navbar = () => {
  const isLoggedIn = false; // replace later with auth state

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-slate-900 text-white">
      {/* Logo */}
      <h1 className="text-xl font-bold">MyShop</h1>

      {/* Buttons */}
      <div className="flex gap-3">
        {!isLoggedIn ? (
          <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
            Login
          </button>
        ) : (
          <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
            Logout
          </button>
        )}

        <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">
          Admin
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
