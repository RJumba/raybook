
from datetime import datetime

from pydantic import BaseModel, Field, field_validator


class EventCreate(BaseModel):
    title: str = Field(min_length=3, max_length=120)
    description: str = Field(min_length=10)
    category: str = Field(min_length=2)
    location: str = Field(min_length=3)

    starts_at: datetime

    ticket_price: int = Field(ge=0)
    total_tickets: int = Field(gt=0)


class EventRejectRequest(BaseModel):

    reason: str = Field(max_length=500)

    @field_validator("reason")
    @classmethod
    def validate_reason(cls, value: str):

        # Remove unnecessary spaces
        cleaned_reason = value.strip()

        # Ensure the reason is meaningful
        if len(cleaned_reason) < 3:
            raise ValueError(
                "Rejection reason must contain at least 3 characters."
            )

        return cleaned_reason
