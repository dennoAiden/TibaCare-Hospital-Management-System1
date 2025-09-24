import React from 'react';
// import Navbar from "./Navbar"; 

import { Bell, Shield, Clock, BarChart2, Users, Phone } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: <Bell className="h-8 w-8 text-red-500" />,
      title: "Incident Reporting",
      description: "Quick and easy reporting system for various types of incidents"
    },
    {
      icon: <Clock className="h-8 w-8 text-red-500" />,
      title: "24/7 Monitoring",
      description: "Round-the-clock monitoring and response coordination"
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-red-500" />,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and reporting tools"
    },
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: "Community Alerts",
      description: "Real-time community notifications and updates"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Emergency Response",
      description: "Coordinated emergency response system"
    },
    {
      icon: <Phone className="h-8 w-8 text-red-500" />,
      title: "Support Services",
      description: "24/7 customer support and assistance"
    }
  ];

  return (
    <>
    {/* <Navbar/> */}
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive incident reporting and management solutions for a safer community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div></>
  );
}