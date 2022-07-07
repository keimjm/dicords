from ntpath import join
from flask import Blueprint, jsonify, session, request
from app.models import db, Server, Channel, User, members
from sqlalchemy.orm import joinedload


server_routes = Blueprint('servers', __name__)


@server_routes.route("", methods=["GET"])
def get_servers():
    servers = Server.query.options(joinedload('channels'), joinedload(
        'server_members')).all()
    return {server.id: server.to_dict(channels=server.channels, members=server.server_members) for server in servers}
