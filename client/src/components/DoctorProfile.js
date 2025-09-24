import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
import BookAppointment from './BookAppointment';

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAppointmentForm, setShowAppointmentForm] = useState(false); 

  useEffect(() => {
    fetch(`http://localhost:5000/api/doctors/${doctorId}`)
      .then(response => response.json())
      .then(data => setDoctor(data))
      .catch(error => console.error('Error fetching doctor profile:', error));
  }, [doctorId]);

  const handleBookAppointment = () => {
    if (user) {
      setShowAppointmentForm(true); 
    } else {
      navigate(`/login`); 
    }
  };

  const handleCloseForm = () => {
    setShowAppointmentForm(false); 
  };

  if (!doctor) {
    return <p>Loading doctor profile...</p>;
  }

  const imageUrl = `http://localhost:5000/api/images?model=doctor&filename=${doctor.image}`;

  return (
    <div>
      <Navbar />
      <div className="doctor-profile">
        <h1>Doctor Profile</h1>
        <div className="doctor-item">
          <img className="doctor-image" src={imageUrl} alt={doctor.first_name} />
          <h2>{doctor.title} {doctor.first_name} {doctor.last_name}</h2>
          <p><strong>Specialty:</strong> {doctor.specialty}</p>
          <p><strong>Bio:</strong> {doctor.bio}</p>
          <p><strong>Education:</strong> {doctor.education}</p>
          <p><strong>Certifications:</strong> {doctor.certifications}</p>
          <button className="appointment-button" onClick={handleBookAppointment}>
            Book Appointment
          </button>
        </div>

        {showAppointmentForm && ( 
          <div className="appointment-form-container">
            <BookAppointment />
            <button onClick={handleCloseForm} className="close-form-button">Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorProfile;
