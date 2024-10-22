import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const PatientDetails = () => {
  const [patient, setPatient] = useState(null); // Set initial state to null
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetch(`/api/patient/${user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) =>{console.log('Fetched patient data:', data); // Add this line to inspect the fetched data
           setPatient(data)
          })
        .catch((error) => {
          console.error('Fetch error:', error);
          setError(error.message);
        });
    }
  }, [user]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Display a loading message or a placeholder if patient data is null
  if (!patient) {
    return <p>Loading patient details...</p>;
  }

  return (
    <div className="patient-details">
      <h2><strong>Patient Details</strong></h2>
      <div>
        <p><strong>Name:</strong> {patient.first_name} {patient.last_name}</p>
        <p><strong>Gender:</strong>{patient.gender}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Phone_number:</strong> {patient.phone_number}</p>
        <p><strong>Medical Records:</strong> {patient.medical_records?.join(', ') || 'No medical records found'}</p>
      </div>
    </div>
  );
};

export default PatientDetails;
