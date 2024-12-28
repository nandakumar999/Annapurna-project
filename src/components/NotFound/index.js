import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const NotFound = () => {

useEffect(() => {
    document.title = "Page not found - Annapurna Farms";
}, []);


  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
         Oops! We can't seem to find the page you're looking for.
        </p>
        <p className="not-found-suggestion">
          Don’t worry, let’s get you back on track.
        </p>
        <Link to="/" className="not-found-home-button">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;



