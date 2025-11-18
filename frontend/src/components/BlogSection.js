import React from 'react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Executive Leadership in 2024',
      excerpt: 'Exploring emerging trends in leadership development and their impact on organizational success in the post-digital era.',
      author: 'Dr. Amanda Thompson',
      category: 'Leadership Trends',
      readTime: 8,
      date: '14 July 2024',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Strategic Decision Making in Uncertain Times',
      excerpt: 'A comprehensive framework for making critical business decisions when traditional forecasting methods fall short.',
      author: 'Prof. Robert Sterling',
      category: 'Strategic Planning',
      readTime: 12,
      date: '9 July 2024',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 3,
      title: 'Building High-Performance Teams: A Data-Driven Approach',
      excerpt: 'How modern analytics and behavioral science are revolutionizing team formation and performance optimization.',
      author: 'Sarah Chen',
      category: 'Team Development',
      readTime: 10,
      date: '4 July 2024',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 4,
      title: 'Digital Transformation Leadership Challenges',
      excerpt: 'Key leadership considerations when navigating digital transformation in traditional industries.',
      author: 'Michael Rodriguez',
      category: 'Digital Leadership',
      readTime: 7,
      date: '28 June 2024',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 5,
      title: 'Cultural Intelligence in Global Leadership',
      excerpt: 'Essential skills for leading diverse, multicultural teams in today\'s global business environment.',
      author: 'Dr. Elena Kowalski',
      category: 'Global Leadership',
      readTime: 9,
      date: '22 June 2024',
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: 6,
      title: 'Sustainable Leadership Practices for Long-term Success',
      excerpt: 'Balancing profitability with sustainability and social responsibility in modern leadership.',
      author: 'James Patterson',
      category: 'Sustainable Leadership',
      readTime: 11,
      date: '18 June 2024',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop',
      featured: false
    }
  ];

  const categories = ['All', 'Leadership Trends', 'Strategic Planning', 'Team Development', 'Digital Leadership', 'Global Leadership'];

  return (
    <section id="insights" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay ahead with our latest thought leadership articles, industry insights, and strategic 
            guidance from our team of expert consultants.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="order-2 lg:order-1 p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {blogPosts[0].category}
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {blogPosts[0].title}
                </h3>
                
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{blogPosts[0].readTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                </div>
                
                <button className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group" data-testid="featured-article-read-btn">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="order-1 lg:order-2">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover" data-testid={`blog-post-${post.id}`}>
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  
                  <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center group" data-testid={`blog-post-read-btn-${post.id}`}>
                    Read
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-300 btn-primary" data-testid="view-all-articles-btn">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;