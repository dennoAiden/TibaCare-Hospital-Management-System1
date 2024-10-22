import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

function DoctorsPatients() {
  const [patients, setPatients] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Debugging logs to check user data and patients data
  console.log("Logged in user:", user);
  console.log("Patients data:", patients);

  useEffect(() => {
    if (user && user.id) {
      const fetchPatients = async () => {
        try {
          const response = await fetch(`/api/patients/doctor/${user.id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPatients(data);
        } catch (error) {
          console.error('Error fetching patients:', error);
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPatients();
    }
  }, [user]); // Re-run the effect when `user` changes

  // Show a loading message while the data is being fetched
  if (isLoading) {
    return <p>Loading patients...</p>;
  }

  // Show an error message if there was an error fetching patients
  if (error) {
    return <p>Error fetching patients: {error}</p>;
  }

  // Handle the case where no patients are found or data is still null
  if (!Array.isArray(patients) || patients.length === 0) {
    return <p>No patients found.</p>;
  }

  // Render the list of patients if they are successfully fetched
  return (
    <div>
      <h2>Patients:</h2>
      {patients.map((patient) => (
        <div key={patient.id}>
          <p>Name: {patient.first_name} {patient.last_name}</p>
          <p>Gender: {patient.gender}</p>
        </div>
      ))}
    </div>
  );
}

export default DoctorsPatients;
