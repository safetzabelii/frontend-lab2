import { observer } from "mobx-react";
import React, { useState } from "react";

export default observer(function AdminDashboard(){

    const [isHovered, setIsHovered] = useState(false);

    

    return  (
        <div className="flex flex-col min-h-screen bg-gray-100 max-w-screen-lg mx-auto">
          {/* Page header */}
          <header className="bg-white border-b border-gray-200 p-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </header>
    
          <main className="flex-grow p-8 flex flex-col p-4">
        {/* Total Users Container */}
        <div
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg p-6 text-white text-center"
        >
            <div>
              <div className="text-4xl font-bold mb-2">{1}</div>
              <div className="text-sm">Verified Users</div>
            </div>
            </div>
            
        {/* Total Users Container */}
        <div
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-lg p-6 text-white text-center"
        >
            <div>
              <div className="text-4xl font-bold mb-2">{1}</div>
              <div className="text-sm">Restaurants</div>
            </div>
            </div>
            </main>
    
            
          
        </div>

      );
    




    
});