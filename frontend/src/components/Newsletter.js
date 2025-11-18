import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post(`${API}/newsletter/subscribe`, { email });
      
      if (response.data.success) {
        setSuccess(true);
        setEmail('');
      }
    } catch (error) {
      setError(error.response?.data?.detail || 'An error occurred while subscribing.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Monthly strategic insights',
    'Industry trend analysis',
    'Exclusive case studies',
    'Leadership best practices',
    'Executive coaching tips',
    'Early access to content'
  ];

  return (
    <section className="py-20 bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Get the latest strategic insights, industry trends, and leadership tips delivered 
              directly to your inbox every month. Stay ahead of the curve with expert analysis 
              and actionable guidance.
            </p>
            
            {/* Features List */}
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-blue-100">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-800 bg-opacity-50 rounded-xl p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">5,000+</div>
                  <div className="text-blue-200 text-sm">Subscribers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">98%</div>
                  <div className="text-blue-200 text-sm">Open Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">Monthly</div>
                  <div className="text-blue-200 text-sm">Delivery</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Newsletter Form */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Join Our Community
                </h3>
                <p className="text-gray-600">
                  Be the first to receive our latest insights and strategic guidance.
                </p>
              </div>
              
              {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6" data-testid="newsletter-success-message">
                  <div className="flex items-center text-green-700">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Successfully subscribed!</span>
                  </div>
                  <p className="text-green-600 text-sm mt-1">
                    Thank you for subscribing. You'll receive our next newsletter soon.
                  </p>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" data-testid="newsletter-error-message">
                  <div className="flex items-center text-red-700">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Error: {error}</span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 form-input"
                    placeholder="your.email@company.com"
                    data-testid="newsletter-email-input"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 btn-primary"
                  data-testid="newsletter-subscribe-btn"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                We respect your privacy. Unsubscribe at any time. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;