from ntpath import join
from flask import Blueprint, jsonify, session, request
from app.models import db, Server, Channel, User, members, server
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

        channel = Channel(
            channel_name="general",
            server_id=new_server.id
        )

        db.session.add(channel)
        db.session.commit()
        server = Server.query.options(joinedload('channels'), joinedload(
            'server_members')).get(new_server.id)
        return server.to_dict(channels=server.channels, members=server.server_members)
    return {'errors': format_errors(form.errors)}, 401


@server_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_server(id):
    server = Server.query.options(joinedload(
        'channels'), joinedload('server_members')).get(id)
    db.session.delete(server)
    db.session.commit()
    return {'Successful': True}


@login_required
@server_routes.route("", methods=["PUT"])
def update_server():

    form = UpdateServer()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        server = Server.query.get(form.data["id"])
        server.server_name = form.data["server_name"]
        server.user_id = form.data["user_id"]
        db.session.commit()

        server = Server.query.options(joinedload('channels'), joinedload(
            'server_members')).get(server.id)
        return server.to_dict(channels=server.channels, members=server.server_members)
    return {'errors': format_errors(form.errors)}, 401
