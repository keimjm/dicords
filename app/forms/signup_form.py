from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


# def validate_password(form, field):
#     password = field.data
#     if not re.match(r"^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$])[\w\d@#$]{6,12}$", password):
#         raise ValidationError(
#             'Password needs at least one digit, uppercase letter, lowercase letter, and special character')
#     return password


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired('User name is a required field'), username_exists, user_exists])
    email = StringField('email', validators=[DataRequired(
        'Email is a required field'), Email("Please use a valid email"), user_exists])
    password = StringField('password', validators=[
                           DataRequired()])
