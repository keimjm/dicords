from ntpath import join
from flask import Blueprint, jsonify, session, request
from app.models import db, Server, Channel, User, members
from app.forms.server_form import CreateServer, UpdateServer
from sqlalchemy.orm import joinedload
from flask_login import login_required
from app.util import format_errors


server_routes = Blueprint('servers', __name__)


@server_routes.route("", methods=["GET"])
def get_servers():
    servers = Server.query.options(joinedload('channels'), joinedload(
        'server_members')).all()
    return {server.id: server.to_dict(channels=server.channels, members=server.server_members) for server in servers}


@login_required
@server_routes.route("", methods=["POST"])
def create_server():

    form = CreateServer()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_server = Server(
            server_name=form.data['server_name'],
            user_id=form.data['admin_id']
        )
        db.session.add(new_server)
        db.session.commit()

        server = Server.query.options(joinedload('channels'), joinedload(
            'server_members')).get(new_server.id)
        return server.to_dict(channels=server.channels, members=server.server_members)
    return {'errors': format_errors(form.errors)}, 401
