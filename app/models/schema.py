from pydantic import BaseModel
from typing import Optional, List, Dict, Any


class ReviewRequest(BaseModel):
    rating: int
    review: str


class ReviewResponse(BaseModel):
    status: str
    ai_response: Optional[str] = None
    message: Optional[str] = None


# ✅ ADD THIS FOR ADMIN
class AdminStatsResponse(BaseModel):
    total_prompts: int
    history: List[Dict[str, Any]]
