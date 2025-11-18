import React from 'react';
import { Star, Play, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'James Richardson',
      position: 'CEO',
      company: 'TechCorp Industries',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&h=150&fit=crop&crop=face',
      content: 'LEADERSHIP STOCK transformed our entire leadership approach. Revenue increased by 40% within 12 months.',
      rating: 5,
      hasVideo: true
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      position: 'Director of Operations',
      company: 'Global Finance Solutions',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'The strategic insights provided were game-changing. Our team alignment improved dramatically.',
      rating: 5,
      hasVideo: true
    },
    {
      id: 3,
      name: 'Michael Chen',
      position: 'Managing Director',
      company: 'Manufacturing Plus',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Outstanding results in organizational transformation. Highly recommend their expertise.',
      rating: 5,
      hasVideo: true
    },
    {
      id: 4,
      name: 'Emma Thompson',
      position: 'Head of Strategy',
      company: 'Innovation Labs',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'Their executive coaching program exceeded all expectations. Truly transformational.',
      rating: 5,
      hasVideo: false
    },
    {
      id: 5,
      name: 'David Rodriguez',
      position: 'VP of Development',
      company: 'Future Systems',
      image: 'https://images.unsplash.com/photo-1584940121819-1883a5d3b0bd?w=150&h=150&fit=crop&crop=face',
      content: 'The ROI from their consulting services was immediate and substantial. Exceptional team.',
      rating: 5,
      hasVideo: false
    },
    {
      id: 6,
      name: 'Lisa Park',
      position: 'Chief Operating Officer',
      company: 'Digital Dynamics',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      content: 'Professional, knowledgeable, and results-driven. They delivered exactly what was promised.',
      rating: 5,
      hasVideo: false
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill().map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Client Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped industry leaders transform their organizations and achieve 
            measurable results through strategic leadership development.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Quote className="h-12 w-12 text-blue-600 mb-6" />
                <blockquote className="text-2xl font-medium text-gray-900 mb-6">
                  "{testimonials[0].content}"
                </blockquote>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonials[0].image}
                    alt={testimonials[0].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonials[0].name}</div>
                    <div className="text-gray-600">{testimonials[0].position}</div>
                    <div className="text-blue-600 font-medium">{testimonials[0].company}</div>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  {renderStars(testimonials[0].rating)}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop"
                  alt="Success Story"
                  className="rounded-xl w-full"
                />
                {testimonials[0].hasVideo && (
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-xl hover:bg-opacity-40 transition-colors">
                    <div className="bg-white rounded-full p-4">
                      <Play className="h-8 w-8 text-blue-600 fill-current" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.slice(1).map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 card-hover" data-testid={`testimonial-card-${testimonial.id}`}>
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                </div>
                {testimonial.hasVideo && (
                  <button className="text-blue-600 hover:text-blue-700">
                    <Play className="h-5 w-5 fill-current" />
                  </button>
                )}
              </div>
              
              <div className="flex items-center mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <blockquote className="text-gray-700 italic">
                "{testimonial.content}"
              </blockquote>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-blue-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Want to Be Our Next Success Story?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join the ranks of industry leaders who have transformed their organizations with our 
              proven methodologies and strategic expertise.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">40%</div>
                <div className="text-blue-100">Average ROI Increase</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                <div className="text-blue-100">Leaders Developed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">98%</div>
                <div className="text-blue-100">Client Satisfaction</div>
              </div>
            </div>
            
            <button 
              onClick={() => scrollToSection('booking')} 
              className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-yellow-300 transition-colors duration-300 btn-primary"
              data-testid="testimonials-start-transformation-btn"
            >
              Start Your Transformation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;