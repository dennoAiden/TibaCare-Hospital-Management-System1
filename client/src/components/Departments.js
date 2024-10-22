import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  
  // Set the base URL for the images API using the proxy
  const API_BASE_URL = '/api/images'; // Use the proxied path

  useEffect(() => {
    fetch('/api/departments')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setDepartments(data))
      .catch(error => setError('Error fetching departments: ' + error.message));
  }, []);

  return (
    <div>
      <Navbar />
      <div className='department-section'>
      <h1>Hospital Departments</h1>
      {error && <p>{error}</p>}
      <div className="departments-grid">
        {departments.map(department => (
          <div key={department.id} className="department-item">
            <Link to={`/departments/${department.id}`}>
              <img 
                src={`${API_BASE_URL}?model=department&filename=${department.image}`} // Construct the image URL using the proxied path
                alt={department.name} 
                onError={(e) => { 
                  e.target.onerror = null; // Prevents looping
                  e.target.src = '/path/to/fallback_image.jpg'; // Path to fallback image
                }} 
              />
              <h3>{department.name}</h3>
              <p>{department.description}</p>
            </Link>
          </div>
        ))}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Departments;
