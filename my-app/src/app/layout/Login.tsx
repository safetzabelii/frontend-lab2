import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add authentication logic here
  };

  return (
    <div
      className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 min-h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: "url(craiyon_225747_food_delivery_backgroud_theme_simple_minimalistic_food_related_for_login_page.png)" }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-4">
        <h2 className="text-3xl font-bold text-center text-red-500">Food Delivery</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;