from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Notification

router = APIRouter(tags=["Notifications"])


@router.get("/users/{user_id}/notifications")
def get_notifications(user_id: int, db: Session = Depends(get_db)):
    return db.query(Notification).filter(Notification.user_id == user_id).all()


@router.post("/notifications/{id}/read")
def mark_read(id: int, db: Session = Depends(get_db)):

    n = db.query(Notification).get(id)
    n.read = True

    db.commit()

    return n