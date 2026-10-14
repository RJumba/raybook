
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create the Raybook API application
app = FastAPI(
    title="Raybook API",
    description="Backend API for the Raybook event booking platform.",
    version="1.0.0",
)


# Websites allowed to read responses from Raybook API
allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=[],
)


# Basic API health check
@app.get("/api/v1/health", tags=["Health"])
def health_check():
    return {
        "status": "ok",
        "service": "raybook-api",
        "message": "Raybook backend is running successfully"
    }
