// src/components/layout/MainLayout.tsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom'; // Import Outlet and Link

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header (Simple Example) */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <nav className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">School Payment Dashboard</h1>
          {/* Basic Navigation Links */}
          <div className='space-x-4'>
            <Link to="/" className="hover:text-blue-200">Overview</Link>
            <Link to="/school" className="hover:text-blue-200">By School</Link>
            <Link to="/status-check" className="hover:text-blue-200">Check Status</Link>
             {/* Add Login/Logout later */}
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4 md:p-6">
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </main>

      {/* Footer (Optional Simple Example) */}
      <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600 mt-auto">
        © {new Date().getFullYear()} School Payments Inc.
      </footer>
    </div>
  );
};

export default MainLayout;