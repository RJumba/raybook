
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


def filter_public_events(
    events: list[dict],
    category: str | None = None,
    search: str | None = None
) -> list[dict]:

    # Clean the incoming search values
    category_text = category.strip().casefold() if category else ""
    search_text = search.strip().casefold() if search else ""

    # Create an empty list for matching events
    results = []

    # Examine each event
    for event in events:

        # Rule 1: Only approved events are public
        if event.get("status") != "approved":
            continue

        # Rule 2: Filter by category when requested
        if category_text and category_text != "all":

            if event.get("category", "").casefold() != category_text:
                continue

        # Rule 3: Search the title and location
        if search_text:

            searchable_text = (
                event.get("title", "") + " " +
                event.get("location", "")
            ).casefold()

            if search_text not in searchable_text:
                continue

        # The event passed all checks
        results.append(event)

    return results
