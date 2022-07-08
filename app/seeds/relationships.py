from app.models import db, Relationship


def seed_relationships():
    db.session.add_all([
        Relationship(
            status="friends",
            requestor_id=1,
            requestee_id=2,
        ),
        Relationship(
            status="pending",
            requestor_id=1,
            requestee_id=3,
        ),
        Relationship(
            status="friends",
            requestor_id=3,
            requestee_id=2,
        ),
        Relationship(
            status="friends",
            requestor_id=1,
            requestee_id=5,
        ),
        Relationship(
            status="pending",
            requestor_id=5,
            requestee_id=4,
        ),


    ])

    db.session.commit()


def undo_relationships():
    db.session.execute('TRUNCATE relationships RESTART IDENTITY CASCADE;')
    db.session.commit()
