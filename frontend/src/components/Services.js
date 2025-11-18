import React from 'react';
import { Crown, Building, TrendingUp, ArrowRight, CheckCircle, Users, Target, BarChart3 } from 'lucide-react';

const Services = ({ services }) => {
  const iconMap = {
    crown: Crown,
    building: Building,
    'trending-up': TrendingUp
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceImages = [
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop'
  ];

  if (!services || services.length === 0) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive leadership solutions designed to transform your organization and drive 
            sustainable growth through strategic excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Crown;
            return (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg p-8 card-hover" data-testid={`service-card-${index}`}>
                {/* Service Image */}
                <div className="mb-6">
                  <img 
                    src={serviceImages[index]} 
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>
                
                {/* Service Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                
                {/* Service Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Pricing (if available) */}
                {service.pricing && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Pricing:</h4>
                    {Object.entries(service.pricing).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-sm py-1">
                        <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                        <span className="font-medium text-blue-600">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <button 
                  onClick={() => scrollToSection('booking')} 
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center group"
                  data-testid={`service-learn-more-btn-${index}`}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="bg-blue-900 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Leadership?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Schedule a free consultation to discuss your specific needs and discover how our 
              proven methodologies can drive results for your organization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => scrollToSection('booking')} 
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-colors duration-300 flex items-center group btn-primary"
                data-testid="services-book-consultation-btn"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>500+ Leaders Developed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>98% Client Satisfaction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>40% Average ROI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;