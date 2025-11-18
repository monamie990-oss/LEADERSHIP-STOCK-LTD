import React, { useState } from 'react';
import { Download, Calendar, FileText, TrendingUp, Users, DollarSign, Filter } from 'lucide-react';

const CaseStudies = () => {
  const [activeFilter, setActiveFilter] = useState('All Industries');
  
  const caseStudies = [
    {
      id: 1,
      title: 'Fortune 500 Digital Transformation',
      client: 'Global Technology Corporation',
      industry: 'Technology',
      description: 'Complete organizational restructure resulting in 35% efficiency gains and £50M cost savings.',
      challenge: 'Legacy systems and siloed departments hindering digital transformation initiatives.',
      solution: 'Implemented cross-functional leadership teams and agile transformation methodology.',
      results: {
        'Efficiency Increase': '35%',
        'Cost Savings': '£50M',
        'Employee Satisfaction': '90%',
        'Time to Market': '-40%'
      },
      pages: 24,
      fileSize: '2.4 MB',
      date: '14 January 2024',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop'
    },
    {
      id: 2,
      title: 'Global Manufacturing Leadership Alignment',
      client: 'International Manufacturing Group',
      industry: 'Manufacturing',
      description: 'Multi-site leadership development program spanning 15 countries with measurable ROI.',
      challenge: 'Inconsistent leadership practices across global operations affecting productivity.',
      solution: 'Standardized leadership framework with localized implementation strategies.',
      results: {
        'Countries Aligned': '15',
        'Leaders Trained': '300+',
        'Revenue Growth': '25%',
        'Operational Efficiency': '+30%'
      },
      pages: 32,
      fileSize: '3.1 MB',
      date: '19 February 2024',
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&h=400&fit=crop'
    },
    {
      id: 3,
      title: 'Financial Services Cultural Transformation',
      client: 'Premier Banking Institution',
      industry: 'Financial Services',
      description: 'Revolutionary cultural change initiative that improved client satisfaction by 60%.',
      challenge: 'Low employee engagement and declining customer satisfaction scores.',
      solution: 'Culture-first transformation approach with leadership coaching and team alignment.',
      results: {
        'Client Satisfaction': '+60%',
        'Employee Retention': '+40%',
        'Revenue Impact': '£20M',
        'NPS Score': '+35 points'
      },
      pages: 18,
      fileSize: '1.8 MB',
      date: '9 March 2024',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop'
    },
    {
      id: 4,
      title: 'Healthcare System Leadership Excellence',
      client: 'National Healthcare Network',
      industry: 'Healthcare',
      description: 'Strategic leadership transformation improving patient outcomes and operational efficiency.',
      challenge: 'Complex healthcare regulations and staff burnout affecting patient care quality.',
      solution: 'Resilient leadership development and operational excellence framework.',
      results: {
        'Patient Satisfaction': '+45%',
        'Staff Retention': '+35%',
        'Operational Costs': '-20%',
        'Quality Metrics': '+50%'
      },
      pages: 28,
      fileSize: '2.7 MB',
      date: '22 March 2024',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop'
    },
    {
      id: 5,
      title: 'Retail Chain Strategic Realignment',
      client: 'Leading Retail Corporation',
      industry: 'Retail',
      description: 'Comprehensive strategy overhaul during market disruption, achieving sustainable growth.',
      challenge: 'Declining market share and need for digital transformation in retail landscape.',
      solution: 'Integrated digital-first strategy with omnichannel leadership approach.',
      results: {
        'Market Share': '+18%',
        'Digital Revenue': '+120%',
        'Customer Loyalty': '+55%',
        'Profit Margins': '+12%'
      },
      pages: 26,
      fileSize: '2.2 MB',
      date: '5 April 2024',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop'
    }
  ];

  const industries = ['All Industries', 'Technology', 'Manufacturing', 'Financial Services', 'Healthcare', 'Retail'];
  
  const filteredCaseStudies = activeFilter === 'All Industries' 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === activeFilter);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Case Studies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our proven track record through detailed case studies showcasing real results 
            and transformational outcomes for our clients.
          </p>
        </div>

        {/* Industry Filter */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Filter className="h-5 w-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Filter by Industry</h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                  activeFilter === industry
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                data-testid={`filter-${industry.toLowerCase().replace(' ', '-')}`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {filteredCaseStudies.map((study) => (
            <div key={study.id} className="bg-gray-50 rounded-2xl p-8 card-hover" data-testid={`case-study-card-${study.id}`}>
              {/* Case Study Image */}
              <div className="mb-6">
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              
              {/* Badge */}
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {study.industry}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{study.title}</h3>
              <p className="text-gray-600 mb-4">{study.description}</p>
              
              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.entries(study.results).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{value}</div>
                    <div className="text-sm text-gray-600">{key}</div>
                  </div>
                ))}
              </div>
              
              {/* Meta Information */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>{study.pages} pages</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{study.date}</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  <span>{study.fileSize}</span>
                </div>
              </div>
              
              {/* Download Button */}
              <button 
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center group"
                data-testid={`case-study-download-btn-${study.id}`}
              >
                <Download className="h-5 w-5 mr-2" />
                Download Case Study
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Want to Be Our Next Success Story?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join the ranks of industry leaders who have transformed their organizations with our 
              proven methodologies and strategic expertise.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">40%</div>
                <div className="text-blue-100">Average ROI Increase</div>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Leaders Developed</div>
              </div>
              <div className="text-center">
                <DollarSign className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Client Satisfaction</div>
              </div>
            </div>
            
            <button 
              onClick={() => scrollToSection('booking')} 
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-colors duration-300 btn-primary"
              data-testid="case-studies-start-transformation-btn"
            >
              Start Your Transformation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;