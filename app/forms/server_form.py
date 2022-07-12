from flask_wtf import FlaskForm
from wtforms import FileField, IntegerField, StringField, BooleanField, FloatField, TextAreaField, Field
from wtforms import validators
from wtforms.validators import DataRequired
import re
from app.models import db


class DictField(Field):
    def get_list(self, values):
        self.data = values


class CreateServer(FlaskForm):
    admin_id = IntegerField('admin_id')
    server_name = StringField('server_name', validators=[DataRequired()])


class UpdateServer(FlaskForm):
    id = IntegerField('id')
    server_name = StringField('server_name', validators=[DataRequired()])
    server_members = DictField('server_members')


class JoinServer(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
