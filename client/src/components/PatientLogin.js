import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import Navbar from "./Navbar";
import { useAuth } from './AuthContext'; 

function PatientLogin() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setUser } = useAuth(); 

    const loginSchema = yup.object().shape({
        email: yup.string().email("Invalid email format").required('Email is required'),
        password: yup.string().required('Password is required') // Changed 'Username' to 'Password'
    });

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/patientlogin`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
                });

                console.log(values)

                if (response.ok) {
                    const data = await response.json(); 
                    console.log(data);
                    setUser(data);
                    navigate("/");
                    setMessage("Login Successful");
                } else {
                    const errorData = await response.json(); 
                    setMessage(errorData.error || "Invalid email or password"); 
                }
            } catch (error) {
                setMessage("An error occurred during login");
            } finally {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <>
            <Navbar />
            <div className="login-container">
                <div className="login">
                    <h1>Login as a Patient</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.email && touched.email ? "inputError" : ""}
                        />
                        {errors.email && touched.email && <p className="errors">{errors.email}</p>}

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.password && touched.password ? "inputError" : ""}
                        />
                        {errors.password && touched.password && <p className="errors">{errors.password}</p>}

                        <button type="submit" disabled={isSubmitting || loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    {message && <p className="responseMessage">{message}</p>}

                    <p>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default PatientLogin;
