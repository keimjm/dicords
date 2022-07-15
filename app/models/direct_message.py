from .db import db
from datetime import datetime
from sqlalchemy.orm import validates


class DirectMessage(db.Model):
    __tablename__ = 'direct_messages'

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    # parent_message_id = db.Column(db.Integer, db.ForeignKey(
    #     'direct_messages.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    message_sent = db.relationship(
        "User", back_populates="sender", foreign_keys=[sender_id])
    message_received = db.relationship(
        "User", back_populates="receiver", foreign_keys=[recipient_id])

    def to_dict(self, username):
        # user = User.query.filter(User.id == self.sender_id).all()
        created_at = self.created_at.strftime('%m/%d/%Y')
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'recipient_id': self.recipient_id,
            'message': self.message,
            'username': username,
            'created_at': created_at
        }
