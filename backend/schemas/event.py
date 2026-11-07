
from datetime import datetime

from pydantic import (
    BaseModel,
    Field,
    ConfigDict,
    field_validator,
    model_validator
)


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



class EventUpdate(BaseModel):

    model_config = ConfigDict(extra="forbid")

    title: str | None = Field(
        default=None, min_length=3, max_length=120
    )

    description: str | None = Field(
        default=None, min_length=10
    )

    category: str | None = Field(
        default=None, min_length=2
    )

    location: str | None = Field(
        default=None, min_length=3
    )

    starts_at: datetime | None = None

    ticket_price: int | None = Field(
        default=None, ge=0
    )

    total_tickets: int | None = Field(
        default=None, gt=0
    )

    @model_validator(mode="after")
    def validate_changes(self):

        if not self.model_fields_set:
            raise ValueError(
                "At least one field must be provided."
            )

        for field in self.model_fields_set:
            if getattr(self, field) is None:
                raise ValueError(
                    "Updated fields cannot be null."
                )

        return self


class EventCancelRequest(BaseModel):

    model_config = ConfigDict(extra="forbid")

    reason: str = Field(max_length=500)

    @field_validator("reason")
    @classmethod
    def validate_reason(cls, value: str):

        # Remove unnecessary spaces
        cleaned_reason = value.strip()

        # Cancellation must have a meaningful reason
        if len(cleaned_reason) < 3:
            raise ValueError(
                "Cancellation reason must contain at least 3 characters."
            )

        return cleaned_reason
