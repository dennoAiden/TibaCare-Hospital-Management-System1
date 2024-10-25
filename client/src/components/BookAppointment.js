import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from './AuthContext';

const BookAppointment = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const [error, setError] = useState('');

    const validationSchema = yup.object().shape({
        date: yup.string().required('Date is required'),
        time: yup.string().required('Time is required'),
        medical_records: yup.string().required('Medical records are required'),
    });

    const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
            medical_records: '', 
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const appointmentData = { 
                ...values, 
                doctorId, 
                patientId: user?.id 
            };

            try {
                const response = await fetch('/api/appointments/book', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(appointmentData),
                });

                if (response.ok) {
                    alert('Appointment booked successfully!');
                    resetForm();
                    navigate(-1);
                } else {
                    const errorData = await response.json();
                    alert(`Failed to book appointment: ${errorData.error || 'Please try again.'}`);
                }
            } catch (error) {
                alert('An error occurred while booking the appointment. Please try again.');
                console.error('Error:', error);
            }
        },
    });

    useEffect(() => {
        if (loading) return;
        if (!user || !user.id) {
            alert('Patient ID is missing. Please log in.');
            navigate('/login');
        }
    }, [user, loading, navigate]);

    return (
        <form onSubmit={formik.handleSubmit} className="appointment-form">
            <div className="form-field">
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date && <p className="errors">{formik.errors.date}</p>}
            </div>

            <div className="form-field">
                <label htmlFor="time">Time:</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.time}
                />
                {formik.touched.time && formik.errors.time && <p className="errors">{formik.errors.time}</p>}
            </div>

            <div className="form-field">
                <label htmlFor="medical_records">Medical Records:</label>
                <textarea
                    id="medical_records"
                    name="medical_records"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.medical_records}
                />
                {formik.touched.medical_records && formik.errors.medical_records && <p className="errors">{formik.errors.medical_records}</p>}
            </div>

            <div className="form-buttons">
                <button type="submit" className="submit-button">Submit Appointment</button>
                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
            </div>
        </form>
    );
};

export default BookAppointment;
