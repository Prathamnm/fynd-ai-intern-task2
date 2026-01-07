from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from app.db import SessionLocal
from app.models.schema import ReviewRequest, ReviewResponse
from app.models.models import Review
from app.services.llm import generate_ai_outputs

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/submit-review", response_model=ReviewResponse)
def submit_review(data: ReviewRequest, db: Session = Depends(get_db)):

    if not data.review.strip():
        return ReviewResponse(
            status="error",
            message="Empty review not allowed"
        )

    ai_data = generate_ai_outputs(
        review=data.review,
        rating=data.rating
    )

    review = Review(
        rating=data.rating,
        review=data.review,
        ai_response=ai_data["user_response"],
        ai_summary=ai_data["admin_summary"],
        ai_action=ai_data["recommended_action"],
        created_at=datetime.utcnow()
    )

    db.add(review)
    db.commit()

    return ReviewResponse(
        status="success",
        ai_response=ai_data["user_response"]
    )
