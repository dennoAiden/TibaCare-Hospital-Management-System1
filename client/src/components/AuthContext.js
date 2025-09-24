import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/check_session`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const { user, role } = await response.json();  // Destructure user and role from response
                    setUser(user); // store user details
                    setRole(role); // store user role (doctor/patient)
                } else {
                    throw new Error('Failed to fetch session');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally{
                setLoading(false);
            }
        };

        fetchSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, role, setUser, setRole, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
