from flask_wtf import FlaskForm
from wtforms import FileField, IntegerField, StringField, BooleanField, FloatField, TextAreaField, Field
from wtforms import validators
from wtforms.validators import DataRequired
import re
from app.models import db


class CreateChannel(FlaskForm):

    channel_name = StringField("channel_name")
    server_id = IntegerField("server_id")


class UpdateChannel(FlaskForm):
    channel_name = StringField("channel_name")
    id = IntegerField("id")
