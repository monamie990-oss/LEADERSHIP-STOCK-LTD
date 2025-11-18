#!/usr/bin/env python3
"""
Script to populate the LEADERSHIP STOCK LIMITED website with sample data
"""
import asyncio
import os
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
from models import (
    Testimonial, BlogPost, CaseStudy, NewsletterSubscriber
)

# MongoDB connection
mongo_url = "mongodb://localhost:27017"
client = AsyncIOMotorClient(mongo_url)
db = client["test_database"]

async def populate_testimonials():
    testimonials = [
        {
            "client_name": "James Richardson",
            "company": "TechCorp Industries",
            "position": "CEO",
            "content": "LEADERSHIP STOCK transformed our entire leadership approach. Revenue increased by 40% within 12 months.",
            "rating": 5,
            "image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&h=150&fit=crop&crop=face",
            "featured": True,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            "id": "testimonial-1"
        },
        {
            "client_name": "Sarah Mitchell",
            "company": "Global Finance Solutions",
            "position": "Director of Operations",
            "content": "The strategic insights provided were game-changing. Our team alignment improved dramatically.",
            "rating": 5,
            "image_url": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            "featured": False,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            "id": "testimonial-2"
        },
        {
            "client_name": "Michael Chen",
            "company": "Manufacturing Plus",
            "position": "Managing Director",
            "content": "Outstanding results in organizational transformation. Highly recommend their expertise.",
            "rating": 5,
            "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            "featured": False,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            "id": "testimonial-3"
        }
    ]
    
    for testimonial in testimonials:
        await db.testimonials.insert_one(testimonial)
    print("✅ Testimonials populated")

async def populate_blog_posts():
    blog_posts = [
        {
            "title": "The Future of Executive Leadership in 2024",
            "content": "Executive leadership is evolving rapidly in response to digital transformation, remote work, and changing employee expectations...",
            "excerpt": "Exploring emerging trends in leadership development and their impact on organizational success in the post-digital era.",
            "author": "Dr. Amanda Thompson",
            "category": "Leadership Trends",
            "tags": ["leadership", "trends", "executive", "2024"],
            "read_time": 8,
            "slug": "the-future-of-executive-leadership-in-2024",
            "published": True,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            "id": "blog-1"
        },
        {
            "title": "Strategic Decision Making in Uncertain Times",
            "content": "In today's rapidly changing business environment, traditional decision-making frameworks often fall short...",
            "excerpt": "A comprehensive framework for making critical business decisions when traditional forecasting methods fall short.",
            "author": "Prof. Robert Sterling",
            "category": "Strategic Planning",
            "tags": ["strategy", "decision-making", "uncertainty"],
            "read_time": 12,
            "slug": "strategic-decision-making-in-uncertain-times",
            "published": True,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            "id": "blog-2"
        }
    ]
    
    for post in blog_posts:
        await db.blog_posts.insert_one(post)
    print("✅ Blog posts populated")

async def populate_case_studies():
    case_studies = [
        {
            "title": "Fortune 500 Digital Transformation",
            "client_company": "Global Technology Corporation",
            "industry": "Technology",
            "description": "Complete organizational restructure resulting in 35% efficiency gains and £50M cost savings.",
            "challenge": "Legacy systems and siloed departments hindering digital transformation initiatives.",
            "solution": "Implemented cross-functional leadership teams and agile transformation methodology.",
            "results": {
                "Efficiency Increase": "35%",
                "Cost Savings": "£50M",
                "Employee Satisfaction": "90%"
            },
            "pages": 24,
            "file_size": "2.4 MB",
            "published": True,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            "id": "case-study-1"
        },
        {
            "title": "Global Manufacturing Leadership Alignment",
            "client_company": "International Manufacturing Group",
            "industry": "Manufacturing",
            "description": "Multi-site leadership development program spanning 15 countries with measurable ROI.",
            "challenge": "Inconsistent leadership practices across global operations affecting productivity.",
            "solution": "Standardized leadership framework with localized implementation strategies.",
            "results": {
                "Countries Aligned": "15",
                "Leaders Trained": "300+",
                "Revenue Growth": "25%"
            },
            "pages": 32,
            "file_size": "3.1 MB",
            "published": True,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            "id": "case-study-2"
        }
    ]
    
    for study in case_studies:
        await db.case_studies.insert_one(study)
    print("✅ Case studies populated")

async def main():
    print("🚀 Starting data population for LEADERSHIP STOCK LIMITED...")
    
    await populate_testimonials()
    await populate_blog_posts()  
    await populate_case_studies()
    
    print("✅ All sample data populated successfully!")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())