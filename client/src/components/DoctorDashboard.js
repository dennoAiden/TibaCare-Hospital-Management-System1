import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Navbar from './Navbar';
import DoctorsPatients from './DoctorsPatients';

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  console.log(user);
  
  useEffect(() => {
    fetch(`/api/doctor/${user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setDoctor(data))
      .catch((error) => {
        console.error('Fetch error:', error);
        setError(error.message);
      });
  }, [user.id]);

  return (
    <>
    <div>
      <Navbar />
    </div>
    <div className="doctor-details">
      <h2>Doctor Details</h2>
      <div className='doctor-info'>
      {error ? (
        <p>Error fetching doctor details: {error}</p>
      ) : doctor ? (
        <div>
          <p><strong>Name:</strong> {doctor.title}{doctor.first_name}{doctor.last_name}</p>
          <p><strong>Specialization:</strong> {doctor.specialty}</p>
          <p><strong>Experience:</strong> {doctor.certifications}</p>
        </div>
      ) : (
        <p>Loading doctor details...</p>
      )}

      </div>
      
      <div>
        <DoctorsPatients />
      </div>
    </div>
    </>
  );
};

export default DoctorDashboard;
