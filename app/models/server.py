from .db import db
from datetime import datetime
from .member import members
from sqlalchemy.orm import validates


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    server_name = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    # relationships
    # user = db.relationship("User", back_populates="servers")
    server_members = db.relationship("User",
                                     secondary=members,
                                     back_populates="user_members")
    # Question: unsure about cascade
    # cascade="all, delete")

    def to_dict(self):
        return {
            "id": self.id,
            "server_name": self.server_name,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
