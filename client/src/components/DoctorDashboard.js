import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DoctorDetails = () => {
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
    <div className="doctor-details">
      <h2>Doctor Details</h2>
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
  );
};

const PatientDetails = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/patients/${patientId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setPatient(data))
      .catch((error) => {
        console.error('Fetch error:', error);
        setError(error.message);
      });
  }, [patientId]);

  return (
    <div className="patient-details">
      <h2>Patient Details</h2>
      {error ? (
        <p>Error fetching patient details: {error}</p>
      ) : patient ? (
        <div>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Medical History:</strong></p>
          {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
            <ul>
              {patient.medicalHistory.map((entry, index) => (
                <li key={index}>
                  <p><strong>Date:</strong> {entry.date}</p>
                  <p><strong>Diagnosis:</strong> {entry.diagnosis}</p>
                  <p><strong>Treatment:</strong> {entry.treatment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No medical history available.</p>
          )}
        </div>
      ) : (
        <p>Loading patient details...</p>
      )}
    </div>
  );
};

const DoctorDashboard = ({ doctorId }) => {
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state added

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent page refresh
    setLoading(true); // Start loading when search begins
    setError(null); // Reset error state
    setPatientId(null); // Reset previous patientId if any

    fetch(`http://localhost:4000/patients?name=${patientName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No patient found with that name");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false); // Stop loading after getting response

        if (data.length > 0) {
          setPatientId(data[0].id); // Assuming the API returns an array of patients
        } else {
          setError("No patient found.");
        }
      })
      .catch((error) => {
        setLoading(false); // Stop loading on error
        setError(error.message);
      });
  };

  return (
    <div>
      <DoctorDetails doctorId={doctorId} />

      <h1>Search Patient</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter patient name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required // Ensures the input is not empty
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {patientId && <PatientDetails patientId={patientId} />} {/* Show patient details if patientId is set */}
    </div>
  );
};

export default DoctorDashboard;
