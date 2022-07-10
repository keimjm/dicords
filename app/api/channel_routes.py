from flask import Blueprint, jsonify, session, request
from app.models import db, Server, Channel, User, members, server
from app.forms.server_form import CreateServer, UpdateServer
from app.forms.channel_form import CreateChannel, UpdateChannel
from sqlalchemy.orm import joinedload
from flask_login import login_required
from app.util import format_errors


channel_routes = Blueprint('channels', __name__)


@login_required
@channel_routes.route('/<int:id>', methods=["DELETE"])
def delete_channel(id):

    channel = Channel.query.get(id)
    server_id = channel.server_id

    db.session.delete(channel)
    db.session.commit()

    server = Server.query.options(joinedload('channels'), joinedload(
        'server_members')).get(server_id)
    return server.to_dict(channels=server.channels, members=server.server_members)
