from ..models import Notification, User, Role


def notify_role(db, role, work_order_id, type, text):
    users = db.query(User).filter(User.role == role).all()

    for user in users:
        n = Notification(
            work_order_id=work_order_id,
            user_id=user.id,
            type=type,
            text=text
        )
        db.add(n)

    db.commit()


def notify_all(db, work_order_id, type, text):
    users = db.query(User).all()

    for user in users:
        n = Notification(
            work_order_id=work_order_id,
            user_id=user.id,
            type=type,
            text=text
        )
        db.add(n)

    db.commit()