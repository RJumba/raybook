
from schemas.event import EventCreate


def submit_event(event: EventCreate):

    # Convert the validated event into a dictionary
    event_data = event.model_dump(mode="json")

    # Every new event starts as pending
    event_data["status"] = "pending"

    # A new event has not sold any tickets
    event_data["tickets_sold"] = 0

    return event_data


def approve_event(event_data: dict):

    # Only pending events can be approved
    if event_data.get("status") != "pending":
        raise ValueError("Only pending events can be approved.")

    # Create a copy of the event
    updated_event = event_data.copy()

    # Change the event's status to approved
    updated_event["status"] = "approved"

    return updated_event


def reject_event(event_data: dict, reason: str):

    # Only pending events can be rejected
    if event_data.get("status") != "pending":
        raise ValueError("Only pending events can be rejected.")

    # A rejection must have a reason
    if not reason.strip():
        raise ValueError("A rejection reason is required.")

    # Create a copy of the event
    updated_event = event_data.copy()

    # Change the event status
    updated_event["status"] = "rejected"

    # Store the reason for rejection
    updated_event["rejection_reason"] = reason.strip()

    return updated_event
