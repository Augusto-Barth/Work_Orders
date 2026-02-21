from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import WorkOrder, User, Role, Status
from ..schemas import WorkOrderCreate, TechnicalReport, AmountCreate, FinishOrder
from ..services.notifications import notify_role, notify_all

router = APIRouter(prefix="/work-orders", tags=["Work Orders"])


@router.post("")
def create_work_order(data: WorkOrderCreate, db: Session = Depends(get_db)):

    if db.query(WorkOrder).filter(WorkOrder.internal_id == data.internal_id).first():
        raise HTTPException(400, "Internal ID must be unique")

    wo = WorkOrder(**data.dict())

    db.add(wo)
    db.commit()
    db.refresh(wo)

    notify_role(
        db,
        Role.TECHNICIAN,
        wo.id,
        "WORK_ORDER_CREATED",
        f"Work order {wo.internal_id} created"
    )

    return wo


@router.get("")
def list_work_orders(db: Session = Depends(get_db)):
    return db.query(WorkOrder).all()


@router.get("/{id}")
def get_work_order(id: int, db: Session = Depends(get_db)):
    wo = db.query(WorkOrder).get(id)

    if not wo:
        raise HTTPException(404)

    return wo


@router.post("/{id}/technical-report")
def add_report(id: int, data: TechnicalReport, db: Session = Depends(get_db)):

    wo = db.query(WorkOrder).get(id)
    if not wo:
        raise HTTPException(404, "Work order not found")

    user = db.query(User).get(data.user_id)
    if not user:
        raise HTTPException(404, "User not found")

    if user.role != Role.TECHNICIAN:
        raise HTTPException(403, "Only technicians can add reports")

    if wo.status != Status.PENDING_TECHNICAL_REVIEW:
        raise HTTPException(400, "Invalid status transition")

    wo.technical_report = data.report.strip()
    wo.status = Status.PENDING_AMOUNT

    db.commit()

@router.post("/{id}/amount")
def add_amount(id: int, data: AmountCreate, db: Session = Depends(get_db)):

    wo = db.query(WorkOrder).get(id)
    if not wo:
        raise HTTPException(404, "Work order not found")

    user = db.query(User).get(data.user_id)
    if not user:
        raise HTTPException(404, "User not found")

    if user.role != Role.COMMERCIAL:
        raise HTTPException(403, "Only commercial users can add amount")

    if wo.status != Status.PENDING_AMOUNT:
        raise HTTPException(400, "Amount cannot be added in this state")

    if wo.amount is not None:
        raise HTTPException(400, "Amount already defined")

    wo.amount = data.amount
    wo.status = Status.IN_PROGRESS

    db.commit()


@router.post("/{id}/finish")
def finish_order(id: int, data: FinishOrder, db: Session = Depends(get_db)):

    wo = db.query(WorkOrder).get(id)
    if not wo:
        raise HTTPException(404, "Work order not found")

    user = db.query(User).get(data.user_id)
    if not user:
        raise HTTPException(404, "User not found")

    if user.role != Role.TECHNICIAN:
        raise HTTPException(403, "Only technicians can finish orders")

    if wo.status != Status.IN_PROGRESS:
        raise HTTPException(400, "Order not in progress")

    if not wo.technical_report:
        raise HTTPException(400, "Technical report required")

    wo.status = Status.DONE

    db.commit()