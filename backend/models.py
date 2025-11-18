from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime, date, time
import uuid
from enum import Enum

class ConsultationType(str, Enum):
    INITIAL_STRATEGY = "Initial Strategy Consultation"
    EXECUTIVE_ASSESSMENT = "Executive Leadership Assessment"
    ORGANIZATIONAL_DIAGNOSTIC = "Organizational Diagnostic"

class ConsultationStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class Industry(str, Enum):
    ALL = "All Industries"
    TECHNOLOGY = "Technology"
    MANUFACTURING = "Manufacturing"
    FINANCIAL_SERVICES = "Financial Services"
    HEALTHCARE = "Healthcare"
    RETAIL = "Retail"

# Base Models
class TimestampMixin(BaseModel):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Consultation Models
class ConsultationCreate(BaseModel):
    consultation_type: ConsultationType
    preferred_date: date
    preferred_time: str
    full_name: str
    email: EmailStr
    phone: str
    company_name: str
    description: str
    
class Consultation(ConsultationCreate, TimestampMixin):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: ConsultationStatus = ConsultationStatus.PENDING
    notes: Optional[str] = None
    
    class Config:
        json_encoders = {
            date: lambda v: v.isoformat() if v else None,
            datetime: lambda v: v.isoformat() if v else None
        }
    
# Newsletter Models
class NewsletterSubscribe(BaseModel):
    email: EmailStr
    
class NewsletterSubscriber(NewsletterSubscribe, TimestampMixin):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    active: bool = True
    
# Blog/Insights Models
class BlogPostCreate(BaseModel):
    title: str
    content: str
    excerpt: str
    author: str
    category: str
    tags: List[str] = []
    featured_image: Optional[str] = None
    read_time: int = 5  # minutes
    
class BlogPost(BlogPostCreate, TimestampMixin):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    published: bool = True
    slug: str
    
# Testimonial Models
class TestimonialCreate(BaseModel):
    client_name: str
    company: str
    position: str
    content: str
    rating: int = Field(ge=1, le=5)
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    
class Testimonial(TestimonialCreate, TimestampMixin):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    featured: bool = False
    
# Case Study Models
class CaseStudyCreate(BaseModel):
    title: str
    client_company: str
    industry: Industry
    description: str
    challenge: str
    solution: str
    results: Dict[str, Any]  # Key metrics and outcomes
    pages: int
    file_size: str
    pdf_url: Optional[str] = None
    featured_image: Optional[str] = None
    
class CaseStudy(CaseStudyCreate, TimestampMixin):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    published: bool = True
    
# Contact Models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    message: str
    
class Contact(ContactForm, TimestampMixin):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    responded: bool = False
    
# Service Models
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    features: List[str]
    icon: str
    pricing: Optional[Dict[str, Any]] = None
    
# Available Time Slots
class TimeSlot(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: date
    time: str
    available: bool = True
    consultation_type: Optional[ConsultationType] = None
    
class AvailableSlot(BaseModel):
    date: date
    available_times: List[str]
    
# Response Models
class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None
    
class PaginatedResponse(BaseModel):
    items: List[Any]
    total: int
    page: int
    per_page: int
    pages: int