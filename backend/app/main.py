from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import engine, Base, SessionLocal
from .models import User, Role
from .routers import work_orders, notifications, users

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Work Order Management API")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(work_orders.router)
app.include_router(notifications.router)
app.include_router(users.router)


def seed_users():
    db: Session = SessionLocal()

    existing = db.query(User).count()

    if existing == 0:
        technician = User(name="Technician Demo", role=Role.TECHNICIAN)
        commercial = User(name="Commercial Demo", role=Role.COMMERCIAL)

        db.add_all([technician, commercial])
        db.commit()

        print("Demo users created")

    db.close()


@app.on_event("startup")
def startup():
    seed_users()


@app.get("/")
def root():
    return {"message": "Work Order API running"}