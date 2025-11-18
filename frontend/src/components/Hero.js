import React from 'react';
import { ArrowRight, Users, Award, TrendingUp, CheckCircle } from 'lucide-react';

const Hero = ({ companyInfo }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { number: '500+', label: 'Leaders Transformed', icon: Users },
    { number: '50+', label: 'Successful Projects', icon: Award },
    { number: '40%', label: 'Average ROI Increase', icon: TrendingUp }
  ];

  const features = [
    'Strategic Planning',
    'Executive Coaching', 
    'Team Alignment',
    'Performance Metrics',
    'Change Management',
    'Market Analysis'
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop')`
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 fade-in">
              Strategic Leadership Solutions for
              <span className="text-yellow-400 block mt-2">Modern Enterprises</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed slide-in-left">
              Transforming businesses through strategic leadership consulting and organizational excellence.
              Partner with <span className="font-semibold text-yellow-300">LEADERSHIP STOCK LIMITED</span> to unlock your organization's full potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => scrollToSection('booking')} 
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center group btn-primary"
                data-testid="hero-book-consultation-btn"
              >
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('case-studies')} 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300"
                data-testid="hero-view-case-studies-btn"
              >
                View Case Studies
              </button>
            </div>
            
            {/* Key Features */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-blue-100">
                  <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1758518727888-ffa196002e59?w=600&h=800&fit=crop&crop=face" 
                alt="Professional Leadership Consultant" 
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto card-hover"
              />
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -top-8 -right-8 bg-white rounded-xl p-4 shadow-xl card-hover">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 rounded-xl p-4 shadow-xl card-hover">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">£20M+</div>
                <div className="text-sm text-blue-800">Revenue Impact</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <div className="bg-yellow-400 p-3 rounded-full">
                    <IconComponent className="h-8 w-8 text-blue-900" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200 text-lg">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;