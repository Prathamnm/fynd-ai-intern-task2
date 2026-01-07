from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.db import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    rating = Column(Integer, nullable=False)
    review = Column(Text, nullable=False)
    ai_response = Column(Text)
    ai_summary = Column(Text)
    ai_action = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
