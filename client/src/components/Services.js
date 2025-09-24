import React from 'react';
import { Bell, Shield, Clock, BarChart2, Users, Phone } from 'lucide-react';
import Navbar from './Navbar';

export default function ServicesPage() {
  const services = [
    {
      icon: <Bell className="service-icon" />,
      title: "Incident Reporting",
      description: "Quick and easy reporting system for various types of incidents"
    },
    {
      icon: <Clock className="service-icon" />,
      title: "24/7 Monitoring",
      description: "Round-the-clock monitoring and response coordination"
    },
    {
      icon: <BarChart2 className="service-icon" />,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and reporting tools"
    },
    {
      icon: <Users className="service-icon" />,
      title: "Community Alerts",
      description: "Real-time community notifications and updates"
    },
    {
      icon: <Shield className="service-icon" />,
      title: "Emergency Response",
      description: "Coordinated emergency response system"
    },
    {
      icon: <Phone className="service-icon" />,
      title: "Support Services",
      description: "24/7 customer support and assistance"
    }
  ];

  return (
    <>
    <Navbar/>
    <div className="services-page">
      <div className="services-container">
        <div className="services-header">
          <h1>Our Services</h1>
          <p>
            Comprehensive incident reporting and management solutions for a safer community
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon-wrapper">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
    
  );
}
