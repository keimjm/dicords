from .db import db
from datetime import datetime, timezone
from sqlalchemy.orm import validates


class ChannelMessage(db.Model):
    __tablename__ = 'channel_messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    channel_sender = db.relationship(
        "User", back_populates="sender_channel")

    message_channel = db.relationship(
        "Channel", back_populates="channel_message")

    def to_dict(self, username):
        # user = User.query.filter(User.id == self.sender_id).all()
        created_at = self.created_at.strftime('%m/%d/%Y')
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'channel_id': self.channel_id,
            'message': self.message,
            'username': username,
            'created_at': created_at
        }
