import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-black h-screen w-screen flex">
      <div className="w-[8%] h-full flex-shrink-0 p-4"> {/* Sidebar */}
        <Navbar />
      </div>
      <div className="w-[90%] h-full p-4 "> {/* Main Content Area */}
        <div className="bg-gray-950 flex flex-col w-full h-full text-white shadow-md rounded-lg border border-gray-600">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
