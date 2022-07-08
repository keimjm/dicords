from app.models import db, members


def seed_members():
    pass


def undo_members():
    db.session.execute('TRUNCATE members RESTART IDENTITY CASCADE;')
    db.session.commit()
