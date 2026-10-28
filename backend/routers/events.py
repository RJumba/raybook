
from uuid import uuid4

from fastapi import APIRouter, HTTPException

from schemas.event import EventCreate, EventRejectRequest

from services.event_service import (
    submit_event,
    approve_event,
    reject_event,
    filter_public_events
)


# Create a router for all event endpoints
router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


# Temporary event storage
events_store = {}


# ENDPOINT 1: Submit a new event
@router.post("")
def create_event(event: EventCreate):

    submitted_event = submit_event(event)

    event_id = str(uuid4())

    submitted_event["id"] = event_id

    events_store[event_id] = submitted_event

    return submitted_event


# ENDPOINT 2: Approve an event
@router.patch("/{event_id}/approve")
def approve_event_endpoint(event_id: str):

    existing_event = events_store.get(event_id)

    if existing_event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    try:
        approved_event = approve_event(existing_event)

    except ValueError as error:
        raise HTTPException(
            status_code=409,
            detail=str(error)
        ) from error

    events_store[event_id] = approved_event

    return approved_event


# ENDPOINT 3: Reject an event
@router.patch("/{event_id}/reject")
def reject_event_endpoint(
    event_id: str,
    rejection: EventRejectRequest
):

    existing_event = events_store.get(event_id)

    if existing_event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

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

    events_store[event_id] = rejected_event

    return rejected_event



# ENDPOINT 4: Retrieve approved events with optional filters

@router.get("")
def list_public_events(
    category: str | None = None,
    search: str | None = None
):

    # Retrieve events from our temporary storage
    all_events = list(events_store.values())

    # Apply our filtering business logic
    filtered_events = filter_public_events(
        events=all_events,
        category=category,
        search=search
    )

    return filtered_events



# ENDPOINT 5: Retrieve one approved event by ID

@router.get("/{event_id}")
def get_event(event_id: str):

    # Find the event using its ID
    event = events_store.get(event_id)

    # Check whether the event exists
    if event is None:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    # Only approved events can be viewed publicly
    if event["status"] != "approved":
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    # Return the event details
    return event
