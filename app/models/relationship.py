from .db import db
from .member import members
from datetime import datetime


class Relationship(db.Model):
    __tablename__ = 'relationship'

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(40), nullable=False, unique=True)
    requestor = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    requestee = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())
