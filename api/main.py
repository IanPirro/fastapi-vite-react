from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from application.utils.config import get_settings

from .routers import user

# Create app
# ---------------------------------------------------------
app = FastAPI(
    title="FastAPI Boilerplate",
    description="FastAPI Boilerplate",
    version="0.0.1",
)

# CORS
# ---------------------------------------------------------
settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
# ---------------------------------------------------------
app.include_router(user.router)


@app.get("/")
def root():
    return "OK"
