from sqlalchemy import Column, Integer, String, Date, Float, Text, Boolean, Enum, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import enum


class Role(str, enum.Enum):
    TECHNICIAN = "TECHNICIAN"
    COMMERCIAL = "COMMERCIAL"


class Status(str, enum.Enum):
    PENDING_TECHNICAL_REVIEW = "PENDING_TECHNICAL_REVIEW"
    PENDING_AMOUNT = "PENDING_AMOUNT"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    role = Column(Enum(Role))


class WorkOrder(Base):
    __tablename__ = "work_orders"

    id = Column(Integer, primary_key=True)

    internal_id = Column(String, unique=True, index=True)

    client = Column(String)
    arrival_date = Column(Date)

    part_model = Column(String)
    serial_number = Column(String)

    status = Column(Enum(Status), default=Status.PENDING_TECHNICAL_REVIEW)

    technical_report = Column(Text, nullable=True)
    amount = Column(Float, nullable=True)


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True)

    work_order_id = Column(Integer, ForeignKey("work_orders.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    type = Column(String)
    text = Column(String)

    read = Column(Boolean, default=False)