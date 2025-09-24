import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
  const { user, role, setUser } = useAuth();

  const handleLogout = () => {
    fetch("http://localhost:5000/api/logout", {
      method: 'DELETE',
      credentials: 'include',
    }).then(resp => {
      if (resp.ok) {
        setUser(null);
      } else {
        throw new Error('Failed to logout');
      }
    })
    .catch(error => console.error('Logout error:', error));
  };

  return (
    <nav className="Navbar">
      <div className='nav-container'>
        <div className="logo">
          <img src="/images/logo1.png" alt="TibaCare Logo" />
          <span className="logo-text">TibaCare Hospital Management System</span>
        </div>
        <div className="navbar">
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/departments">Departments</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
          </ul>
        </div>
        <div className="auth-actions">
          {user ? (
            <>
              <h5 className="user-greeting">Hello, {user.first_name}</h5>
              {role === 'doctor' && (
                <button><NavLink to="/doctordashboard" className="auth-button">Doctor Dashboard</NavLink></button>
              )}
              {role === 'patient' && (
                <button><NavLink to="/patientdashboard" className="auth-button">Patient Dashboard</NavLink></button>
              )}
              <button onClick={handleLogout} className="auth-button">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/signup" className="auth-link">Signup</NavLink>
              <NavLink to="/login" className="auth-link">Login</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
