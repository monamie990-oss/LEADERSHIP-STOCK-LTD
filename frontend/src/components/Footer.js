import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowRight } from 'lucide-react';

const Footer = ({ companyInfo }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', section: 'home' },
    { name: 'Services', section: 'services' },
    { name: 'Book Consultation', section: 'booking' },
    { name: 'Success Stories', section: 'testimonials' },
    { name: 'Case Studies', section: 'case-studies' },
    { name: 'Insights', section: 'insights' }
  ];

  const services = [
    'Executive Leadership Development',
    'Organizational Transformation',
    'Strategic Business Consulting',
    'Change Management',
    'Performance Optimization',
    'Cultural Assessment'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">
                  {companyInfo ? companyInfo.name : 'LEADERSHIP STOCK LIMITED'}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Transforming businesses through strategic leadership consulting and organizational 
                  excellence. Partner with us to unlock your organization's full potential.
                </p>
              </div>
              
              {companyInfo && (
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Registered Office</div>
                      <div className="text-gray-400">{companyInfo.registered_address}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Company No: {companyInfo.company_number}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-gray-400">{companyInfo.emails[0]}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-gray-400">{companyInfo.phones[0]}</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Social Links */}
              <div className="mt-8">
                <div className="font-medium mb-4">Follow Us</div>
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.section}>
                    <button
                      onClick={() => scrollToSection(link.section)}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      {link.name}
                      <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} {companyInfo ? companyInfo.name : 'LEADERSHIP STOCK LIMITED'}. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          {/* Emergent Badge */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex justify-center">
              <a 
                href="https://app.emergent.sh/?utm_source=emergent-badge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-300 transition-colors text-sm"
              >
                <img 
                  src="https://avatars.githubusercontent.com/in/1201222?s=120&u=2686cf91179bbafbc7a71bfbc43004cf9ae1acea&v=4" 
                  alt="Emergent" 
                  className="h-6 w-6 rounded"
                />
                <span>Made with Emergent</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;