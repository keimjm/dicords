from unicodedata import name
from flask_wtf import FlaskForm
from wtforms import FileField, IntegerField, StringField, BooleanField, FloatField, TextAreaField, Field
from wtforms import validators
from wtforms.validators import DataRequired, ValidationError
import re
from app.models import db


def name_length(form, field):
    name = field.data
    if len(name) > 30:
        raise ValidationError('Channel Name was too long')


class CreateChannel(FlaskForm):
    channel_name = StringField("channel_name", validators=[
                               DataRequired(), name_length])
    server_id = IntegerField("server_id")


class UpdateChannel(FlaskForm):
    channel_name = StringField("channel_name", validators=[
                               DataRequired(), name_length])
    id = IntegerField("id")
