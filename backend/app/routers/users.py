from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, Role

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("")
def create_user(name: str, role: Role, db: Session = Depends(get_db)):

    user = User(name=name, role=role)

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


@router.get("")
def list_users(db: Session = Depends(get_db)):
    return db.query(User).all()