import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, Building, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BookingSection = () => {
  const [formData, setFormData] = useState({
    consultation_type: '',
    preferred_date: '',
    preferred_time: '',
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    description: ''
  });
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [availableTimes, setAvailableTimes] = useState([]);

  const consultationTypes = [
    {
      id: 'Initial Strategy Consultation',
      name: 'Initial Strategy Consultation',
      price: 'Free',
      duration: '60 minutes',
      description: 'Perfect for understanding your current challenges and exploring strategic solutions.'
    },
    {
      id: 'Executive Leadership Assessment',
      name: 'Executive Leadership Assessment',
      price: '£500',
      duration: '90 minutes',
      description: 'Comprehensive assessment of leadership capabilities and development opportunities.'
    },
    {
      id: 'Organizational Diagnostic',
      name: 'Organizational Diagnostic',
      price: '£1,200',
      duration: '2 hours',
      description: 'Deep-dive analysis of organizational structure, culture, and performance metrics.'
    }
  ];

  // Fetch available slots when component mounts
  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  // Update available times when date changes
  useEffect(() => {
    if (formData.preferred_date) {
      const selectedSlot = availableSlots.find(slot => slot.date === formData.preferred_date);
      setAvailableTimes(selectedSlot ? selectedSlot.available_times : []);
    }
  }, [formData.preferred_date, availableSlots]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(`${API}/availability`);
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear time selection if date changes
    if (name === 'preferred_date') {
      setFormData(prev => ({
        ...prev,
        preferred_time: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post(`${API}/consultations`, formData);
      
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          consultation_type: '',
          preferred_date: '',
          preferred_time: '',
          full_name: '',
          email: '',
          phone: '',
          company_name: '',
          description: ''
        });
      }
    } catch (error) {
      setError(error.response?.data?.detail || 'An error occurred while booking your consultation.');
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Schedule a free initial consultation to discuss your leadership challenges and explore 
            how we can help transform your organization.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Consultation Types */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Select Consultation Type</h3>
            
            <div className="space-y-6">
              {consultationTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    formData.consultation_type === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, consultation_type: type.id }))}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{type.name}</h4>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        type.price === 'Free' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {type.price}
                      </div>
                      <div className="text-sm text-gray-500">{type.duration}</div>
                    </div>
                  </div>
                  <p className="text-gray-600">{type.description}</p>
                  
                  {formData.consultation_type === type.id && (
                    <div className="mt-4 flex items-center text-blue-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="font-medium">Selected</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Book Your Session</h3>
              
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6" data-testid="booking-success-message">
                  <div className="flex items-center text-green-700">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Consultation booked successfully!</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">
                    We'll contact you soon to confirm the details.
                  </p>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" data-testid="booking-error-message">
                  <div className="flex items-center text-red-700">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Error: {error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Preferred Date
                  </label>
                  <select
                    name="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                    data-testid="booking-date-select"
                  >
                    <option value="">Select a date</option>
                    {availableSlots.map((slot) => (
                      <option key={slot.date} value={slot.date}>
                        {formatDate(slot.date)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="h-4 w-4 inline mr-2" />
                    Available Times
                  </label>
                  <select
                    name="preferred_time"
                    value={formData.preferred_time}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.preferred_date}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input disabled:bg-gray-100"
                    data-testid="booking-time-select"
                  >
                    <option value="">Select a time</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                      data-testid="booking-full-name-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                      data-testid="booking-email-input"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                      data-testid="booking-phone-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building className="h-4 w-4 inline mr-2" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                      data-testid="booking-company-input"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="h-4 w-4 inline mr-2" />
                    Brief Description of Your Needs
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                    placeholder="Please describe your current challenges and what you hope to achieve..."
                    data-testid="booking-description-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.consultation_type}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 btn-primary"
                  data-testid="booking-submit-btn"
                >
                  {loading ? 'Booking...' : 'Book Consultation'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;