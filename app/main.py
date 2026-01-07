from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine
from app.models import models
from app.routes import user, admin

# 🔥 THIS CREATES reviews.db + tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Fynd AI Intern Task 2")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/user", tags=["User"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running"}
