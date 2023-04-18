import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from './navbar';
import Footer from './footer';

const ContactUs = () => {
  return (
    <div className="bg-gray-100">

      <div className="max-w-screen-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            If you have any questions or feedback, please fill out the form below
            and we'll get back to you as soon as possible.
          </p>
          <form className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
              />
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                placeholder="Message"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send
              </button>
            </div>
          </form>
          <div className="mt-12 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="bg-white shadow
                    p-5 rounded-md">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-700 rounded-md">
                      <FiPhone className="text-white" size={24} />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Phone number
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        If you need immediate assistance, please call us at:
                      </p>
                      <p className="mt-1 text-base text-gray-500 font-medium">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                  <div className="bg-white shadow p-5 rounded-md">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-700 rounded-md">
                      <FiMail className="text-white" size={24} />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Email address
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        For general inquiries or feedback, please email us at:
                      </p>
                      <p className="mt-1 text-base text-gray-500 font-medium">
                        info@fooddelivery.com
                      </p>
                    </div>
                  </div>
                  <div className="bg-white shadow p-5 rounded-md">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-700 rounded-md">
                      <FaMapMarkerAlt className="text-white" size={24} />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Address
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        If you prefer to visit us in person, our address is:
                      </p>
                      <p className="mt-1 text-base text-gray-500 font-medium">
                        123 Main Street, Anytown USA 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer/>
          </div>
          );
        };
        
        export default ContactUs;
          
