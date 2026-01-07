from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.models import Review

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/stats")
def get_admin_stats(db: Session = Depends(get_db)):
    reviews = db.query(Review).all()

    total = len(reviews)
    avg_rating = (
        sum(r.rating for r in reviews) / total if total > 0 else 0
    )

    return {
        "total_reviews": total,
        "average_rating": round(avg_rating, 2),
    }
