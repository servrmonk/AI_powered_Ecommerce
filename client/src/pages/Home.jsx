import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <h2 className="text-2xl font-semibold text-center py-1 mb-3">
        Popular categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 lg:px-5">
        {/* Men's Clothing */}
        <div className="flex flex-col items-center mb-6">
          <Link to="/product"> {/* Wrap the category with Link */}
            <div className="h-full border rounded-lg overflow-hidden shadow-lg">
              <img
                className="w-64 h-48 object-cover"
                src="https://images.pexels.com/photos/15600120/pexels-photo-15600120/free-photo-of-men-in-masks-and-costumes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Men's Clothing"
              />
              <div className="p-4">
                <h5 className="text-lg text-center font-semibold">
                  Men's Clothing
                </h5>
              </div>
            </div>
          </Link>
        </div>

        {/* Women's Clothing */}
        <div className="flex flex-col items-center mb-6">
          <Link to="/product"> {/* Wrap the category with Link */}
            <div className="h-full border rounded-lg overflow-hidden shadow-lg">
              <img
                className="w-64 h-48 object-cover"
                src="https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Women's Clothing"
              />
              <div className="p-4">
                <h5 className="text-lg text-center font-semibold">
                  Women's Clothing
                </h5>
              </div>
            </div>
          </Link>
        </div>

        {/* Jewellery */}
        <div className="flex flex-col items-center mb-6">
          <Link to="/product"> {/* Wrap the category with Link */}
            <div className="h-full border rounded-lg overflow-hidden shadow-lg">
              <img
                className="w-64 h-48 object-cover"
                src="https://images.pexels.com/photos/3641056/pexels-photo-3641056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Jewellery"
              />
              <div className="p-4">
                <h5 className="text-lg text-center font-semibold">Jewellery</h5>
              </div>
            </div>
          </Link>
        </div>

        {/* Electronics */}
        <div className="flex flex-col items-center mb-6">
          <Link to="/product"> {/* Wrap the category with Link */}
            <div className="h-full border rounded-lg overflow-hidden shadow-lg">
              <img
                className="w-64 h-48 object-cover"
                src="https://images.pexels.com/photos/3345882/pexels-photo-3345882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Electronics"
              />
              <div className="p-4">
                <h5 className="text-lg text-center font-semibold">Electronics</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
