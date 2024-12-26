import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <section className="py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm uppercase">
          {/* Online Store Section */}
          <div>
            <h3 className="font-semibold text-lg hover:text-gray-400 cursor-pointer">
              Online Store
            </h3>
            <p className="hover:text-gray-400 cursor-pointer">Men Clothing</p>
            <p className="hover:text-gray-400 cursor-pointer">Women Clothing</p>
            <p className="hover:text-gray-400 cursor-pointer">
              Men Accessories
            </p>
            <p className="hover:text-gray-400 cursor-pointer">
              Women Accessories
            </p>
          </div>

          {/* Helpful Links Section */}
          <div>
            <h3 className="font-semibold text-lg hover:text-gray-400 cursor-pointer">
              Helpful Links
            </h3>
            <p className="hover:text-gray-400 cursor-pointer">Home</p>
            <p className="hover:text-gray-400 cursor-pointer">About</p>
            <p className="hover:text-gray-400 cursor-pointer">Contact</p>
          </div>

          {/* Partners Section */}
          <div>
            <h3 className="font-semibold text-lg hover:text-gray-400 cursor-pointer">
              Partners
            </h3>
            <p className="hover:text-gray-400 cursor-pointer">Zara</p>
            <p className="hover:text-gray-400 cursor-pointer">Pantaloons</p>
            <p className="hover:text-gray-400 cursor-pointer">Levis</p>
            <p className="hover:text-gray-400 cursor-pointer">UCB</p>
            <p className="hover:text-gray-400 cursor-pointer">+ Many More</p>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="font-semibold text-lg hover:text-gray-400 cursor-pointer">
              Address
            </h3>
            <p className="hover:text-gray-400 cursor-pointer">Building 101</p>
            <p className="hover:text-gray-400 cursor-pointer">Central Avenue</p>
            <p className="hover:text-gray-400 cursor-pointer">LA - 902722</p>
            <p className="hover:text-gray-400 cursor-pointer">United States</p>
          </div>
        </div>

        {/* Credit Section */}
        <div className="text-center py-4 bg-gray-900 text-xs">
          <a
            href="https://www.linkedin.com/in/raushanks/"
            className="text-white hover:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            © Raushan Singh
          </a>
          <span className="mx-2">|</span>
          <a
            href="/"
            className="text-white hover:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Technocolabs Software
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
