from turtle import back
from .db import db
from .member import members
from .direct_message import DirectMessage
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    image_url = db.Column(db.Text)
    hashed_password = db.Column(db.String(255), nullable=False)

    user_members = db.relationship("Server",
                                   secondary=members,
                                   back_populates="server_members",
                                   # Question: unsure about cascade
                                   # cascade="all, delete"
                                   )

    sender = db.relationship(
        "DirectMessage", back_populates="message_sent", foreign_keys=[DirectMessage.sender_id])
    receiver = db.relationship(
        "DirectMessage", back_populates="message_received", foreign_keys=[DirectMessage.recipient_id])
    sender_channel = db.relationship(
        "ChannelMessage", back_populates="channel_sender")

    @ property
    def password(self):
        return self.hashed_password

    @ password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self, **kwargs):

        out = {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

        for key, collection in kwargs.items():
            out[key] = [ele.to_dict() for ele in collection]
        return out
