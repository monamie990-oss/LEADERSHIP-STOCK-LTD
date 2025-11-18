import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BookingSection from './components/BookingSection';
import Testimonials from './components/Testimonials';
import CaseStudies from './components/CaseStudies';
import BlogSection from './components/BlogSection';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Home Page Component
const HomePage = () => {
  const [companyInfo, setCompanyInfo] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch company info and services
        const [companyResponse, servicesResponse] = await Promise.all([
          axios.get(`${API}/company`),
          axios.get(`${API}/services`)
        ]);

        setCompanyInfo(companyResponse.data.data);
        setServices(servicesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header companyInfo={companyInfo} />
      <Hero companyInfo={companyInfo} />
      <Services services={services} />
      <BookingSection />
      <Testimonials />
      <CaseStudies />
      <BlogSection />
      <Newsletter />
      <Footer companyInfo={companyInfo} />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;