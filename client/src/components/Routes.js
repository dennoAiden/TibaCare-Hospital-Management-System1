import React from "react";
import App from "./App";
import Login from "./Login";
import Departments from "./Departments";
import Doctors from "./Doctors"; // Import the Doctors component
import PatientDashboard from './PatientDashboard';
import About from "./About";
import Contact from "./Contact";
import Signup from "./Signup";
import DoctorDashboard from "./DoctorDashboard";
import DoctorProfileContainer from "./DoctorProfileContainer"; // Import DoctorProfileContainer
import PrivateRoute from "./PrivateRoute";
import DoctorProfile from "./DoctorProfile";

const routes = [
    {
        path: '/',
        element: <App />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/contact',
        element: <Contact />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/departments",
        element: <Departments />
    },
    {
        path: "/departments/:departmentId", 
        element: <Doctors /> 
    },
    {
        path: "/doctors/:doctorId", 
        element: <DoctorProfile /> 
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/patientdashboard',
        element: <PrivateRoute element={<PatientDashboard />} />
    },
    {
        path: '/doctordashboard',
        element: <PrivateRoute element={<DoctorDashboard />} />
    },
    {
        path: '/doctors/:doctorId/profile', 
        element: <DoctorProfileContainer /> 
    }
];

export default routes;
