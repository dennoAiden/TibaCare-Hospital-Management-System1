import React, { useEffect, useState } from 'react';
import DoctorProfile from './DoctorProfile';

const DoctorProfileContainer = ({ doctorId }) => {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDoctor(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorData();
    }, [doctorId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return doctor ? <DoctorProfile doctor={doctor} /> : <div>No doctor found</div>;
};

export default DoctorProfileContainer;
