
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas.event import EventCreate, EventRejectRequest
from services.event_service import submit_event, approve_event, reject_event

from uuid import uuid4

# Create the Raybook API application
app = FastAPI(
    title="Raybook API",
    description="Backend API for the Raybook event booking platform.",
    version="1.0.0",
)

events_store = {}


@app.post("/events")
def create_event(event: EventCreate):

    # Apply our submission business rules
    submitted_event = submit_event(event)

    # Generate a unique ID for the event
    event_id = str(uuid4())

    # Attach the ID to the event
    submitted_event["id"] = event_id

    # Save the event temporarily in memory
    events_store[event_id] = submitted_event

    return submitted_event


@app.patch("/events/{event_id}/approve")
def approve_event_endpoint(event_id: str):

    # Find the event using its ID
    existing_event = events_store.get(event_id)

    # Check whether the event exists
    if existing_event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    # Apply our existing approval business logic
    try:
        approved_event = approve_event(existing_event)

    except ValueError as error:
        raise HTTPException(
            status_code=409,
            detail=str(error)
        )

    # Update the stored event
    events_store[event_id] = approved_event

    return approved_event


@app.patch("/events/{event_id}/reject")
def reject_event_endpoint(
    event_id: str,
    rejection: EventRejectRequest
):

    # Find the event in temporary storage
    existing_event = events_store.get(event_id)

    # Check if the event exists
    if existing_event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    # Apply our rejection business logic
    try:
        rejected_event = reject_event(
            existing_event,
            rejection.reason
        )

    except ValueError as error:
        raise HTTPException(
            status_code=409,
            detail=str(error)
        ) from error

    # Update the event in temporary storage
    events_store[event_id] = rejected_event

    return rejected_event



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
