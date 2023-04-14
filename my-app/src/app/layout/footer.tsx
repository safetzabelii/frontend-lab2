import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-green-800 py-8 ">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p className="mb-2">
            We are passionate about delivering delicious and healthy meals to
            our customers.
          </p>
          <p>
            Our goal is to make it easy and convenient for you to eat well and
            stay healthy, no matter how busy your life may be.
          </p>
        </div>
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="mb-2">
            Email: info@fooddelivery.com
          </p>
          <p>
            Phone: 555-555-5555
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <h2 className="text-xl font-bold mb-4">Connect With Us</h2>
          <div className="flex justify-between mb-4">
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-facebook-f fa-lg"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <i className="fab fa-youtube fa-lg"></i>
            </a>
          </div>
          <p>Sign up for our newsletter to get the latest updates and promotions:</p>
          <div className="flex mt-2">
          <input type="email" placeholder="Enter your email" className="bg-white rounded-l-full py-2 px-4 w-1/2 focus:outline-none border-b hover:border-green-600" />
            <button className="bg-green-600 hover:bg-green-700 rounded-r-full py-2 px-4 text-white focus:outline-none">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center mt-8">
        <p>&copy; 2023 Food Delivery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
