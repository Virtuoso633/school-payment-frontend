import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
      <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go back to Overview
      </Link>
    </div>
  );
};

export default NotFoundPage;