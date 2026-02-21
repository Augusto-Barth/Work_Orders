from pydantic import BaseModel, Field, validator
from datetime import date

class WorkOrderCreate(BaseModel):
    internal_id: str = Field(..., min_length=1)
    client: str = Field(..., min_length=1)
    arrival_date: date
    part_model: str = Field(..., min_length=1)
    serial_number: str = Field(..., min_length=1)


class TechnicalReport(BaseModel):
    user_id: int
    report: str = Field(..., min_length=1)

    @validator("report")
    def report_not_empty(cls, v):
        if not v.strip():
            raise ValueError("Technical report cannot be empty")
        return v


class AmountCreate(BaseModel):
    user_id: int
    amount: float = Field(..., gt=0)  # prevents zero or negative


class FinishOrder(BaseModel):
    user_id: int