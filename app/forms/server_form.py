from unicodedata import name
from flask_wtf import FlaskForm
from wtforms import FileField, IntegerField, StringField, BooleanField, FloatField, TextAreaField, Field
from wtforms import validators
from wtforms.validators import DataRequired, ValidationError
import re
from app.models import db


class DictField(Field):
    def get_list(self, values):
        self.data = values


def name_length(form, field):
    name = field.data
    if len(name) > 30:
        raise ValidationError('Server Name was too long')


class CreateServer(FlaskForm):
    admin_id = IntegerField('admin_id')
    server_name = StringField('server_name', validators=[
                              DataRequired('Server Name is required'), name_length])


class UpdateServer(FlaskForm):
    id = IntegerField('id')
    server_name = StringField('server_name', validators=[DataRequired('Server Name is required'), name_length])
    server_members = DictField('server_members')


class JoinServer(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
