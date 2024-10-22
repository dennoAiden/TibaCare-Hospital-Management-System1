import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const DoctorsByDepartment = () => {
  const { departmentId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const API_BASE_URL = '/api/images';

  useEffect(() => {
    fetch(`/api/departments/${departmentId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDoctors(data || []);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
        setError('Error fetching doctors'); 
      });
  }, [departmentId]);

  return (
    <div>
      <Navbar />
      <div className='doctor-section'>
      <h1>Doctors in Department {departmentId}</h1>
      {error && <p>{error}</p>}
      <div className="doctors-list">
        {doctors.length > 0 ? (
          doctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <Link to={`/doctors/${doctor.id}`}>
                <img 
                  src={`${API_BASE_URL}?model=doctor&filename=${doctor.image}`} 
                  alt={`Dr. ${doctor.first_name} ${doctor.last_name}`} 
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = '/path/to/fallback_image.jpg'; 
                  }} 
                />
                <h3>Dr. {doctor.first_name} {doctor.last_name}</h3>
                <p>Specialty: {doctor.specialty}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No doctors found in this department.</p> // Message if no doctors are present
        )}
      </div>
      </div>
    </div>
  );
};

export default DoctorsByDepartment;
