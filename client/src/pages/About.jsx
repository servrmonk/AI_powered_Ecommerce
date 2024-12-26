import React from 'react';

const AboutUs = () => {
  return (
    <>
      <div className="container mx-auto  py-8 px-4">
        <h1 className="text-3xl text-gray-800 font-mono from-neutral-800  mt-12 text-center mb-4">About Us</h1>
        <hr className="my-6" />
        
        {/* Wrapper for the paragraph with added left and right padding */}
        <div className="px-4 sm:px-8 md:px-16">
          <p className="text-lg text-center leading-relaxed mb-8">
            Welcome to our AI-powered e-commerce platform! Our goal is to enhance your shopping experience with personalized product recommendations tailored just for you. By leveraging advanced machine learning algorithms, we analyze your browsing history, past purchases, and trends to suggest items you’re most likely to love.

            Our platform is built with modern technologies:
            - **Frontend**: React for a dynamic and responsive user interface.
            - **Backend**: Express.js (Node.js) to handle API requests efficiently.
            - **Database**: MongoDB for storing product and user data, and Redis for fast caching of recommendations.
            - **Recommendation Engine**: Powered by Python, Scikit-Learn, and Pandas for accurate, data-driven suggestions.
            - **Deployment**: Hosted on AWS or Heroku for scalability and reliability.

            Join us and discover how AI can make your shopping experience smarter and more enjoyable!
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-center py-4 mb-6">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center mb-6">
            <div className="h-full border rounded-lg overflow-hidden shadow-lg">
              <img
                className="w-64 h-48 object-cover"
                src="https://images.pexels.com/photos/15600120/pexels-photo-15600120/free-photo-of-men-in-masks-and-costumes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Men's Clothing"
              />
              <div className="p-4">
                <h5 className="text-lg text-center font-semibold">Men's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mb-6">
            <div className="h-full border rounded-lg overflow-hidden shadow-lg">
              <img
                className="w-64 h-48 object-cover"
                src="https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Women's Clothing"
              />
              <div className="p-4">
                <h5 className="text-lg text-center font-semibold">Women's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mb-6">
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
          </div>
          <div className="flex flex-col items-center mb-6">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
