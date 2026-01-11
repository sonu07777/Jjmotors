import React from "react";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-100 py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to MyShop
        </h1>
        <p className="text-gray-600 text-lg">
          Best products at the best prices
        </p>
      </section>

      {/* Products Section */}
      <section className="py-16 px-8">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow hover:shadow-lg">
            Product 1
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg">
            Product 2
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg">
            Product 3
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="bg-yellow-100 py-16 text-center">
        <h2 className="text-3xl font-bold mb-2">
          Special Offers 🎉
        </h2>
        <p className="text-lg text-gray-700">
          Flat 50% off on selected items
        </p>
      </section>
    </div>
  );
};

export default Home;
