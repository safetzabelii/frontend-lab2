import React from 'react';
import { observer } from 'mobx-react-lite';
export default observer ( function PageNotFound() {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="max-w-md w-full space-y-8 p-8 mt-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">Page Not Found</h2>
            <p className="mt-2 text-lg text-gray-600">
              The page you are looking for does not exist.
            </p>
          </div>
          <div className="mt-8">
            <button
              className="bg-green-700 hover:bg-green-800 text-white items-center justify-center font-bold py-2 px-20 rounded"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              Go back to homepage
            </button>
          </div>
        </div>
      </div>
    );
  });
  

  