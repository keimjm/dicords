from app.models import channel_message
from .db import db
from datetime import datetime
from sqlalchemy.orm import validates


class Channel(db.Model):
    __tablename__ = 'channels'

    # columns
    id = db.Column(db.Integer, primary_key=True)
    channel_name = db.Column(db.String(255), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(
        'servers.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    # relationships
    servers = db.relationship("Server", back_populates="channels")
    channel_message = db.relationship("ChannelMessage", back_populates="message_channel", cascade="delete, all")

    def to_dict(self, **kwargs):

        out = {
            "id": self.id,
            "channel_name": self.channel_name,
            "server_id": self.server_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

        for key, collection in kwargs.items():
            # might neeed to import the to_dict methods for the associated models
            out[key] = [ele.to_dict() for ele in collection]

        return out
