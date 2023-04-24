import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";


const Aboutus = () => {
  return (
    <div>
        
        <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center"
        style={{ backgroundImage: `url(aboutus.png)` }}
      >
    <section className="bg-gray-100 py-36 px-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-bold leading-7 text-gray-900 sm:text-4xl sm:truncate">
              About Us
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
              Welcome to Food Delivery, your go-to food delivery service for
              delicious, wholesome meals delivered straight to your door. We
              are a team of passionate food lovers who believe that good food
              should be accessible to everyone, no matter how busy their
              schedule may be.
            </p>
          </div>
          
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-rows-3 gap-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Our History
            </h3>
            <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
              <p>
                Food Delivery was founded in 2023, and we have since grown
                into a team of dedicated professionals who are committed to
                providing the best possible service to our customers.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Our Food Philosophy
            </h3>
            <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
              <p>
                At Food Delivery, we take pride in our food philosophy. We
                believe that healthy, delicious food should be made from scratch
                using only the freshest ingredients, and we are committed to
                using locally-sourced produce whenever possible.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Our Team
            </h3>
            <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
              <p>
                Our team is made up of experienced chefs, knowledgeable
                nutritionists, and friendly customer service representatives,
                all of whom are passionate about food and dedicated to ensuring
                your satisfaction.
              </p>
            </div>
            </div>
      </div>
    </div>
    
    </section>
    </div>
    <Footer/>
    </div>
    

  );
};
export default Aboutus;