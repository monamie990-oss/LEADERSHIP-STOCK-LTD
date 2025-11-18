from fastapi import FastAPI, HTTPException, APIRouter, Query, status
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, date, timedelta
import uuid

# Import models
from models import (
    Consultation, ConsultationCreate, ConsultationType, ConsultationStatus,
    NewsletterSubscriber, NewsletterSubscribe,
    BlogPost, BlogPostCreate,
    Testimonial, TestimonialCreate,
    CaseStudy, CaseStudyCreate, Industry,
    Contact, ContactForm,
    Service, TimeSlot, AvailableSlot,
    APIResponse, PaginatedResponse
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Leadership Stock API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Company Information
COMPANY_INFO = {
    "name": "LEADERSHIP STOCK LIMITED",
    "company_number": "16689820",
    "registered_address": "28 Borough High Street, London, England SE1 1YB",
    "emails": ["info@leadstk.com", "eslam@leadstk.com"],
    "phones": ["+447403627147", "+447853376239"],
    "incorporation_date": "2nd September 2025"
}

# Helper Functions
def create_slug(title: str) -> str:
    """Create URL-friendly slug from title"""
    return title.lower().replace(' ', '-').replace(',', '').replace('.', '')

# Root Endpoints
@api_router.get("/")
async def root():
    return {"message": "Welcome to Leadership Stock API", "company": COMPANY_INFO["name"]}

@api_router.get("/company")
async def get_company_info():
    """Get company information"""
    return APIResponse(success=True, message="Company information retrieved", data=COMPANY_INFO)

# Consultation Endpoints
@api_router.post("/consultations", response_model=APIResponse)
async def create_consultation(consultation: ConsultationCreate):
    """Book a new consultation"""
    try:
        consultation_dict = consultation.dict()
        consultation_obj = Consultation(**consultation_dict)
        
        # Convert to dict for MongoDB with proper date handling
        consultation_data = consultation_obj.dict()
        # Convert date objects to strings for MongoDB
        if 'preferred_date' in consultation_data:
            consultation_data['preferred_date'] = str(consultation_data['preferred_date'])
        if 'created_at' in consultation_data:
            consultation_data['created_at'] = consultation_data['created_at'].isoformat()
        if 'updated_at' in consultation_data:
            consultation_data['updated_at'] = consultation_data['updated_at'].isoformat()
        
        # Insert into database
        result = await db.consultations.insert_one(consultation_data)
        
        if result.inserted_id:
            return APIResponse(
                success=True,
                message="Consultation booked successfully",
                data={"consultation_id": consultation_obj.id}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to create consultation")
            
    except Exception as e:
        logger.error(f"Error creating consultation: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/consultations", response_model=List[Consultation])
async def get_consultations(
    status: Optional[ConsultationStatus] = None,
    consultation_type: Optional[ConsultationType] = None,
    limit: int = Query(50, le=100)
):
    """Get consultations with optional filtering"""
    filter_dict = {}
    if status:
        filter_dict["status"] = status
    if consultation_type:
        filter_dict["consultation_type"] = consultation_type
    
    consultations = await db.consultations.find(filter_dict).limit(limit).to_list(limit)
    return [Consultation(**consultation) for consultation in consultations]

@api_router.get("/consultations/{consultation_id}", response_model=Consultation)
async def get_consultation(consultation_id: str):
    """Get specific consultation"""
    consultation = await db.consultations.find_one({"id": consultation_id})
    if not consultation:
        raise HTTPException(status_code=404, detail="Consultation not found")
    return Consultation(**consultation)

@api_router.patch("/consultations/{consultation_id}/status")
async def update_consultation_status(consultation_id: str, status: ConsultationStatus):
    """Update consultation status"""
    result = await db.consultations.update_one(
        {"id": consultation_id},
        {"$set": {"status": status, "updated_at": datetime.utcnow()}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Consultation not found")
    
    return APIResponse(success=True, message="Consultation status updated")

# Newsletter Endpoints
@api_router.post("/newsletter/subscribe", response_model=APIResponse)
async def subscribe_newsletter(subscriber: NewsletterSubscribe):
    """Subscribe to newsletter"""
    try:
        # Check if already subscribed
        existing = await db.newsletter_subscribers.find_one({"email": subscriber.email})
        if existing:
            return APIResponse(
                success=True,
                message="Already subscribed to newsletter",
                data={"subscriber_id": existing["id"]}
            )
        
        subscriber_obj = NewsletterSubscriber(**subscriber.dict())
        subscriber_data = subscriber_obj.dict()
        
        result = await db.newsletter_subscribers.insert_one(subscriber_data)
        
        if result.inserted_id:
            return APIResponse(
                success=True,
                message="Successfully subscribed to newsletter",
                data={"subscriber_id": subscriber_obj.id}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to subscribe")
            
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Blog/Insights Endpoints
@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(
    category: Optional[str] = None,
    limit: int = Query(10, le=50),
    skip: int = Query(0, ge=0)
):
    """Get blog posts with optional filtering"""
    filter_dict = {"published": True}
    if category:
        filter_dict["category"] = category
    
    posts = await db.blog_posts.find(filter_dict).sort("created_at", -1).skip(skip).limit(limit).to_list(limit)
    return [BlogPost(**post) for post in posts]

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    """Get specific blog post by slug"""
    post = await db.blog_posts.find_one({"slug": slug, "published": True})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return BlogPost(**post)

@api_router.post("/blog", response_model=APIResponse)
async def create_blog_post(post: BlogPostCreate):
    """Create new blog post"""
    try:
        post_dict = post.dict()
        post_dict["slug"] = create_slug(post.title)
        post_obj = BlogPost(**post_dict)
        
        result = await db.blog_posts.insert_one(post_obj.dict())
        
        if result.inserted_id:
            return APIResponse(
                success=True,
                message="Blog post created successfully",
                data={"post_id": post_obj.id, "slug": post_obj.slug}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to create blog post")
            
    except Exception as e:
        logger.error(f"Error creating blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Testimonials Endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(featured_only: bool = False, limit: int = Query(10, le=50)):
    """Get testimonials"""
    filter_dict = {}
    if featured_only:
        filter_dict["featured"] = True
    
    testimonials = await db.testimonials.find(filter_dict).sort("created_at", -1).limit(limit).to_list(limit)
    return [Testimonial(**testimonial) for testimonial in testimonials]

@api_router.post("/testimonials", response_model=APIResponse)
async def create_testimonial(testimonial: TestimonialCreate):
    """Create new testimonial"""
    try:
        testimonial_obj = Testimonial(**testimonial.dict())
        result = await db.testimonials.insert_one(testimonial_obj.dict())
        
        if result.inserted_id:
            return APIResponse(
                success=True,
                message="Testimonial created successfully",
                data={"testimonial_id": testimonial_obj.id}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to create testimonial")
            
    except Exception as e:
        logger.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Case Studies Endpoints
@api_router.get("/case-studies", response_model=List[CaseStudy])
async def get_case_studies(
    industry: Optional[Industry] = None,
    limit: int = Query(10, le=50)
):
    """Get case studies with optional industry filtering"""
    filter_dict = {"published": True}
    if industry and industry != Industry.ALL:
        filter_dict["industry"] = industry
    
    case_studies = await db.case_studies.find(filter_dict).sort("created_at", -1).limit(limit).to_list(limit)
    return [CaseStudy(**case_study) for case_study in case_studies]

@api_router.get("/case-studies/{case_study_id}", response_model=CaseStudy)
async def get_case_study(case_study_id: str):
    """Get specific case study"""
    case_study = await db.case_studies.find_one({"id": case_study_id, "published": True})
    if not case_study:
        raise HTTPException(status_code=404, detail="Case study not found")
    return CaseStudy(**case_study)

@api_router.post("/case-studies", response_model=APIResponse)
async def create_case_study(case_study: CaseStudyCreate):
    """Create new case study"""
    try:
        case_study_obj = CaseStudy(**case_study.dict())
        result = await db.case_studies.insert_one(case_study_obj.dict())
        
        if result.inserted_id:
            return APIResponse(
                success=True,
                message="Case study created successfully",
                data={"case_study_id": case_study_obj.id}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to create case study")
            
    except Exception as e:
        logger.error(f"Error creating case study: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Contact Endpoints
@api_router.post("/contact", response_model=APIResponse)
async def submit_contact_form(contact: ContactForm):
    """Submit contact form"""
    try:
        contact_obj = Contact(**contact.dict())
        result = await db.contacts.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            return APIResponse(
                success=True,
                message="Contact form submitted successfully",
                data={"contact_id": contact_obj.id}
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to submit contact form")
            
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Available Time Slots
@api_router.get("/availability", response_model=List[AvailableSlot])
async def get_available_slots(
    start_date: Optional[date] = None,
    end_date: Optional[date] = None,
    consultation_type: Optional[ConsultationType] = None
):
    """Get available time slots for consultations"""
    if not start_date:
        start_date = date.today() + timedelta(days=1)  # Tomorrow onwards
    if not end_date:
        end_date = start_date + timedelta(days=30)  # Next 30 days
    
    # Generate available slots (9 AM to 5 PM, weekdays only)
    available_slots = []
    current_date = start_date
    
    while current_date <= end_date:
        # Skip weekends
        if current_date.weekday() < 5:  # Monday = 0, Friday = 4
            available_times = []
            for hour in range(9, 17):  # 9 AM to 5 PM
                time_str = f"{hour:02d}:00"
                available_times.append(time_str)
            
            available_slots.append(AvailableSlot(
                date=current_date,
                available_times=available_times
            ))
        
        current_date += timedelta(days=1)
    
    return available_slots

# Services Endpoint
@api_router.get("/services", response_model=List[Service])
async def get_services():
    """Get all services offered"""
    services = [
        Service(
            title="Executive Leadership Development",
            description="Comprehensive leadership training programs designed to elevate C-suite executives and senior management teams.",
            features=[
                "360° Leadership Assessment",
                "Executive Coaching",
                "Strategic Planning",
                "Team Alignment"
            ],
            icon="crown",
            pricing={"initial_consultation": "Free", "executive_assessment": "£500", "full_program": "Contact for quote"}
        ),
        Service(
            title="Organizational Transformation",
            description="End-to-end transformation strategies that align people, processes, and technology for maximum impact.",
            features=[
                "Change Management",
                "Process Optimization",
                "Cultural Transformation",
                "Performance Metrics"
            ],
            icon="building",
            pricing={"organizational_diagnostic": "£1,200", "full_transformation": "Contact for quote"}
        ),
        Service(
            title="Strategic Business Consulting",
            description="Data-driven strategic insights that propel businesses toward sustainable growth and market leadership.",
            features=[
                "Market Analysis",
                "Competitive Intelligence",
                "Growth Strategy",
                "Risk Assessment"
            ],
            icon="trending-up",
            pricing={"strategy_consultation": "Free", "detailed_analysis": "Contact for quote"}
        )
    ]
    return services

# Include the router in the main app
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)